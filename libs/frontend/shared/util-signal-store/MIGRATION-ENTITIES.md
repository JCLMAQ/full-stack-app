# Migration du Todo Store vers la variante Entities

Ce guide montre comment basculer le Todo Store de `withListSelectors` vers `withEntityListSelectors`.

## État actuel (avec items[])

**Fichier**: `libs/frontend/todo/src/lib/store/todo.selectors.ts`

```typescript
import { withListSelectors } from '@fe/shared/util-signal-store';
import { TodoInterface } from './todo.model';

export function withTodosSelectors() {
  return signalStoreFeature(
    withListSelectors<TodoInterface>({
      selectId: (todo) => todo.id,
      isDone: (todo) => todo.todoState === 'DONE'
    })
  );
}
```

**Store**: `libs/frontend/todo/src/lib/store/todo.state.ts`

```typescript
export const TodoStore = signalStore(
  { providedIn: 'root' },
  withState(initialTodoState),
  withTodosSelectors(),  // ← utilise items[]
  withTodosMethods()
);
```

---

## Migration vers entities (recommandé)

### Étape 1: Utiliser le nouveau fichier de sélecteurs

**Créer/utiliser**: `libs/frontend/todo/src/lib/store/todo.selectors-entities.ts`

```typescript
import { signalStoreFeature, withComputed } from '@ngrx/signals';
import { computed } from '@angular/core';
import { withEntityListSelectors } from '@fe/shared/util-signal-store';
import { TodoInterface } from './todo.model';

export function withTodosSelectors() {
  return signalStoreFeature(
    withEntityListSelectors<TodoInterface>({
      isDone: (todo) => todo.todoState === 'DONE',
    })
  );
}
```

### Étape 2: Mettre à jour l'import dans le store

**Modifier**: `libs/frontend/todo/src/lib/store/todo.state.ts`

```typescript
// Avant
import { withTodosSelectors } from './todo.selectors';

// Après
import { withTodosSelectors } from './todo.selectors-entities';
```

### Étape 3: Vérifier que withEntities est présent

Le store doit déjà utiliser `withEntities` (c'est le cas dans `todo.methods.ts`):

```typescript
export function withTodosMethods() {
  return signalStoreFeature(
    withEntities(todoConfig),  // ← Fournit entityMap et entityIds
    withCallState({collection: 'todo'}),
    withNavigationMethods(),
    withMethods((store, todoService = inject(TodoService)) => ({
      // ...
    }))
  );
}
```

### Étape 4: Tester

```bash
nx build frontend
nx serve frontend
```

---

## Comparaison des performances

### Avec `withListSelectors` (items[])

```typescript
selectedItem: computed(() => {
  const id = selectedId();
  return items().find(x => selectId(x) === id);  // O(n)
})

selectedItems: computed(() => {
  const ids = new Set(selectedIds());
  return items().filter(x => ids.has(selectId(x)));  // O(n)
})
```

### Avec `withEntityListSelectors` (entityMap)

```typescript
selectedItem: computed(() => {
  const id = selectedId();
  const map = entityMap();
  return map[id];  // O(1) ⚡
})

selectedItems: computed(() => {
  const ids = selectedIds();
  const map = entityMap();
  return ids.map(id => map[id]).filter(x => !!x);  // O(k) où k = selectedIds.length
})
```

**Gains**: 
- O(1) au lieu de O(n) pour `selectedItem`
- O(k) au lieu de O(n) pour `selectedItems` (k << n généralement)

---

## Retour arrière (si nécessaire)

Pour revenir à l'ancienne version:

```typescript
// Dans todo.state.ts
import { withTodosSelectors } from './todo.selectors';  // ← ancien fichier
```

---

## Points d'attention

### ✅ Avantages de la variante entities

- **Performance**: Lookups O(1) via `entityMap`
- **Type-safe**: Pas besoin de `selectId` (utilise l'`entityConfig`)
- **Cohérent**: Align avec le pattern NgRx entities
- **Optimisé**: Pour les grandes collections

### ⚠️ Pré-requis

- Le store doit utiliser `withEntities()`
- `entityMap` et `entityIds` doivent être disponibles
- `selectedId` et `selectedIds` doivent être dans le state

### 🔄 Fallback automatique (variante universelle)

Si vous utilisez `withListSelectors`, il détecte automatiquement `entityMap`:

```typescript
// Pas besoin de changer de variante si vous voulez garder la compatibilité
withListSelectors<TodoInterface>({
  selectId: (todo) => todo.id,  // Utilisé si pas d'entityMap
  isDone: (todo) => todo.todoState === 'DONE'
})
// ↑ Utilise entityMap si disponible, sinon items[]
```

---

## Résumé des fichiers

| Fichier | Variante | Utilise |
|---------|----------|---------|
| `todo.selectors.ts` | Universelle | `items[]` + fallback `entityMap` |
| `todo.selectors-entities.ts` | Entities | `entityMap` + `entityIds` uniquement |

**Recommandation**: Utiliser `todo.selectors-entities.ts` pour le Todo Store car il utilise déjà `withEntities()`.

---

## Exemple de diff complet

```diff
// libs/frontend/todo/src/lib/store/todo.state.ts
- import { withTodosSelectors } from './todo.selectors';
+ import { withTodosSelectors } from './todo.selectors-entities';

export const TodoStore = signalStore(
    { providedIn: 'root' },
    withState(initialTodoState),
    withTodosSelectors(),
    withNavigationMethods(),
    withDevtools('todo'),
    withTodosMethods(),
    withLogger('todo'),
    withHooks({
      onInit: (store) => {
          store.load();
          store.initSelectedID();
        },
      onDestroy() {
        console.log('on destroy');
      },
    }),
);
```

---

## Tests

Pour valider la migration:

1. **Types**: `nx build frontend`
2. **Runtime**: `nx serve frontend`
3. **Comportement**: 
   - Sélection d'un todo
   - Affichage de `selectedItem`
   - Calcul de `percentageDone`
   - Navigation (next/prev)

Tous les comportements doivent être identiques, seule la performance change.
