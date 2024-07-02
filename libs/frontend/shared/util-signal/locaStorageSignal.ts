import { signal, WritableSignal } from '@angular/core';

export function localStorageSignal<T>(
  initialValue: T,
  localStorageKey: string
): WritableSignal<T> {
  const storedValueRaw = localStorage.getItem(localStorageKey);
  if (storedValueRaw) {
    try {
      initialValue = JSON.parse(storedValueRaw);
    } catch (e) {
      console.error('Failed to parse stored value for key:', localStorageKey);
    }
  } else {
    localStorage.setItem(localStorageKey, JSON.stringify(initialValue));
  }

  const writableSignal = signal(initialValue);

  // monkey-patch the set method to update the localStorage value
  const originalSet = writableSignal.set;
  writableSignal.set = (value: T) => {
    localStorage.setItem
    (localStorageKey, JSON.stringify(value));
    originalSet(value);
  };

  return writableSignal;
}

/*
From: https://levelup.gitconnected.com/enhancing-angular-signals-da6ba353193a
Signal wrapper function that persists the state of a signal in the localStorage. Which can be use like:

const themeSignal = localStorageSignal(UserTheme.LIGHT, 'theme');

console.log(themeSignal());
// --> UserTheme.DARK, because it was retrieved from localStorage
*/
