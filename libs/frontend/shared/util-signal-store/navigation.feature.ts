import { patchState, signalStoreFeature, withMethods, withState } from '@ngrx/signals';

export type NavigationState = {
  currentPosition: number;
  lastPosition: number;
  selectedId: string | null;
  navigation: {
    hasNext: boolean;
    hasPrevious: boolean;
    isFirst: boolean;
    isLast: boolean;
  };
};

export type NavigationConfig<Item> = {
  selectId?: (item: Item) => string;
};

type SelectionLike<Item> = {
  isEmpty?: () => boolean;
  selected: Item[];
};

type PatchableStore = Parameters<typeof patchState>[0];

type NavigationStore<Item> = PatchableStore & {
  currentPosition: () => number;
  lastPosition: () => number;
  items?: () => Item[];
  selection?: () => SelectionLike<Item>;
  selectedId?: () => string | null;
};

const initialNavigationState: NavigationState = {
  currentPosition: 0,
  lastPosition: 0,
  selectedId: null,
  navigation: {
    hasNext: false,
    hasPrevious: false,
    isFirst: true,
    isLast: true,
  },
};

function clampPosition(current: number, last: number) {
  const safeLast = Math.max(last, 0);
  const safeCurrent = Math.min(Math.max(current, 0), safeLast);
  return { current: safeCurrent, last: safeLast };
}

function computeNavigation(current: number, last: number) {
  return {
    hasNext: current < last,
    hasPrevious: current > 0,
    isFirst: current === 0,
    isLast: current === last,
  };
}

function applyNavigationState(store: PatchableStore, current: number, last: number) {
  const navigation = computeNavigation(current, last);
  patchState(store, { currentPosition: current, lastPosition: last, navigation });
}

export function withNavigationMethods<Item extends { id: string }>(config: NavigationConfig<Item> = {}) {
  const getId = config.selectId ?? ((item: Item) => item.id);

  return signalStoreFeature(
    withState<NavigationState>(initialNavigationState),
    withMethods((store) => ({
      initNavButton(initialItemId: string) {
        const navStore = store as NavigationStore<Item>;
        const selection = navStore.selection?.();
        const hasSelection = selection
          ? typeof selection.isEmpty === 'function'
            ? !selection.isEmpty()
            : selection.selected.length > 0
          : false;
        const source: Item[] = hasSelection && selection ? selection.selected : navStore.items?.() ?? [];

        let currentPosition = source.findIndex((item) => getId(item) === initialItemId);
        if (currentPosition === -1) currentPosition = 0;

        let lastPosition = source.length - 1;
        if (lastPosition < 0) lastPosition = 0;

        const { current, last } = clampPosition(currentPosition, lastPosition);
        applyNavigationState(store, current, last);
        patchState(store, { selectedId: initialItemId });
      },

      navStateMgt(currentPosition: number, lastPosition: number) {
        const { current, last } = clampPosition(currentPosition, lastPosition);
            applyNavigationState(store, current, last);
      },

      next() {
        const navStore = store as NavigationStore<Item>;
        const { current, last } = clampPosition(navStore.currentPosition() + 1, navStore.lastPosition());
        applyNavigationState(store, current, last);
      },

      last() {
        const navStore = store as NavigationStore<Item>;
        const last = navStore.lastPosition();
        applyNavigationState(store, last, last);
      },

      first() {
        const navStore = store as NavigationStore<Item>;
        const last = navStore.lastPosition();
        applyNavigationState(store, 0, last);
      },

      previous() {
        const navStore = store as NavigationStore<Item>;
        const { current, last } = clampPosition(navStore.currentPosition() - 1, navStore.lastPosition());
        applyNavigationState(store, current, last);
      },
    }))
  );
}
