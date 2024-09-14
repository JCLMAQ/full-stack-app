import { Route } from '@angular/router';
import * as fromTasks from '@fe/task';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

export const taskRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./task/task.component').then(m => m.TaskComponent),
    providers: [
      provideState(fromTasks.tasksFeature),
      provideEffects(fromTasks.TasksEffects),
    ],
  },
];
