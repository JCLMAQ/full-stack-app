
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import { AuthActions } from '../action-types';
import { ICurrentUser } from '@app/auth/auth.model';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: ICurrentUser | undefined;
}

export const initialAuthState: AuthState = {
  user: undefined
};

// export const reducers: ActionReducerMap<AuthState> = {
// };


export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state: any, action: any) => {
   return {
     user: action.user
   };
  }),

  on(AuthActions.logout, (state: any, action: any ) => {
    return {
      user: undefined
    };
  })

 );

export const metaReducers: MetaReducer<AuthState>[] = !environment.production ? [] : [];
