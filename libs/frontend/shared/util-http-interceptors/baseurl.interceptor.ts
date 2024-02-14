/*
A base URL interceptor can be used to
prepend a base URL to all HTTP requests,
simplifying the configuration of API endpoints.
*/


import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  private baseUrl = 'https://api.example.com';

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const apiRequest = request.clone({
      url: `${this.baseUrl}${request.url}`,
    });
    return next.handle(apiRequest);
  }
}
