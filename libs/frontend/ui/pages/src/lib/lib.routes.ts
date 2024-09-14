import { Route } from '@angular/router';



export const uiPagesRoutes: Route[] = [// order is important
{path: 'homepage', pathMatch: 'full', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)},
{path: 'aboutpage', pathMatch: 'full', loadComponent: () => import('./about/about.component').then(m => m.AboutComponent)},
// {path: 'pagenotfoundpage', pathMatch: 'full', component: PageNotFoundComponent},
// Always at the end
{path: '', pathMatch: 'full', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)},
// {path: '**', pathMatch: 'full', component: PageNotFoundComponent}];
]
