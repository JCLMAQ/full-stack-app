import { CommonModule } from '@angular/common';
import { Component, inject, resource } from '@angular/core';
import { Task } from '@prisma/client';
import { TasksService } from '../services/tasks.service';


@Component({
  selector: 'full-stack-app-task',
  standalone: true,
  imports: [
    CommonModule,


  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  // private readonly http = inject(HttpClient);
  private readonly tasksService = inject(TasksService);

  private baseUrl = 'api/';


tasks = resource<Task[], string>({
  loader: () => {
 return this.tasksService.getAllTasks();
},
  });
}
