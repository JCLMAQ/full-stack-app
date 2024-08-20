import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";


@Injectable()
export class ThemeSwitchService {

  private _darkTheme: BehaviorSubject<boolean>

  constructor() {
    this._darkTheme = new BehaviorSubject<boolean>(false);
  }

  setDarkThemeState(isDarkTheme: boolean): void {
    this._darkTheme.next(isDarkTheme)
  }
  getDarkThemeState(): Observable<boolean> {
    return this._darkTheme.asObservable();
  }
}
