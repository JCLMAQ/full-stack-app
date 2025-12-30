import { computed } from '@angular/core';
import { signalStoreFeature, withComputed } from '@ngrx/signals';

export type ListSelectorsConfig<Item> = {
  selectId?: (item: Item) => string;
  isDone?: (item: Item) => boolean;
};


export function withListSelectors<Item extends { id: string }>(config: ListSelectorsConfig<Item> = {}) {
  const selectId = config.selectId ?? ((item: Item) => item.id);
  const isDone = config.isDone ?? (() => false);

  return signalStoreFeature(
    withComputed((store) => {
      const s = store as unknown as {
        items: () => Item[];
        selectedId: () => string | null;
        selectedIds: () => string[];
        entityMap?: () => Record<string, Item>;
      };
      const items = s.items;
      const selectedId = s.selectedId;
      const selectedIds = s.selectedIds;
      const entityMap = s.entityMap;

      return ({
        selectedItem: computed(() => {
          const id = selectedId();
          if (!id) return undefined;
          if (entityMap) {
            const map = entityMap();
            return map[id];
          }
          return items().find((x: Item) => selectId(x) === id);
        }),
        selectedItemIndex: computed(() => selectedIds().findIndex((x: string) => x === selectedId()) ),
        selectedItems: computed(() => {
          const ids = selectedIds();
          if (entityMap) {
            const map = entityMap();
            return ids
              .map((id) => map[id])
              .filter((item): item is Item => !!item);
          }
          const idSet = new Set(ids);
          return items().filter((x: Item) => idSet.has(selectId(x)));
        }),
        lastPositionIndex: computed(() => Math.max(items().length - 1, 0) ),
        doneCount: computed(() => items().filter((x: Item) => isDone(x)).length ),
        undoneCount: computed(() => items().filter((x: Item) => !isDone(x)).length ),
        percentageDone: computed(() => {
          const total = items().length;
          if (total === 0) return 0;
          const done = items().filter((x: Item) => isDone(x)).length;
          return (done / total) * 100;
        }),
      });
    })
  );
}
