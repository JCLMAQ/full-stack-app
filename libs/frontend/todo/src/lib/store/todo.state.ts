
// import { withCallState } from '@angular-architects/ngrx-toolkit';
import { SelectionModel } from '@angular/cdk/collections';
import { withLogger } from '@fe/shared/util-signal-store';
import { signalStore, withHooks, withState } from '@ngrx/signals';
import { withNavigationMethods } from './todo-navigation.methods';
import { withTodosMethods } from './todo.methods';
import { TodoInterface } from './todo.model';
import { withTodosSelectors } from './todo.selectors';

export interface TodoStateInterface {
  items: TodoInterface[],
  filter: {
    ownerId: string | null
    orgId: string | null,
  },
  selectedId: string | null,
  selectedIds: string[],
  selection: SelectionModel<TodoInterface>,
}

export const initialTodoState: TodoStateInterface = {
  items: [],
  filter: {
    ownerId: "test",
    orgId: "test"
  },
  selectedId: null,
  selectedIds: [],
  selection: new SelectionModel<TodoInterface>(true, []),
};

// Base on: https://offering.solutions/blog/articles/2023/12/03/ngrx-signal-store-getting-started/
// and also on: https://www.angulararchitects.io/blog/the-new-ngrx-signal-store-for-angular-2-1-flavors/
// and : https://www.angulararchitects.io/blog/smarter-not-harder-simplifying-your-application-with-ngrx-signal-store-and-custom-features/

export const TodoStore = signalStore(
    { providedIn: 'root' },
    withLogger('todo'),
    withState(initialTodoState),
    withTodosSelectors(),
    withNavigationMethods(),
    withTodosMethods(),

    withHooks({
      onInit:
        (store) => {
          store.load(),
          store.initSelectedID()
        },
      onDestroy() {
        console.log('on destroy');
      },
    }),

  );


