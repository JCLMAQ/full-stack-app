import { Route } from '@angular/router';
import { PageNotFoundComponent } from '@fe/pages';
import { hasUnsavedChangesGuard } from '@fe/utilities';

export const appRoutes: Route[] = [
  {
    path: 'tasks',
    loadChildren: () => import('@fe/task').then((m) => m.taskRoutes),
    canDeactivate: [hasUnsavedChangesGuard]
  },
  {
    path: 'todos',
    loadChildren: () => import('@fe/todo').then((m) => m.todoRoutes),
    canDeactivate: [hasUnsavedChangesGuard]
  },
  {
    path: 'posts',
    loadChildren: () => import('@fe/post').then((m) => m.postRoutes),
    canDeactivate: [hasUnsavedChangesGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('@fe/user').then((m) => m.userRoutes),
    canDeactivate: [hasUnsavedChangesGuard]
  },

  {
    path: 'page',
    loadChildren: () => import('@fe/pages').then((m) => m.uiPagesRoutes),
  },

  {
    path: 'auth',
    loadChildren: () => import('@fe/ui/auth').then((m) => m.uiAuthRoutes),
  },
  { path: '', redirectTo: 'page', pathMatch: 'full' },

  { path: '**', component: PageNotFoundComponent },
];
