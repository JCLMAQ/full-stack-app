import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ThemeSwitchService } from './themeswitch.service';

@Component({
    selector: 'my-app-themeswitch',
    templateUrl: './themeswitch.component.html',
    styleUrls: ['./themeswitch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatCheckboxModule,
        FormsModule,
    ],
})
export class ThemeSwitchComponent implements OnInit {
  private themeSwitchService = inject(ThemeSwitchService);


  isDarkTheme!: boolean;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  ngOnInit() {
    this.themeSwitchService.getDarkThemeState().subscribe((value) => {
      this.isDarkTheme = value;
    })
  }

  toggleDarkTheme(checked: boolean) {
    this.themeSwitchService.setDarkThemeState(checked);
  }

}
