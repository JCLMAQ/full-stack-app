import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'full-stack-app-data-access',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-access.component.html',
  styleUrl: './data-access.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataAccessComponent {}
