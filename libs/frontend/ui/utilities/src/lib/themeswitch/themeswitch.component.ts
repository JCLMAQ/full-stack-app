import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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

  isDarkTheme!: boolean;

  constructor(
    private themeSwitchService: ThemeSwitchService
  ) {}

  ngOnInit() {
    this.themeSwitchService.getDarkThemeState().subscribe((value) => {
      this.isDarkTheme = value;
    })
  }

  toggleDarkTheme(checked: boolean) {
    this.themeSwitchService.setDarkThemeState(checked);
  }

}
