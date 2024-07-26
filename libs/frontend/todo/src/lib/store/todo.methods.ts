import { inject } from '@angular/core';
import { setLoaded, setLoading, withCallState, withUndoRedo } from '@fe/shared/util-signal-store';
import {
  patchState,
  signalStoreFeature,
  type,
  withMethods
} from '@ngrx/signals';
import { addEntity, entityConfig, removeEntity, setAllEntities, updateEntity, withEntities } from '@ngrx/signals/entities';
import { TodoService } from '../services/todo.service';
import { withNavigationMethods } from './todo-navigation.methods';
import { TodoInterface } from './todo.model';
import { TodoStateInterface } from './todo.state';

// withCallState base on: https://www.angulararchitects.io/blog/the-new-ngrx-signal-store-for-angular-2-1-flavors/


const todoConfig = entityConfig({
  entity: type<TodoInterface>(),
  collection: 'todo'
});

export function withTodosMethods() {
  return signalStoreFeature(
    { state: type<TodoStateInterface>() },
    // withState(initialTodoState),
    withEntities(todoConfig),
    withCallState({collection: 'todo'}),
    withNavigationMethods(),
    withMethods((store, todoService = inject(TodoService)) => ({

      async load() {
        if (!store.todoLoaded()) {
          patchState(store, setLoading('todo'));
          const items = await todoService.load();
          patchState(store, { items },setLoaded('todo'));
          patchState(store, setAllEntities( items, todoConfig));
        }
      },

      async add(data: {
        content: string | undefined | null;
        title: string| undefined | null;
        ownerId: string;
        orgId: string }) {
        patchState(store, setLoading('todo'));
        const todo = await todoService.addItem(data);
        patchState(store, addEntity( todo, todoConfig));
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

      initSelectedID() {
        const firstIndex = store.items().at(0)?.id;
        patchState(store, { selectedId: firstIndex })
      },

      todoIdSelectedId(selectedRowId: string) {
        patchState(store, { selectedId: selectedRowId })
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

      newSelectedSelectionItem(newSelectedSelectionItemIndex: number) {
        const newSelectedSelectionItem = store.selection().selected[newSelectedSelectionItemIndex]
        // const selectedId = store.selectedIds()[newSelectedItemIndex]
        patchState(store,{ selectedId: newSelectedSelectionItem.id })
      },

      newSelectedItem(newSelectedItemIndex: number) {
        const selectedItem = store.items()[newSelectedItemIndex]
        patchState(store,{ selectedId: selectedItem.id })
      },

      selectedItemUpdate(selectedRowId: string){
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


