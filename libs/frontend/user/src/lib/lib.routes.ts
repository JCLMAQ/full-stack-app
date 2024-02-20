import { Route } from '@angular/router';
import * as fromUsers from '@fe/user';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserComponent } from './user/user.component';

export const userRoutes: Route[] = [
  { path: 'userprofile/:id/:mode', component: UserProfileComponent },
  {
    path: '',
    component: UserComponent,
    providers: [
      // provideState(fromUsers.usersFeature),
      provideState(fromUsers.usersFeatureKey, fromUsers.usersReducer),
      provideEffects(fromUsers.UsersEffects),
    ],
  },
];
