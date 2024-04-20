import { Route } from '@angular/router';
import { RegisterComponent } from './register/register.component';

export const uiAuthRoutes: Route[] = [
  {path: '', pathMatch: 'full', component: RegisterComponent},
  // { path: 'login', component: LoginComponent,
      // resolve: {
      //   auths: AuthResolver
      // }
    // },
    { path: 'register', component: RegisterComponent,
      // resolve: {
      //   auths: AuthResolver
      // }
    },
    // { path: 'forgotpwd', component: ForgotpwdComponent,
    //   // resolve: {
    //   //   auths: AuthResolver
    //   // }
    // },
    // { path: '', component: LoginComponent,
    //     // resolve: {
    //     //   auths: AuthResolver
    //     // }
    //   },

];
