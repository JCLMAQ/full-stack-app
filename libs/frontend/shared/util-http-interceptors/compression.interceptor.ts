/*
A compression interceptor can be used
to automatically request compressed content (e.g., gzip) from the server,
reducing the amount of data transferred over the network.
*/

import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CompressionInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const compressedRequest = request.clone({
      setHeaders: {
        'Accept-Encoding': 'gzip, deflate',
      },
    });
    return next.handle(compressedRequest);
  }
}
