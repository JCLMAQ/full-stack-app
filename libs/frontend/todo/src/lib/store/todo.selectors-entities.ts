import { withEntityListSelectors } from '@fe/shared/util-signal-store';
import { signalStoreFeature, withComputed } from '@ngrx/signals';
import { TodoInterface } from './todo.model';

/**
 * Feature de sélecteurs pour les Todos
 * Utilise la version entities-optimisée avec entityMap
 */
export function withTodosSelectors() {
  return signalStoreFeature(
    withEntityListSelectors<TodoInterface>({
      isDone: (todo) => todo.todoState === 'DONE',
    }),
    // Sélecteurs additionnels spécifiques aux todos (si nécessaire)
    withComputed(() => ({
      // Exemple: on peut ajouter des computed supplémentaires ici
      // todosByPriority: computed(() => ...),
    }))
  );
}
