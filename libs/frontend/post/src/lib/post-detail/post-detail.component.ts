
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'full-stack-app-post-detail',
  standalone: true,
  imports: [],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostDetailComponent {}
