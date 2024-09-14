import { Route } from '@angular/router';
import { hasUnsavedChangesGuard } from '@fe/utilities';



export const todoRoutes: Route[] = [
  { path: 'tododetail/:id/:mode', loadComponent: () => import('./todo-detail/todo-detail.component').then(m => m.TodoDetailComponent) },
  { path: 'todo/:id/:mode', loadComponent: () => import('./todo-detail/todo-detail.component').then(m => m.TodoDetailComponent), canDeactivate: [hasUnsavedChangesGuard] },
  { path: '', loadComponent: () => import('./todo/todo.component').then(m => m.TodoComponent) },

];
