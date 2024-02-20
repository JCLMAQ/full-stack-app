import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import * as fromTasks from 'libs/frontend/task/src';
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
