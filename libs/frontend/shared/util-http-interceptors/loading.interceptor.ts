/*
A loading indicator interceptor can be used to
show and hide loading spinners or progress bars during HTTP requests,
providing a better user experience.
*/

import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoadingService } from './loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private loadingService = inject(LoadingService);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    this.loadingService.showLoading();
    return next.handle(request).pipe(
      finalize(() => {
        this.loadingService.hideLoading();
      })
    );
  }
}
