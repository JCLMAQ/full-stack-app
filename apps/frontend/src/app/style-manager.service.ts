// style-manager.service.ts

import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StyleManager {
  isDark2 = false;
  constructor(
    private overlay: OverlayContainer
  ) {}


  toggleDarkTheme() {
    const darkClassName = 'darkMode';
    if (this.isDark2) {
      // this.removeStyle('dark-theme');
      // document.body.classList.remove('dark-theme');
      this.overlay.getContainerElement().classList.remove(darkClassName);
      this.isDark2 = false;
    } else {
      // const href = 'dark-theme.css';
      // getLinkElementForKey('dark-theme').setAttribute('href', href);
      // document.body.classList.add('dark-theme');
      this.overlay.getContainerElement().classList.add(darkClassName);
      this.isDark2 = true;
    }
  }

  // const darkClassName = 'darkMode';
  // this.className = darkMode ? darkClassName : '';
  // if (darkMode) {
  //   this.isDark2 = true
  //   this.overlay.getContainerElement().classList.add(darkClassName);
  // } else {
  //   this.isDark2 = false
  //   this.overlay.getContainerElement().classList.remove(darkClassName);
  // }




  removeStyle(key: string) {
    const existingLinkElement = getExistingLinkElementByKey(key);
    if (existingLinkElement) {
      document.head.removeChild(existingLinkElement);
    }
  }
}

function getLinkElementForKey(key: string) {
  return getExistingLinkElementByKey(key) || createLinkElementWithKey(key);
}

function getExistingLinkElementByKey(key: string) {
  return document.head.querySelector(
    `link[rel="stylesheet"].${getClassNameForKey(key)}`
  );
}

function createLinkElementWithKey(key: string) {
  const linkEl = document.createElement('link');
  linkEl.setAttribute('rel', 'stylesheet');
  linkEl.classList.add(getClassNameForKey(key));
  document.head.appendChild(linkEl);
  return linkEl;
}

function getClassNameForKey(key: string) {
  return `style-manager-${key}`;
}
