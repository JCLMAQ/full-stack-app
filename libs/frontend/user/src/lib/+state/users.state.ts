import { EntityAdapter, EntityState, createEntityAdapter, } from "@ngrx/entity";
import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { usersAPIActions, usersPageActions } from "./users.actions";
import { UserInterface } from "./users.models";


// export const USERS_FEATURE_KEY = 'users';


export interface UsersStateInterface extends EntityState<UserInterface>{
  isLoading: boolean;
  error: string | null;
  loaded: boolean;
  selectedUserId: string | undefined | null;
}

export const usersAdapter: EntityAdapter<UserInterface> = createEntityAdapter<UserInterface>();

export const initialUsersState: UsersStateInterface = usersAdapter.getInitialState ({
  isLoading: false,
  loaded: false,
  error: null,
  selectedUserId: null,
});

const reducer = createReducer(
  initialUsersState,
  // Page Actions
  on(usersPageActions.load,(state) => ({
    ...state,
    isLoading: true,
    loaded: false,
    error: null,
  }) ),
  on(usersPageActions.init, (state) => ({
    ...state,
    isLoading: false,
    loaded: false,
    error: null,
  })),
  on(usersPageActions.loadUsers, (state, { users }) => {
    return usersAdapter.addMany(users, {
      ...state,
      selectedUserId: null });
  }),
  on(usersPageActions.selectUser, (state, action) => ({
    ...state,
    selectedUserId: action.userId,
  })),
  on(usersPageActions.addUser, (state, { user }) => {
    return usersAdapter.addOne(user, state)
  }),
  on(usersPageActions.setUser, (state, { user }) => {
    return usersAdapter.setOne(user, state)
  }),
  on(usersPageActions.setUsers, (state, { users }) => {
    return usersAdapter.setAll(users, state)
  }),
  on(usersPageActions.upsertUser, (state, { user }) => {
    return usersAdapter.upsertOne(user, state);
  }),
  on(usersPageActions.addUsers, (state, { users }) => {
    return usersAdapter.addMany(users, state);
  }),
  on(usersPageActions.upsertUsers, (state, { users }) => {
    return usersAdapter.upsertMany(users, state);
  }),
  on(usersPageActions.updateUser, (state, { update }) => {
    return usersAdapter.updateOne(update, state);
  }),
  on(usersPageActions.updateUsers, (state, { updates }) => {
    return usersAdapter.updateMany(updates, state);
  }),
  // on(usersPageActions.mapUser, (state, { entityMap }) => {
  //   return usersAdapter.mapOne(entityMap, state);
  // }),
  // on(usersPageActions.mapUsers, (state, { entityMap }) => {
  //   return usersAdapter.map(entityMap, state);
  // }),
  on(usersPageActions.deleteUser, (state, { id }) => {
    return usersAdapter.removeOne(id, state);
  }),
  on(usersPageActions.deleteUsers, (state, { ids }) => {
    return usersAdapter.removeMany(ids, state);
  }),
  on(usersPageActions.deleteUsersByPredicate, (state, { predicate }) => {
    return usersAdapter.removeMany(predicate, state);
  }),
  on(usersPageActions.loadUsers, (state, { users }) => {
    return usersAdapter.setAll(users, state);
  }),
  on(usersPageActions.setUsers, (state, { users }) => {
    return usersAdapter.setMany(users, state);
  }),
  on(usersPageActions.clearUsers, state => {
    return usersAdapter.removeAll({ ...state, selectedUserId: null });
  }),

  // API Actions
  on(usersAPIActions.loadUsersSuccess,(state , action) => {
    return usersAdapter.addMany(action.users,{ ...state,isLoading: false,loaded: true, });
  } ),
  on(usersAPIActions.loadUsersFailure,(state, action) => ({
    ...state,
    isLoading: false,
    loaded: false,
    error: action.error,
  }) ),
)

// Create Feature
export const usersFeature = createFeature({
  name: 'users',
  reducer: reducer,
  extraSelectors: ({
    selectSelectedUserId,
    selectUsersState,
    selectEntities,
    }) => ({
      ...usersAdapter.getSelectors(selectUsersState),
      selectIsUserSelected: createSelector(
        selectSelectedUserId,
        (selectedId) => selectedId !== null
      ),
      selectSelectedUser: createSelector(
        selectSelectedUserId,
        selectEntities,
        (selectedId, entities) => selectedId ? entities[selectedId] : null
      ),
      selectById: createSelector(
        selectEntities,
        selectSelectedUserId,
        (userEntities, userId)=> userId && userEntities[userId]
      ),
      selectEntity: (id: string) => createSelector(
        selectEntities,
        entities => entities[id]
      )
    })
  })


export const {name: usersFeatureKey, reducer: usersReducer } = usersFeature;


  // export const selectCurrentBook=createSelector(
  //   selectBookEntities,
  //   selectCurrentBookId,
  //   (bookEntities,bookId)=>bookId && bookEntities[bookId]
  // )


  // export const selectEntity = (id: string) => createSelector(
  //   selectEntities,
  //   entities => entities[id]
  // );

  // export const selectEntitiesByID = ids => createSelector(
  //   selectEntities,
  //   entities => ids.map(id => entities[id])
  // );
