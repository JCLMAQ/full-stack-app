/*
 A localization interceptor can be used to automatically include
 the user’s preferred language or locale in HTTP requests, ensuring
 that the server sends responses in the appropriate language.
*/

import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LocaleService } from './locale.service';

@Injectable()
export class LocalizationInterceptor implements HttpInterceptor {
  private localeService = inject(LocaleService);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const userLocale = this.localeService.getUserLocale();
    const localizedRequest = request.clone({
      setHeaders: {
        'Accept-Language': userLocale,
      },
    });
    return next.handle(localizedRequest);
  }
}
