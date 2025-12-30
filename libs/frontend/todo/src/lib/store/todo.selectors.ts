import { withListSelectors } from '@fe/shared/util-signal-store';
import { signalStoreFeature, type } from '@ngrx/signals';
import { TodoInterface } from './todo.model';
import { TodoStateInterface } from './todo.state';

export function withTodosSelectors() {
  return signalStoreFeature(
    { state: type<TodoStateInterface>() },
    withListSelectors<TodoInterface>({
      selectId: (x) => x.id,
      isDone: (x) => x.todoState === 'DONE',
    })
  );
}
