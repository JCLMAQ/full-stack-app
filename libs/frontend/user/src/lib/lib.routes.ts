import { Route } from '@angular/router';
import * as fromUsers from '@fe/user';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';



export const userRoutes: Route[] = [
  { path: 'userprofile/:id/:mode', loadComponent: () => import('./user-profile/user-profile.component').then(m => m.UserProfileComponent) },
  {
    path: '',
    loadComponent: () => import('./user/user.component').then(m => m.UserComponent),
    providers: [
      // provideState(fromUsers.usersFeature),
      provideState(fromUsers.usersFeatureKey, fromUsers.usersReducer),
      provideEffects(fromUsers.UsersEffects),
    ],
  },
];
