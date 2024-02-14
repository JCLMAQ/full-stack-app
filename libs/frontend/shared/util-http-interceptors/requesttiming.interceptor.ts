/*
A request timing interceptor can be used to measure and log the
time taken for each HTTP request,
helping you identify performance bottlenecks.
*/

import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable()
export class RequestTimingInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const startTime = Date.now();
    return next.handle(request).pipe(
      tap(() => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        console.log(`Request to ${request.url} took ${duration}ms`);
      })
    );
  }
}
