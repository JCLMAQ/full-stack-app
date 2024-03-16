
import { withCallState, withDataService, withLogger, withUndoRedo } from '@fe/shared/util-signal-store';
import { signalStore, type, withHooks, withState } from '@ngrx/signals';
import { withEntities } from '@ngrx/signals/entities';
import { TodoService } from '../services/todo.service';
import { withTodosMethods } from './todo.methods';
import { TodoInterface } from './todo.model';
import { withTodosSelectors } from './todo.selectors';

export interface TodoStateInterface {
  items: TodoInterface[],
  filter: {
    ownerId: string | null
    orgId: string | null,
  }

}

export const initialTodoState: TodoStateInterface = {
  items: [],
  filter: {
    ownerId: "test",
    orgId: "test"
  }
};


// Base on: https://offering.solutions/blog/articles/2023/12/03/ngrx-signal-store-getting-started/
// and also on: https://www.angulararchitects.io/blog/the-new-ngrx-signal-store-for-angular-2-1-flavors/
// and : https://www.angulararchitects.io/blog/smarter-not-harder-simplifying-your-application-with-ngrx-signal-store-and-custom-features/


export const TodoStore = signalStore(
    { providedIn: 'root' },

    withCallState({collection: 'todo'}),
    withEntities( {entity: type<TodoInterface>(), collection: 'todo'}),
    // withSelectedEntity(),
    withLogger('todo'),
    // withComputed(({ postEntities }) => ({
    //   selected: computed(() => postEntities().filter((f) => )),
    // })),
    withState(initialTodoState),
    withTodosMethods(),
    withTodosSelectors(),
    withDataService({
      dataServiceType: TodoService,
      filter: { ownerId: "", orgId: "" },
      collection: 'todo'
    }),
    withUndoRedo({
      collections: ['todo'],
    }),
    withHooks({
      onInit: (store) => store.load(),
      onDestroy() {
        console.log('on destroy');
      },
    }),

  );


