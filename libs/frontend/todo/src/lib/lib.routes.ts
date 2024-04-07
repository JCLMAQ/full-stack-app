import { Route } from '@angular/router';
import { hasUnsavedChangesGuard } from '@fe/utilities';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { TodoComponent } from './todo/todo.component';

export const todoRoutes: Route[] = [
  { path: 'tododetail/:id/:mode', component: TodoDetailComponent },
  { path: 'todo/:id/:mode', component: TodoDetailComponent, canDeactivate: [hasUnsavedChangesGuard] },
  { path: '', component: TodoComponent },

];
