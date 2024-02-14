/*
An authentication interceptor is used to add authentication tokens
to outgoing requests and handle authentication-related errors.
This is essential for securing your application’s API requests.
*/

import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const authToken = 'your-auth-token';
    const authRequest = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${authToken}`),
    });
    return next.handle(authRequest);
  }
}
