import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'full-stack-app-feature-auth',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-auth.component.html',
  styleUrl: './feature-auth.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureAuthComponent {}
