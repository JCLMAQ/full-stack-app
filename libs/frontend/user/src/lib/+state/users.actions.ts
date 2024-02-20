import { Predicate, Update } from '@ngrx/entity';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserInterface } from './users.models';

export const usersAPIActions = createActionGroup({
  source: 'Users API',
  events: {
    'Load Users Success': props<{ users: UserInterface[]}>(),
    'Load Users Failure': props<{ error: string }>(),
  },
});

export const usersPageActions = createActionGroup({
  source: 'Users Page',
  events: {
    'Init': emptyProps(),
    load: emptyProps(),
    select: props<UserInterface>(),
    selectUser: props<{ userId: string }>(),
    loadUsers: props<{ users: UserInterface[]}>(),
    setUser: props<{ user: UserInterface }>(),
    setUsers: props<{ users: UserInterface[] }>(),
    addUser: props<{ user: UserInterface }>(),
    addUsers: props<{ users: UserInterface[] }>(),
    upsertUser: props<{ user: UserInterface }>(),
    upsertUsers: props<{ users: UserInterface[] }>(),
    updateUser: props<{ update: Update<UserInterface> }>(),
    updateUsers: props<{ updates: Update<UserInterface>[] }>(),
    // mapUser: props<{ entityMap: EntityMapOne<UserInterface> }>(),
    // mapUsers: props<{ entityMap: EntityMap<UserInterface> }>(),
    deleteUser: props<{ id: string }>(),
    deleteUsers: props<{ ids: string[] }>(),
    deleteUsersByPredicate: props<{ predicate: Predicate<UserInterface> }>(),
    clearUsers: emptyProps()
  },
});


/*
addOne: Add one entity to the collection.
addMany: Add multiple entities to the collection.
setAll: Replace current collection with provided collection.
setOne: Add or Replace one entity in the collection.
setMany: Add or Replace multiple entities in the collection.
removeOne: Remove one entity from the collection.
removeMany: Remove multiple entities from the collection, by id or by predicate.
removeAll: Clear entity collection.
updateOne: Update one entity in the collection. Supports partial updates.
updateMany: Update multiple entities in the collection. Supports partial updates.
upsertOne: Add or Update one entity in the collection.
upsertMany: Add or Update multiple entities in the collection.
mapOne: Update one entity in the collection by defining a map function.
map: Update multiple entities in the collection by defining a map function, similar to Array.map.
*/
