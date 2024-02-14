/*
A timeout interceptor can be used to set
a maximum timeout for HTTP requests. It can be useful to prevent long-running
requests from blocking your application.
*/


import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const timeoutDuration = 10000; // 10 seconds
    return next.handle(request).pipe(
      timeout(timeoutDuration),
      catchError((error) => {
        if (error.name === 'TimeoutError') {
          // Handle timeout error here
          console.error('Request timed out:', request.url);
          return throwError('Request timed out');
        }
        return throwError(error);
      })
    );
  }
}
