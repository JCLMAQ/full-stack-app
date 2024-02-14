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
import { Injectable } from '@angular/core';
import { LocaleService } from './locale.service';

@Injectable()
export class LocalizationInterceptor implements HttpInterceptor {
  constructor(private localeService: LocaleService) {}

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
