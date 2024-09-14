import { Route } from '@angular/router';


export const languageSelectorRoutes: Route[] = [
  { path: '', loadComponent: () => import('./language-selector/language-selector.component').then(m => m.LanguageSelectorComponent) },
];
