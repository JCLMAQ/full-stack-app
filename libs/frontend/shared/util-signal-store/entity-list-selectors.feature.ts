import { computed } from '@angular/core';
import { signalStoreFeature, withComputed } from '@ngrx/signals';

/**
 * Configuration pour les sélecteurs de liste basés sur entities
 * @template Entity Le type d'entité (doit avoir un id)
 */
export interface EntityListSelectorsConfig<Entity> {
  /**
   * Fonction optionnelle pour déterminer si une entité est "done"
   * Par défaut: () => false
   */
  isDone?: (entity: Entity) => boolean;
}

/**
 * Feature générique pour les sélecteurs de liste avec entities (entityMap/entityIds)
 * Optimisé pour les stores utilisant @ngrx/signals/entities
 *
 * Nécessite que le store parent fournisse:
 * - entityMap: () => Record<string, Entity>
 * - entityIds: () => string[]
 * - selectedId: () => string | null
 * - selectedIds: () => string[]
 *
 * @template Entity Le type d'entité
 * @param config Configuration optionnelle (isDone)
 * @returns Feature signalStore avec computed selectors pour entities
 *
 * @example
 * ```typescript
 * export const TodoStore = signalStore(
 *   withState(initialState),
 *   withEntities(todoConfig),
 *   withEntityListSelectors<TodoInterface>({
 *     isDone: (todo) => todo.todoState === 'DONE'
 *   })
 * );
 * ```
 */
export function withEntityListSelectors<Entity extends { id: string }>(
  config: EntityListSelectorsConfig<Entity> = {}
) {
  const isDone = config.isDone ?? (() => false);

  return signalStoreFeature(
    withComputed((store) => {
      // Cast pour accéder aux signaux fournis par withEntities et le store parent
      const s = store as unknown as {
        entityMap: () => Record<string, Entity>;
        entityIds: () => string[];
        selectedId: () => string | null;
        selectedIds: () => string[];
      };

      const entityMap = s.entityMap;
      const entityIds = s.entityIds;
      const selectedId = s.selectedId;
      const selectedIds = s.selectedIds;

      return {
        /**
         * L'entité actuellement sélectionnée (via selectedId)
         */
        selectedItem: computed(() => {
          const id = selectedId();
          if (!id) return undefined;
          const map = entityMap();
          return map[id];
        }),

        /**
         * Index de l'item sélectionné dans selectedIds
         */
        selectedItemIndex: computed(() => {
          const ids = selectedIds();
          const id = selectedId();
          return ids.findIndex((x: string) => x === id);
        }),

        /**
         * Liste des entités sélectionnées (via selectedIds)
         */
        selectedItems: computed(() => {
          const ids = selectedIds();
          const map = entityMap();
          return ids
            .map((id: string) => map[id])
            .filter((item): item is Entity => !!item);
        }),

        /**
         * Index de la dernière position (nombre d'entités - 1)
         */
        lastPositionIndex: computed(() => {
          const ids = entityIds();
          return Math.max(ids.length - 1, 0);
        }),

        /**
         * Nombre d'entités "done"
         */
        doneCount: computed(() => {
          const ids = entityIds();
          const map = entityMap();
          return ids
            .map((id: string) => map[id])
            .filter((entity): entity is Entity => !!entity && isDone(entity))
            .length;
        }),

        /**
         * Nombre d'entités "undone"
         */
        undoneCount: computed(() => {
          const ids = entityIds();
          const map = entityMap();
          return ids
            .map((id: string) => map[id])
            .filter((entity): entity is Entity => !!entity && !isDone(entity))
            .length;
        }),

        /**
         * Pourcentage des entités "done" (0-100)
         */
        percentageDone: computed(() => {
          const ids = entityIds();
          if (ids.length === 0) return 0;
          const map = entityMap();
          const done = ids
            .map((id: string) => map[id])
            .filter((entity): entity is Entity => !!entity && isDone(entity))
            .length;
          return (done / ids.length) * 100;
        }),
      };
    })
  );
}
