/*
An error handling interceptor can be used to centralize error
handling for HTTP requests. It can capture HTTP errors, log them,
and perform appropriate actions like displaying error messages.
*/

import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle and log the error here
        console.error('HTTP Error:', error);
        // Optionally rethrow the error to propagate it
        return throwError(error);
      })
    );
  }
}
