import { CommonModule } from '@angular/common';
import { Component, inject, resource } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TasksService } from '@be/tasks';
import { MATERIAL } from '@fe/material';
import { Task } from '@prisma/client';

@Component({
  selector: 'full-stack-app-task',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    ...MATERIAL
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
