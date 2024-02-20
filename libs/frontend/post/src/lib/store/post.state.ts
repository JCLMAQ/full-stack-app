import { withDevtools } from "@angular-architects/ngrx-toolkit";
import { SelectionModel } from "@angular/cdk/collections";
import { withLogger, withUndoRedo } from "@fe/shared/util-signal-store";
import { signalStore, withHooks, withState } from "@ngrx/signals";
import { PostInterface } from "./post.interface";
import { withPostsMethods } from "./post.methods";

export interface PostStateInterface {
  items: PostInterface[],
  filter: {
    ownerId: string | null
    orgId: string | null,
  },
  selectedId: string | null,
  selectedIds: string [],
  selection: SelectionModel<PostInterface>
}

export const initialPostState: PostStateInterface = {
  items: [],
  filter: {
    ownerId: "b64d3148-b2b2-4d7d-8c3e-cde4673f9665",
    orgId: "f52e6086-5d1b-4c2b-a6a1-86513c30ac34"
  },
  selectedId: null,
  selectedIds: [],
  selection: new SelectionModel<PostInterface>(true, [])
};

// export type SelectedEntityState = { selectedEntityId: EntityId | null };

export const PostStore = signalStore(
  // { providedIn: 'root' },
  withLogger('post'),
  withState(initialPostState),
  withDevtools('post'),
  withPostsMethods(),
  // withDataService({
  //   dataServiceType: PostService,
  //   filter: { },
  //   collection: 'post'
  // }),
  withUndoRedo({
    collections: ['post'],
  }),

  withHooks({
    onInit:
    (store) =>
      store.load(),
      // effect(() => {
      //   console.log('postEntityMap', store.postEntityMap())
      //   console.log('postIds', store.postIds())
      //   console.log('postEntities', store.postEntities())
      // });
    onDestroy() {
      console.log('on destroy post store');
    },

  }),

);
