import { Injectable, inject } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { TasksService } from '../services/tasks.service';

@Injectable()

export class TasksEffects {

  private actions$ = inject(Actions);
  private tasksService = inject(TasksService);

  // getTasks$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(tasksPageActions.load),
  //     mergeMap( () => {
  //       return this.tasksService.getTasks().pipe(
  //         map( (tasks) => tasksAPIActions.loadTasksSuccess({tasks})),
  //         catchError((error) =>
  //         of(tasksAPIActions.loadTasksFailure({error: error.message}))
  //         )
  //       );
  //     }
  //   )
  //   )
  // )
}
