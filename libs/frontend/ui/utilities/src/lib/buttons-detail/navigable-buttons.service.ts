import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { NavigableDS } from './navigable-buttons-ds';
// import Collection from 'wakanda-client/dist/presentation/collection';


@Injectable({
  providedIn: 'root'
})
export class NavigableButtonsService {
  list$: Subject<Collection<any>> = new Subject();
  navigation: NavigableDS | undefined;

  constructor() {
    this.list$.subscribe((collection) => {
      this.navigation = new NavigableDS(collection);
    });
  }
}
