import { inject } from '@angular/core';
import { setLoaded, setLoading, withCallState } from '@fe/shared/util-signal-store';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStoreFeature,
  type,
  withMethods,
  withState,
} from '@ngrx/signals';
import { setAllEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { TodoService } from '../services/todo.service';
import { TodoInterface } from './todo.model';
import { TodoStateInterface, initialTodoState } from './todo.state';

// withCallState base on: https://www.angulararchitects.io/blog/the-new-ngrx-signal-store-for-angular-2-1-flavors/

export function withTodosMethods() {
  return signalStoreFeature(
    { state: type<TodoStateInterface>() },
    withState(initialTodoState),
    withCallState(),
    withEntities({ entity: type<TodoInterface>(), collection: 'todo'}),
    withMethods((store, todoService = inject(TodoService)) => ({
      async load() {
        patchState(store, setLoading());
        const items = await todoService.getItemsAsPromise();
        console.log("Items just fetched : ", items)
        patchState(store, { items },setLoaded());
        console.log("Items Loaded in the store: ", store)
        patchState(store, setAllEntities(items, { collection: 'todo'}))
      },
      // Load Todo with rxjs
      loadAllTodos: rxMethod<void>(
        pipe(
          switchMap(() => {
            patchState(store, setLoading());
            return todoService.getItems().pipe(
              tapResponse({
                // next: (items: any) => patchState(store, { items }),
                next: (items) => patchState(store,  setAllEntities(items, { collection: 'todo'})),
                error: console.error,
                finalize: () => patchState(store, setLoaded()),
              })
            );
          })
        )
      ),
      // Load Todo by Promise
      async loadAllTodosByPromise() {
        patchState(store, setLoading());
        const items = await todoService.getItemsAsPromise();
        console.log("Items just fetched : ", items)
        patchState(store, { items },setLoaded());
        console.log("Items Loaded in the store: ", store)
        patchState(store, setAllEntities(items, { collection: 'todo'}))
      },
      // Add todo (rxjs)
      addTodo: rxMethod<string>(
        pipe(
          switchMap((value) => {
            patchState(store, setLoading( ));
            return todoService.addItem(value).pipe(
              tapResponse({
                next: (item) =>
                  patchState(store, { items: [...store.items(), item] }),
                  // patchState(store, addEntity()),
                error: console.error,
                finalize: () => patchState(store, setLoaded()),
              })
            );
          })
        )
      ),
      deleteTodo: rxMethod<TodoInterface>(
        pipe(
          switchMap((todo) => {
            patchState(store, setLoading());
            return todoService.deleteItem(todo).pipe(
              tapResponse({
                next: () => {
                  patchState(store, {
                    items: [...store.items().filter((x) => x.id !== todo.id)],
                  });
                },
                error: console.error,
                finalize: () => patchState(store, setLoaded() ),
              })
            );
          })
        )
      ),

      // Example: Todo state to "done"
      // moveToDone: rxMethod<TodoInterface>(
      //   pipe(
      //     switchMap((todo) => {
      //       patchState(store, { isLoading: true, loaded: false});

      //       const toSend = { ...todo, todoState: 'DONE' };

      //       return todoService.updateItem(toSend).pipe(
      //         tapResponse({
      //           next: (updatedTodo) => {
      //             const allItems = [...store.items()];
      //             const index = allItems.findIndex((x) => x.id === todo.id);

      //             allItems[index] = updatedTodo;

      //             patchState(store, {
      //               items: allItems,
      //             });
      //           },
      //           error: console.error,
      //           finalize: () => patchState(store, { isLoading: false, loaded: true }),
      //         })
      //       );
      //     })
      //   )
      // ),

      /* Example:
          addPost(title: string) {
          const newPost: PostInterface = {
            id: crypto.randomUUID(),
            title,
          };
          const updatedPosts = [...store.posts(), newPost];
          patchState(store, { posts: updatedPosts });
        },
        removePost(id: string) {
          const updatedPosts = store.posts().filter((post) => post.id !== id);
          patchState(store, { posts: updatedPosts });
        },
        addPosts(posts: PostInterface[]) {
          patchState(store, { posts });
        },
      */


    })),

  );
}
