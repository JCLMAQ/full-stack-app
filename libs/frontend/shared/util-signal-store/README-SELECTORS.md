# Features Signal Store - Sélecteurs de Liste

Ce dossier contient deux variantes de features génériques pour les sélecteurs de liste dans les Signal Stores NgRx.

## 📦 Variantes disponibles

### 1. `withListSelectors<Item>` - Variante universelle

**Fichier**: `list-selectors.feature.ts`

**Utilisation recommandée**: Stores basés sur des tableaux `items[]` simples, ou mixte avec support optionnel d'entities.

**Nécessite dans le store parent**:
- `items: () => Item[]`
- `selectedId: () => string | null`
- `selectedIds: () => string[]`
- `entityMap?: () => Record<string, Item>` *(optionnel)*

**Comportement**:
- Si `entityMap` est présent → utilise la map pour optimiser les lookups
- Sinon → filtre/cherche dans `items[]`
- Fallback automatique transparent

**Exemple**:
```typescript
export const SimpleStore = signalStore(
  withState({ 
    items: [], 
    selectedId: null, 
    selectedIds: [] 
  }),
  withListSelectors<MyItem>({
    selectId: (item) => item.id,
    isDone: (item) => item.completed
  })
);
```

---

### 2. `withEntityListSelectors<Entity>` - Variante entities dédiée

**Fichier**: `entity-list-selectors.feature.ts`

**Utilisation recommandée**: Stores utilisant `@ngrx/signals/entities` avec `withEntities()`.

**Nécessite dans le store parent**:
- `entityMap: () => Record<string, Entity>`
- `entityIds: () => string[]`
- `selectedId: () => string | null`
- `selectedIds: () => string[]`

**Comportement**:
- Optimisé pour `entityMap` et `entityIds`
- Pas de fallback sur `items[]`
- Performance maximale pour les grandes collections

**Exemple**:
```typescript
const todoConfig = entityConfig({
  entity: type<TodoInterface>(),
  collection: 'todo',
  selectId: (todo) => todo.id
});

export const TodoStore = signalStore(
  withState({ selectedId: null, selectedIds: [] }),
  withEntities(todoConfig),
  withEntityListSelectors<TodoInterface>({
    isDone: (todo) => todo.todoState === 'DONE'
  })
);
```

---

## 🔍 Computed selectors fournis (les deux variantes)

| Selector | Type | Description |
|----------|------|-------------|
| `selectedItem` | `Entity \| undefined` | L'entité actuellement sélectionnée (via `selectedId`) |
| `selectedItemIndex` | `number` | Index de l'item dans `selectedIds` |
| `selectedItems` | `Entity[]` | Liste des entités sélectionnées (via `selectedIds`) |
| `lastPositionIndex` | `number` | Index de la dernière position (count - 1) |
| `doneCount` | `number` | Nombre d'items "done" |
| `undoneCount` | `number` | Nombre d'items "undone" |
| `percentageDone` | `number` | Pourcentage (0-100) des items "done" |

---

## 🚀 Configuration

### `ListSelectorsConfig<Item>` (variante universelle)
```typescript
{
  selectId?: (item: Item) => string;  // Default: (item) => item.id
  isDone?: (item: Item) => boolean;    // Default: () => false
}
```

### `EntityListSelectorsConfig<Entity>` (variante entities)
```typescript
{
  isDone?: (entity: Entity) => boolean;  // Default: () => false
}
```

> **Note**: La variante entities n'a pas de `selectId` car elle utilise l'`entityConfig` du store parent.

---

## 🎯 Quand utiliser quelle variante ?

| Scénario | Recommandation |
|----------|----------------|
| Store avec `items[]` uniquement | `withListSelectors` |
| Store avec `withEntities()` | `withEntityListSelectors` ⚡ |
| Store mixte (items + entities) | `withListSelectors` (auto-detect) |
| Transition items → entities | `withListSelectors` → puis `withEntityListSelectors` |

---

## 💡 Exemples d'intégration

### Todo Store (version entities)

**Fichier**: `libs/frontend/todo/src/lib/store/todo.selectors-entities.ts`

```typescript
export function withTodosSelectors() {
  return signalStoreFeature(
    withEntityListSelectors<TodoInterface>({
      isDone: (todo) => todo.todoState === 'DONE',
    })
  );
}
```

**Usage dans le store**:
```typescript
export const TodoStore = signalStore(
  { providedIn: 'root' },
  withState(initialTodoState),
  withEntities(todoConfig),
  withTodosSelectors(),  // ← utilise withEntityListSelectors
  withTodosMethods()
);
```

### Todo Store (version items/fallback)

**Fichier**: `libs/frontend/todo/src/lib/store/todo.selectors.ts`

```typescript
export function withTodosSelectors() {
  return signalStoreFeature(
    withListSelectors<TodoInterface>({
      selectId: (todo) => todo.id,
      isDone: (todo) => todo.todoState === 'DONE'
    })
  );
}
```

---

## 🔧 Compatibilité

- **Angular**: 17+
- **NgRx Signals**: 17+
- **@ngrx/signals/entities**: 17+ (pour variante entities uniquement)
- **TypeScript**: 5.0+

---

## 📝 Notes de développement

### Performance
- `withEntityListSelectors`: O(1) pour `selectedItem` et `selectedItems` (map lookup)
- `withListSelectors` avec `entityMap`: O(1) idem
- `withListSelectors` sans `entityMap`: O(n) (filter/find sur tableau)

### Type safety
- Les deux features utilisent des casts internes pour accéder aux signaux du store parent
- Les callbacks sont typés explicitement pour éviter `implicit any`
- `selectId` est optionnel dans `withListSelectors` (default: `item.id`)

### Composition
- Les deux features sont compatibles avec `signalStoreFeature`
- Peuvent être combinées avec d'autres features (navigation, call state, devtools, etc.)
- Pattern "feature stack" recommandé dans le store principal

---

## 🧪 Tests

Pour tester ces features:

```bash
# Lancer les tests frontend
nx test frontend

# Ou build complet
nx build frontend
```

---

## 📚 Références

- [NgRx Signal Store](https://ngrx.io/guide/signals/signal-store)
- [Custom Features](https://ngrx.io/guide/signals/signal-store/custom-store-features)
- [@ngrx/signals/entities](https://ngrx.io/guide/signals/signal-store/entity-management)
