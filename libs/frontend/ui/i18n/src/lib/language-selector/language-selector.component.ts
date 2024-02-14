import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { I18nService } from '../i18n.service';


@Component({
    selector: 'my-app-language-selector',
    templateUrl: './language-selector.component.html',
    styleUrls: ['./language-selector.component.scss'],
    standalone: true,
    imports: [
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
    ],
})
export class LanguageSelectorComponent implements OnInit {
  @Input() icon = false;

  constructor(private i18nService: I18nService) {}

  ngOnInit() {}

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }
}
