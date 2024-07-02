/*

From: https://levelup.gitconnected.com/enhancing-angular-signals-da6ba353193a

 Custom signal wrapper called reducerSignal that only exposes the actions defined in the reducers object.
 These actions are the only way to update the state of the signal,
 which makes the signal more declarative and less imperative.
 This is a great way to encapsulate state and make it more predictable and easier to reason about.

 Example of use:

 const mySignal = reducerSignal(0, {
  increment: (state: number) => state + 1,
  decrement: (state: number) => state - 1
});

mySignal.increment();

mySignal.set(69); <-- Error
mySignal.update(s => s + 420); <-- Error

*/

import { computed, Signal, signal } from '@angular/core';

export type Reducer<T, TPayload = any> = (state: T, payload?: TPayload) => T;

type Reducers<T> = {
  [K: string]: Reducer<T, any>;
}

type ActionSignal<T, TPayload extends Reducers<T>> = Signal<T> & {
  [K in keyof TPayload]: TPayload[K] extends (state: T, payload: infer P) =>
      T
    ? (payload?: P) => void
    : (payload?: Parameters<TPayload[K]>[1]) => void;
}

export function reducerSignal<T, TPayload extends Reducers<T>>(
  initialValue: T, reducers: TPayload
): ActionSignal<T, TPayload> {
  const writableSignal = signal(initialValue);
  const readonlySignal = computed(() => writableSignal());

  for (const [key, reducer] of Object.entries(reducers)) {
    Object.defineProperty(readonlySignal, key, {
      value: (payload?: any) => {
        writableSignal.set(reducer(readonlySignal(), payload));
      }
    });
  }

  return readonlySignal as ActionSignal<T, TPayload>;
}
