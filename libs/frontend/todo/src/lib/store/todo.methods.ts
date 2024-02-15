import { inject } from '@angular/core';
import { setLoaded, setLoading, withCallState, withUndoRedo } from '@fe/shared/util-signal-store';
import {
  patchState,
  signalStoreFeature,
  type,
  withMethods
} from '@ngrx/signals';
import { addEntity, removeEntity, setAllEntities, updateEntity, withEntities } from '@ngrx/signals/entities';
import { TodoService } from '../services/todo.service';
import { TodoInterface } from './todo.model';
import { TodoStateInterface } from './todo.state';
// withCallState base on: https://www.angulararchitects.io/blog/the-new-ngrx-signal-store-for-angular-2-1-flavors/

export function withTodosMethods() {
  return signalStoreFeature(
    { state: type<TodoStateInterface>() },
    // withState(initialTodoState),
    withEntities({ entity: type<TodoInterface>(), collection: 'todo'}),
    withCallState({collection: 'todo'}),
    withMethods((store, todoService = inject(TodoService)) => ({

      async load() {
        if (!store.todoLoaded()) {
          patchState(store, setLoading('todo'));
          const items = await todoService.load();
          patchState(store, { items },setLoaded('todo'));
          patchState(store, setAllEntities( items, { collection: 'todo'}))
        }
      },

      async add(data: {
        content: string | undefined | null;
        title: string| undefined | null;
        ownerId: string;
        orgId: string }) {
        patchState(store, setLoading('todo'));
        const todo = await todoService.addItem(data);
        patchState(store, addEntity( todo, { collection: 'todo'}));
        patchState(store, setLoaded('todo'));
      },

      async remove(id: string) {
        patchState(store, setLoading('todo'));
        await todoService.deleteItem(id);
        patchState(store, removeEntity( id, { collection: 'todo'}));
        patchState(store, setLoaded('todo'));
      },

      async update(id: string, data: TodoInterface) {
        patchState(store, setLoading('todo'));
        await todoService.updateItem(data);
        const changes = { title: data.title , content: data.content }
        patchState(store, updateEntity({ id, changes }, { collection: 'todo'}));
        patchState(store, setLoaded('todo'));
      },

      toggleSelected( selectedRowId: string) {
        const allSelectedRowId = store.selectedIds();
        const existSelectedRowId = allSelectedRowId.filter( item => item === selectedRowId)
        if(existSelectedRowId.length === 0) {
          patchState(store, { selectedIds: [ ...store.selectedIds(), selectedRowId] })
          patchState(store, { selectedId: selectedRowId })
        } else {
          const updateSelectedRowId = allSelectedRowId.filter( item => item !== selectedRowId)
          patchState(store, { selectedIds: updateSelectedRowId })
          patchState(store, { selectedId: "" })
        }
      },

      newSelectedItem(newSelectedItemIndex: number) {

        const selectionId = store.selection().selected[newSelectedItemIndex]
        // const selectedId = store.selectedIds()[newSelectedItemIndex]
        patchState(store,{ selectedId: selectionId.id })
      },

      selectedItemUpdate(selectedRowId){
        const allSelectedRowId = store.selectedIds();
        if(allSelectedRowId.length > 0 ) {
          const existSelectedRowId = allSelectedRowId.filter( item => item === selectedRowId);
          if(existSelectedRowId.length === 0) {
            patchState(store, { selectedIds: [ ...store.selectedIds(), selectedRowId] })
          };
          patchState(store, { selectedIds: [ ...store.selectedIds()] })
          patchState(store,{ selectedId: selectedRowId })
        } else {
          patchState(store, { selectedIds: [ ...store.selectedIds(), selectedRowId] });
          patchState(store,{ selectedId: selectedRowId })
        }
      }

    })),
    withUndoRedo({
      collections: ['todo'],
    }),
  )
}
