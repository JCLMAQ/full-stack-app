import { Signal, computed } from '@angular/core';
import {
  SignalStoreFeature,
  signalStoreFeature,
  withComputed,
  withState,
} from '@ngrx/signals';

export type CallState = 'init' | 'loading' | 'loaded' | { error: string };

export type NamedCallState<Prop extends string> = {
  [K in Prop as `${K}CallState`]: CallState;
};

export type NamedCallStateComputed<Prop extends string> = {
  [K in Prop as `${K}Loading`]: Signal<boolean>;
} & {
    [K in Prop as `${K}Loaded`]: Signal<boolean>;
  } & {
    [K in Prop as `${K}Error`]: Signal<string | null>;
  };

function getCallStateKeys(config: { collection: string }) {
  return {
    callStateKey: `${config.collection}CallState`,
    loadingKey: `${config.collection}Loading`,
    loadedKey: `${config.collection}Loaded`,
    errorKey: `${config.collection}Error`,
  };
}

export function withCallState<Prop extends string>(config: {
  collection: Prop;
}): SignalStoreFeature<
  { state: {}, signals: {}, methods: {} },
  {
    state: NamedCallState<Prop>,
    signals: NamedCallStateComputed<Prop>,
    methods: {}
  }
>;
export function withCallState<Prop extends string>(config: {
  collection: Prop;
}): SignalStoreFeature {
  const { callStateKey, errorKey, loadedKey, loadingKey } =
    getCallStateKeys(config);

  return signalStoreFeature(
    withState({ [callStateKey]: 'init' }),
    withComputed((state: Record<string, Signal<unknown>>) => {

      const callState = state[callStateKey] as Signal<CallState>;

      return {
        [loadingKey]: computed(() => callState() === 'loading'),
        [loadedKey]: computed(() => callState() === 'loaded'),
        [errorKey]: computed(() => {
          const v = callState();
          return typeof v === 'object' ? v.error : null;
        })
      }
    })
  );
}

export function setLoading<Prop extends string>(
  collection: Prop
): NamedCallState<Prop> {
  return { [`${collection}CallState`]: 'loading' } as NamedCallState<Prop>;
}

export function setLoaded<Prop extends string>(
  collection: Prop
): NamedCallState<Prop> {
  return { [`${collection}CallState`]: 'loaded' } as NamedCallState<Prop>;
}

export function setError<Prop extends string>(
  collection: Prop,
  error: string
): NamedCallState<Prop> {
  return { [`${collection}CallState`]: { error } } as NamedCallState<Prop>;
}
