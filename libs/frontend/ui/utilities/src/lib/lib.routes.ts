import { Route } from '@angular/router';
import { ThemeSwitchComponent } from './themeswitch/themeswitch.component';

export const uiUtilitiesRoutes: Route[] = [
  {path: '', pathMatch: 'full', component: ThemeSwitchComponent},
  {path: 'themeswitch', pathMatch: 'full', component: ThemeSwitchComponent}
];
