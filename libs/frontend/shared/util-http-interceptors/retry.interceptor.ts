// Retry interceptor can be used to automatically retry
//failed HTTP requests, which can be helpful in handling intermittent network
//issues.

import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';

@Injectable()
export class RetryInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // Define the maximum number of retries
    const maxRetries = 3;
    return next.handle(request).pipe(retry(maxRetries));
  }
}
