/*
A CSP interceptor can be used to automatically add Content Security Policy
headers to outgoing HTTP requests to improve security.
*/

import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CspInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const cspHeader = "default-src 'self'; script-src 'self' 'unsafe-inline'";
    const cspRequest = request.clone({
      setHeaders: {
        'Content-Security-Policy': cspHeader,
      },
    });
    return next.handle(cspRequest);
  }
}
