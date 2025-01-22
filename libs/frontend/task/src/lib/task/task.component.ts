import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, resource } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
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
  private readonly http = inject(HttpClient);

  private baseUrl = 'api/';


tasks = resource<Task[], string>({
 loader: async () => {
  const response = await fetch(`${this.baseUrl}/alltasks`, {
    method: 'get',
    headers: {
      "Content-Type": "application/json",
  }});

  if (!response.ok) throw new Error("Unable to load tasks!");
  const tasks = await response.json();
  return tasks;
},
 });
}
