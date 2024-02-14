/*
A headers interceptor can be used to add custom headers
to outgoing HTTP requests. This is often used
to set headers like ‘Content-Type’ or include API keys.
*/

import {
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-Key': 'your-api-key',
    });
    const headersRequest = request.clone({ headers });
    return next.handle(headersRequest);
  }
}
