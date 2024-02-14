import { DatePipe } from "@angular/common";
import { Pipe } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Pipe({
  name: 'i18nDate',
})
export class I18nDatePipe extends DatePipe {
  constructor(translateService: TranslateService) {
    super(translateService.currentLang);
  }
}
