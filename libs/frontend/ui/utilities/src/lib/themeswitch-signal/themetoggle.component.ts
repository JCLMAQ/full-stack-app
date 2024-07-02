import { Component, inject } from "@angular/core";
import { ThemeSwitchSignalService } from "./themeswitch-signal.services";

/*
Based on: https://medium.com/@davdifr/theme-switcher-in-angular-from-dark-to-light-and-back-again-f42fc3f9fab0

How They Work Together
The synergy between ThemeService and ThemeToggleComponent is what makes the theme switching smooth and effective:
User Action: When a user clicks the theme toggle checkbox, ThemeToggleComponent calls toggleTheme from ThemeService.
State Update: ThemeService updates the themeSignal, which triggers a change in the theme.
Dynamic CSS Update: ThemeService then changes the href of the stylesheet link, loading the appropriate theme CSS.
Persistence: The new theme preference is stored in local storage for future sessions.
*/

@Component({
  selector: "app-theme-toggle",
  standalone: true,
  imports: [],
  template: `
    <input
      id="theme-toggle"
      type="checkbox"
      [checked]="isDarkThemeActive()"
      (change)="switchTheme()"
      [attr.aria-label]="getThemeToggleLabel()"
    />
  `,
})
export class ThemeToggleComponent {
  #theme: ThemeSwitchSignalService = inject(ThemeSwitchSignalService);

  switchTheme(): void {
    this.#theme.toggleTheme();
  }

  isDarkThemeActive(): boolean {
    return this.#theme.isDarkThemeActive();
  }

  getThemeToggleLabel(): string {
    return this.#theme.getToggleLabel();
  }
}
