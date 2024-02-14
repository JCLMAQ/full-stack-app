import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TodoComponent } from '@fe/todo';

@Component({
  standalone: true,
  imports: [ RouterModule, TodoComponent],
  selector: 'full-stack-app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';
}
