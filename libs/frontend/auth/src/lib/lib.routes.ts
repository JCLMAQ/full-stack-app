import { Route } from '@angular/router';




export const uiAuthRoutes: Route[] = [
  { path: '', pathMatch: 'full', loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent) },
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
    // resolve: {
    //   auths: AuthResolver
    // }
  },
  {
    path: 'register', loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent),
    // resolve: {
    //   auths: AuthResolver
    // }
  },
  { path: 'forgotpwd', loadComponent: () => import('./forgotpwd/forgotpwd.component').then(m => m.ForgotpwdComponent),
    // resolve: {
    //   auths: AuthResolver
    // }
  },

];
