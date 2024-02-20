import { createAction, props } from '@ngrx/store';
import { ICurrentUser } from '../auth.model';


export const login = createAction(
    '[LOGIN PAGE] User Login',
    props<{user: ICurrentUser | null}>()
    );

export const logout = createAction(
    '[TOP MENU RIGTH] User logout'
);
