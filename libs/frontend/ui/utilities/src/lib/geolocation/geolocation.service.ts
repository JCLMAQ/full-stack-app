import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/*
In this service, we define a method called “getCurrentPosition,”
which returns an Observable.
This method checks if the geolocation feature is available
in the user’s browser and then retrieves the current position.
*/

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  getCurrentPosition(): Observable<any> {
    return new Observable((observer) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            observer.next(position);
            observer.complete();
          },
          (error) => {
            observer.error(error);
          }
        );
      } else {
        observer.error('Geolocation is not available in this browser.');
      }
    });
  }
}

