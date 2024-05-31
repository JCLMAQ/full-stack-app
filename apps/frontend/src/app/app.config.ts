import {
  ApplicationConfig, importProvidersFrom,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { appRoutes } from './app.routes';

import {
  HttpClient,
  provideHttpClient,
  withFetch,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { MAT_DATE_LOCALE, MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from './app.component';
import { loggerConfig } from './logger.config';



import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideRouter,
  withComponentInputBinding,
  withDebugTracing,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { LetDirective, PushPipe } from '@ngrx/component';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

// import * as fromUsers from 'user';
import { provideEffects } from '@ngrx/effects';
import { provideMarkdown } from 'ngx-markdown';

// import { reducers } from './reducers';
import { provideLogger } from '@fe/shared/util-logger';
import { loadingInterceptor } from '@fe/utilities';

export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects(),
    provideStore({}),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      appRoutes,
      withComponentInputBinding(),
      withDebugTracing(),
      withEnabledBlockingInitialNavigation(),
    ),
    provideHttpClient(withInterceptorsFromDi()),
    provideHttpClient(
      withFetch(),
      withInterceptors([loadingInterceptor])
    ),
    importProvidersFrom(
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      MatNativeDateModule,
      MatDatepickerModule,
      LetDirective,
      PushPipe,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      }),
    ),
    MatNativeDateModule,
    MatDatepickerModule,
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill' },
    },
    provideAnimations(),
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    provideMarkdown(),
    provideLogger(loggerConfig),
  ],
}





