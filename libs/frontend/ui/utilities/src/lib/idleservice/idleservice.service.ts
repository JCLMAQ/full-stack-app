

import { Injectable } from '@angular/core';
import { interval, Observable, Subject, Subscription, throttle } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// Base on: https://dev.to/sarmitha/implement-idle-timeout-in-angular-c94?context=digest


export class IdleService {
  private idleSubject = new Subject<boolean>();
  private timeout = 1200; //seconds
  private lastActivity?: Date;
  private idleCheckInterval = 600; //seconds
  private idleSubscription?: Subscription

  constructor() {
    this.resetTimer();
    this.startWatching();
  }

  get idleState(): Observable<boolean> {
    return this.idleSubject.asObservable();
  }

  private startWatching(): void {
    this.idleSubscription = interval(this.idleCheckInterval * 1000)
    .pipe(throttle(() => interval(1000)))
    .subscribe(() => {
      const now = new Date();

      if (now.getTime() - this.lastActivity?.getTime()! > this.timeout * 1000) {
        this.idleSubject.next(true);
      }
    });
  }

  resetTimer(): void {
    this.lastActivity = new Date();
    this.idleSubject.next(false);
  }

  stopWatching(): void {
    if (this.idleSubscription) {
      this.idleSubscription.unsubscribe();
    }
  }
}
