import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { finalize } from "rxjs";
import { LoadingService } from "./loading-indicator.service";
import { SkipLoading } from "./skip-loading-indicator.component";

export const loadingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {

  const loadingService = inject(LoadingService);

  // Check for a custom attribute to avoid showing loading spinner
  if (req.context.get(SkipLoading)) {
    // Pass the request directly to the next handler
    return next(req);
  }

  // Turn on the loading spinner
  loadingService.loadingOn();

  return next(req).pipe(
    finalize(() => {
      // Turn off the loading spinner
      loadingService.loadingOff();
    })
  );

}
