import { Route } from '@angular/router';

export const taskRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./task/task.component').then(m => m.TaskComponent)
  },
];
