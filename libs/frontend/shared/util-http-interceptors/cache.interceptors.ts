/*
A caching interceptor can be used to implement client-side caching
for HTTP responses,
reducing the number of unnecessary network requests.
*/

import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private cache = new Map<string, HttpResponse<any>>();

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    if (request.method !== 'GET') {
      return next.handle(request);
    }

    const cachedResponse = this.cache.get(request.url);

    if (cachedResponse) {
      return of(cachedResponse);
    }

    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this.cache.set(request.url, event);
        }
      })
    );
  }
}
