import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MATERIAL } from '@fe/material';
import { TodoStore } from '../store/todo.state';
import { TodoDetailComponent } from '../todo-detail/todo-detail.component';
import { TodoListComponent } from '../todo-list/todo-list.component';

@Component({
  selector: 'full-stack-app-todo',
  standalone: true,
  imports: [
    CommonModule,
    ...MATERIAL,
    TodoListComponent,
    TodoDetailComponent,
  ],
  templateUrl: './todo.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  styleUrl: './todo.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // providers: [TodoStore],
})

export class TodoComponent  {

orgId = "b64d3148-b2b2-4d7d-8c3e-cde4673f9665"
ownerId = "7c672043-24e4-45a9-909c-693ba5044785"

  readonly todoStore = inject(TodoStore);
  readonly router = inject(Router)

}
