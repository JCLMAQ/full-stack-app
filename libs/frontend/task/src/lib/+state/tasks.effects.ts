import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { TasksService } from '../services/tasks.service';
import { tasksAPIActions, tasksPageActions } from './tasks.actions';

@Injectable()

export class TasksEffects {

  private actions$ = inject(Actions);
  private tasksService = inject(TasksService);

  getTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tasksPageActions.load),
      mergeMap( () => {
        return this.tasksService.getTasks().pipe(
          map( (tasks) => tasksAPIActions.loadTasksSuccess({tasks})),
          catchError((error) =>
          of(tasksAPIActions.loadTasksFailure({error: error.message}))
          )
        );
      }
    )
    )
  )
}
