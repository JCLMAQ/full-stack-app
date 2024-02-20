import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { tasksAPIActions, tasksPageActions } from "./tasks.actions";
import { TaskInterface } from './tasks.models';

// export const TASKS_FEATURE_KEY = 'tasks';

export interface TasksStateInterface extends EntityState<TaskInterface> {
  isLoading: boolean;
  loaded: boolean; // has the Tasks list been loaded
  error: string | null; // last known error (if any)
  selectedTaskId: string | null | undefined; // which Tasks record has been selected
}

export const tasksAdapter: EntityAdapter<TaskInterface> = createEntityAdapter<TaskInterface>();

export const initialTasksState: TasksStateInterface = tasksAdapter.getInitialState(
  {
    isLoading: false,
    error: null,
    loaded: false,
    selectedTaskId: null,
  }
)

const reducer = createReducer(
  initialTasksState,
  // Page Actions
  on(tasksPageActions.load,(state) => ({
    ...state,
    isLoading: true,
    loaded: false,
    error: null,
  }) ),
  on(tasksPageActions.init, (state) => ({
    ...state,
    isLoading: false,
    loaded: false,
    error: null,
  })),
  on(tasksPageActions.select, (state, action) => ({
    ...state,
    selectedTaskId: action.id,
  })),
  on(tasksPageActions.addTask, (state, { task }) =>
  tasksAdapter.addOne(task, state)
  ),
  // API Actions
  on(tasksAPIActions.loadTasksSuccess,(state , action) => {
    return tasksAdapter.addMany(action.tasks,{ ...state,isLoading: false,loaded: true, });
  } ),
  on(tasksAPIActions.loadTasksFailure,(state, action) => ({
    ...state,
    isLoading: false,
    loaded: false,
    error: action.error,
  }) ),
);

// Create Feature
export const tasksFeature = createFeature({
  name: 'tasksFeature',
  reducer: reducer,
  extraSelectors: ({
    selectSelectedTaskId,
    selectTasksFeatureState,
    selectEntities
  }) => ({
    ...tasksAdapter.getSelectors(selectTasksFeatureState),
    selectIsTaskSelected: createSelector(
      selectSelectedTaskId,
      (selectedId) => selectedId !== null
    ),
    selectSelectedTask: createSelector(
      selectSelectedTaskId,
      selectEntities,
      (selectedId, entities) => selectedId ? entities[selectedId] : null
    )
  })
  })

