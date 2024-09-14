import { DatePipe } from "@angular/common";
import { Pipe, inject } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Pipe({
  name: 'i18nDate',
})
export class I18nDatePipe extends DatePipe {

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    const translateService = inject(TranslateService);

    super(translateService.currentLang);
  }
}
