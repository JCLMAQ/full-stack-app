import { Route } from '@angular/router';
import { ThemeSwitchComponent } from '../../../theming/src/lib/themeswitch/themeswitch.component';

export const uiUtilitiesRoutes: Route[] = [
  {path: '', pathMatch: 'full', component: ThemeSwitchComponent},
  {path: 'themeswitch', pathMatch: 'full', component: ThemeSwitchComponent}
];
