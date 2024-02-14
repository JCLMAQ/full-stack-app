import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'full-stack-app-todo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent {}
