import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { TaskInterface } from './tasks.models';

  export const tasksAPIActions = createActionGroup({
    source: 'Tasks API',
    events: {
      'Load Tasks Success': props<{ tasks: TaskInterface[]}>(),
      'Load Tasks Failure': props<{ error: string }>(),
    },
  });

  export const tasksPageActions = createActionGroup({
    source: 'Tasks Page',
    events: {
      'Init': emptyProps(),
      load: emptyProps(),
      select: props<TaskInterface>(),
      addTask: props<{ task: TaskInterface }>(),
      selectTask: props<{ taskId: string }>(),
    },
  });
