import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

// According:  https://medium.com/@paul.pietzko/internationalization-in-angular-with-ngx-translate-2cabe06c1b29
// Internationalization in Angular with ngx-translate
 
@Injectable({
    providedIn: 'root'
  })

export class TranslationService {
  private translateService = inject(TranslateService);
  private platformId = inject<Object>(PLATFORM_ID);

  defaultLang = 'en';

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem('lng');
      if (savedLang) {
        this.defaultLang = savedLang;
      }
      this.translateService.setDefaultLang(this.defaultLang);
      this.translateService.use(this.defaultLang);
  }
  }

  changeLang(lang: string) {
    this.translateService.use(lang);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lng', lang);
    }
  }
}
