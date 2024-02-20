
import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { UsersService } from "../services/users.service";
import { usersAPIActions, usersPageActions } from "./users.actions";

@Injectable()

export class UsersEffects {

  private actions$ = inject(Actions);
  private userService = inject(UsersService);

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersPageActions.load),
      mergeMap( () => {
        return this.userService.getUsers().pipe(
          map( (users) => usersAPIActions.loadUsersSuccess({users})),
          catchError((error) =>
          of(usersAPIActions.loadUsersFailure({error: error.message}))
          )
        );
      }
    )
    )
  )

}
