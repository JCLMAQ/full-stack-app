import { Route } from '@angular/router';
import * as fromTasks from '@fe/task';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { TaskComponent } from './task/task.component';
export const taskRoutes: Route[] = [
  {
    path: '',
    component: TaskComponent,
    providers: [
      provideState(fromTasks.tasksFeature),
      provideEffects(fromTasks.TasksEffects),
    ],
  },
];
