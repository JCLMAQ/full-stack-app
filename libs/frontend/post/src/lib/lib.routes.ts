import { Route } from '@angular/router';
import { PostComponent } from './Post/Post.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostStore } from './store/post.state';

export const postRoutes: Route[] = [
  { path: 'postdetail/:id/:mode', component: PostDetailComponent },
  { path: '',
    component: PostComponent,
    providers: [
      PostStore
    ],
  }
];
