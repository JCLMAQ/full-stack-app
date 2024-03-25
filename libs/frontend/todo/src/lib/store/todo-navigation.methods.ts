import { patchState, signalStoreFeature, type, withMethods, withState } from "@ngrx/signals";
import { TodoStateInterface } from "./todo.state";

export function withNavigationMethods() {
  return signalStoreFeature(
    { state: type<TodoStateInterface>() },
    withState(
      {
        currentPosition: 0,
        lastPosition: 0,
        navigation: {
          hasNext: false,
          hasPrevious: false,
          isFirst: true,
          isLast: true
        }
      }
    ),
    withMethods(
      (store) => ({
        initNavButton(initialTodoId: string) {
          let currentPosition = 0;
          let lastPosition = 0;
          if(store.selection().selected.length <= 1 ) { // no selected items
            currentPosition = store.items().findIndex(p => p.id === initialTodoId);
            if ( currentPosition === -1) {
              currentPosition = 0;
            }
            lastPosition = store.items().length - 1;
            if ( lastPosition < 0 || lastPosition < currentPosition ) {
              lastPosition = 0;
            }
          } else {
            currentPosition = store.selection().selected.findIndex(p => p.id === initialTodoId);
            lastPosition = store.selection().selected.length - 1;
          }
          if(lastPosition < 0 ) { lastPosition = 0; }
          if(lastPosition < currentPosition ) { lastPosition = currentPosition; }
          this.navStateMgt(currentPosition, lastPosition);
          patchState(store, {
            selectedId: initialTodoId
          });

        },

        navStateMgt( currentPosition: number, lastPosition: number) {
          if(lastPosition < 0 ) { lastPosition = 0; }
          if(currentPosition > lastPosition ) { currentPosition = lastPosition }
          if(currentPosition < 0 ) { currentPosition = 0}

          let hasNext = false;
          let hasPrevious = false;
          let isFirst = true;
          let isLast = true;

          if (currentPosition === 0 && lastPosition === 0) {
            hasNext = false;
            hasPrevious = false;
            isFirst = true;
            isLast = true;
          } else {
            if (currentPosition === 0) {
              hasNext = true;
              hasPrevious = false;
              isFirst = true;
              isLast = false;
            } else
              if (currentPosition === lastPosition) {
                hasNext = false;
                hasPrevious = true;
                isFirst = false;
                isLast = true;
              } else {
                hasNext = true;
                hasPrevious = true;
                isFirst = false;
                isLast = false;
              }
          }
          patchState(store, {
            currentPosition: currentPosition,
            lastPosition: lastPosition,
            navigation: {
              hasNext: hasNext,
              hasPrevious:  hasPrevious,
              isFirst: isFirst,
              isLast: isLast
            }
          });
        },

        next() {
          let currentPosition = store.currentPosition() + 1
          const lastPosition = store.lastPosition()
          if (currentPosition > lastPosition) {
            currentPosition = lastPosition
          }
          this.navStateMgt( currentPosition, lastPosition );
        },

        last() {
          const currentPosition = store.lastPosition()
          const lastPosition = store.lastPosition()
          this.navStateMgt( currentPosition, lastPosition );
        },

        first() {
          const currentPosition = 0;
          const lastPosition = store.lastPosition();
          this.navStateMgt( currentPosition, lastPosition );
        },

        previous() {
          let currentPosition = store.currentPosition() - 1
          const lastPosition = store.lastPosition();
          if (currentPosition < 0) {
            currentPosition= 0
          }
          this.navStateMgt( currentPosition, lastPosition );
        },
      })
    )
  )}
