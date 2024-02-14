// An offline mode interceptor can be used to detect
// when the user’s device is offline and handle HTTP requests accordingly,
// such as storing them for later or showing a friendly message.

import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable()
export class OfflineModeInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // Check if the device is offline
    if (!navigator.onLine) {
      // Handle offline mode (e.g., store requests for later)
      console.error('Device is offline. Request not sent:', request.url);
      return throwError(new HttpErrorResponse({ status: 0, statusText: 'Offline' }));
    }

    return next.handle(request);
  }
}
