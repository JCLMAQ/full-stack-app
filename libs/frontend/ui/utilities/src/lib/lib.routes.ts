import { Route } from '@angular/router';


export const uiUtilitiesRoutes: Route[] = [
  {path: '', pathMatch: 'full', loadComponent: () => import('../../../theming/src/lib/themeswitch/themeswitch.component').then(m => m.ThemeSwitchComponent)},
  {path: 'themeswitch', pathMatch: 'full', loadComponent: () => import('../../../theming/src/lib/themeswitch/themeswitch.component').then(m => m.ThemeSwitchComponent)}
];
