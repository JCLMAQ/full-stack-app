import { Signal, computed } from "@angular/core";
import { SignalStoreFeature, signalStoreFeature, type, withComputed, withState } from "@ngrx/signals";
import { EntityId, EntityState } from "@ngrx/signals/entities";

export type SelectedEntityState = { selectedEntityId: EntityId | null };

export type NamedwithSelectedEntitySlice<Collection extends string> = {
  [K in Collection as `${K}SelectedEntityState`]: SelectedEntityState;
};

export type SelectedEntityStateSlice = {
  selectedEntityState: SelectedEntityState
}

export type NamedSelectedEntityStateSignals<Prop extends string> = {
  [K in Prop as `${K}TotalSelected`]: Signal<number | null>;
};

export type SelectedEntityStateSignals = {
  totalSelected: Signal<number | null>;
}

export function getSelectedEntityStateKeys(config?: { collection?: string }) {
  const prop = config?.collection;
  return {
    selectedEntityStateKey: prop ?  `${config.collection}SelectedEntityState` : 'selectedEntityState',
    totalSelectedKey: prop ? `${config.collection}TotalSelected` : 'totalSelected',
  };
}

export function withSelectedEntity<Collection extends string>(config: {
  collection: Collection;
}): SignalStoreFeature<
  { state: {},
  signals: {},
  methods: {}
  },
  {
    state: NamedwithSelectedEntitySlice<Collection>,
    signals: NamedSelectedEntityStateSignals<Collection>,
    methods: {}
  }
>;

export function withSelectedEntity(): SignalStoreFeature<
  { state: {}, signals: {}, methods: {} },
  {
    state: SelectedEntityStateSlice,
    signals: SelectedEntityStateSignals,
    methods: {}
  }
>;

export function withSelectedEntity<Collection extends string>(config?: {
  collection: Collection;
}): SignalStoreFeature {
  const { selectedEntityStateKey, totalSelectedKey } =
    getSelectedEntityStateKeys(config);

  return signalStoreFeature(
    withState({ [selectedEntityStateKey]: null }),
    withComputed((state: Record<string, Signal<unknown>>) => {

      const selectedEntity = state[selectedEntityStateKey] as Signal<SelectedEntityState>;
      return {
        [totalSelectedKey]: computed(() => selectedEntity.length),
        }
      }
    )
  );
}



export function withSelectedEntity<postEntity>() {
  return signalStoreFeature(
    // { state: type<PostStateInterface>() },
    { state: type<EntityState<postEntity>>() },
    withState<SelectedEntityState>({ selectedEntityId: null }),
    // withEntities( {entity: type<PostInterface>(), collection: 'post'}),
    withComputed(({ entityMap, selectedEntityId }) => ({
      selectedEntity: computed(() => {
        const selectedId = selectedEntityId();
        return selectedId ? entityMap()[selectedId] : null;
      }),
    }))
  );
}
