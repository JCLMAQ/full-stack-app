import { computed } from '@angular/core';
import { signalStoreFeature, type, withComputed } from '@ngrx/signals';
import { TodoStateInterface } from './todo.state';

export function withTodosSelectors() {
  return signalStoreFeature(
    { state: type<TodoStateInterface>() },
    withComputed(({ items, selection, selectedId, selectedIds }) => ({
      selectedItem: computed(() => items().find((x) => x.id === selectedId())),
      selectedItemIndex: computed(()=> selectedIds().findIndex((x) => x === selectedId()) ),
      selectedItems: computed(() => selection().selected.entries),
      lastPositionIndex: computed(() => items().length - 1),
      doneCount: computed(() => items().filter((x) => x.todoState === 'DONE').length),
      undoneCount: computed(() => items().filter((x) => x.todoState !== 'DONE').length),
      percentageDone: computed(() => {
        const done = items().filter((x) => x.todoState = 'DONE').length;
        const total = items().length;
        if (total === 0) {
          return 0;
        }
        return (done / total) * 100;
      })
    }
    ))
  );
}
