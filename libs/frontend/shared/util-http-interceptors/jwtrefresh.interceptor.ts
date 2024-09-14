/*
A JWT refresh token interceptor can be used to automatically
refresh expired JSON Web Tokens (JWTs)
and seamlessly continue making authenticated requests.
*/

import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class JwtRefreshInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && error.error && error.error.message === 'Token expired') {
          // Token expired; attempt to refresh it
          return this.authService.refreshToken().pipe(
            switchMap(() => {
              // Retry the original request with the new token
              const updatedRequest = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${this.authService.getAccessToken()}`,
                },
              });
              return next.handle(updatedRequest);
            }),
            catchError(() => {
              // Refresh token failed; log out the user or handle the error
              // For example, you can redirect to the login page
              this.authService.logout();
              return throwError('Token refresh failed');
            })
          );
        }
        return throwError(error);
      })
    );
  }
}
