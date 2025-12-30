
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { SelectionModel } from '@angular/cdk/collections';
import { withLogger, withNavigationMethods } from '@fe/shared/util-signal-store';
import { signalStore, withHooks, withState } from '@ngrx/signals';
import { withTodosMethods } from './todo.methods';
import { TodoInterface } from './todo.model';
import { withTodosSelectors } from './todo.selectors-entities';

export interface TodoStateInterface {
  items: TodoInterface[],
  filter: {
    ownerId: string | null
    orgId: string | null,
  },
  selectedId: string | null,
  selectedIds: string[],
  selection: SelectionModel<TodoInterface>,
  todoLoaded: boolean;
};

// items, selection, selectedId, selectedIds

export const initialTodoState: TodoStateInterface = {
  items: [],
  filter: {
    ownerId: "test",
    orgId: "test"
  },
  selectedId: null,
  selectedIds: [],
  selection: new SelectionModel<TodoInterface>(true, []),
  todoLoaded: false
};

// Base on: https://offering.solutions/blog/articles/2023/12/03/ngrx-signal-store-getting-started/
// and also on: https://www.angulararchitects.io/blog/the-new-ngrx-signal-store-for-angular-2-1-flavors/
// and : https://www.angulararchitects.io/blog/smarter-not-harder-simplifying-your-application-with-ngrx-signal-store-and-custom-features/

export const TodoStore = signalStore(
    { providedIn: 'root' },

    withState(initialTodoState),

    withTodosMethods(),
    withTodosSelectors(),
    withNavigationMethods(),
    withDevtools('todo'),
    withLogger('todo'),
    withHooks({
      onInit:
        (store) => {
          store.load();
          store.initSelectedID();
        },
      onDestroy() {
        console.log('on destroy');
      },
    }),

  );


