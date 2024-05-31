import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MATERIAL } from '@fe/material';
import { ThemingService } from '@fe/utilities';

// Base on: Easy, Dynamic Angular Material Theming with just 6 colors! : https://www.youtube.com/watch?v=h6-BhzFD1CM
// and https://www.youtube.com/watch?v=DpCwKpZlcbg&t=499s

@Component({
  selector: 'lib-theme-selector',
  standalone: true,
  imports: [
    CommonModule,
    MATERIAL,
    FormsModule
  ],

  templateUrl: './theme-selector.component.html',
  styleUrl: './theme-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSelectorComponent {
  theming = inject(ThemingService);
}
