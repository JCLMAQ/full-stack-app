/*
To use interceptors in your Angular application, you need to
provide them in your app’s root module.
Here’s an example of how to do this:
from :  https://blog.stackademic.com/angular-interceptors-unleashed-solving-complex-scenarios-with-ease-b1108fb1846e

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth.interceptor';
import { ErrorInterceptor } from './error.interceptor';
import { LoggingInterceptor } from './logging.interceptor';
import { HeadersInterceptor } from './headers.interceptor';
import { LoadingInterceptor } from './loading.interceptor';
import { TimeoutInterceptor } from './timeout.interceptor';
import { BaseUrlInterceptor } from './base-url.interceptor';
import { RetryInterceptor } from './retry.interceptor';
import { OfflineModeInterceptor } from './offline-mode.interceptor';
import { JwtRefreshInterceptor } from './jwt-refresh.interceptor';
import { RequestTimingInterceptor } from './request-timing.interceptor';
import { LocalizationInterceptor } from './localization.interceptor';
import { CspInterceptor } from './csp.interceptor';
import { CompressionInterceptor } from './compression.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RetryInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: OfflineModeInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtRefreshInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RequestTimingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LocalizationInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CspInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CompressionInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}


In this example, we’ve provided multiple interceptors using the HTTP_INTERCEPTORS token,
and Angular will apply them in the order they are provided.
*/
