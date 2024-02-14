/*
A logging interceptor can be used to log the details of HTTP
requests and responses,
which is helpful for debugging and monitoring.
*/

import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          console.log('HTTP Response:', event);
        }
      })
    );
  }
}
