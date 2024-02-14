import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TodoListComponent } from '../todo-list/todo-list.component';

@Component({
  selector: 'full-stack-app-todo',
  standalone: true,
  imports: [CommonModule, TodoListComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {}
