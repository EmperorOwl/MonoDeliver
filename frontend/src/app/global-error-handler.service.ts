import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: any): void {
    const router = this.injector.get(Router);
    let errMsg = 'An error has occurred';
    if (error.error) {
      if (error.error.message) {
        errMsg = error.error.message;
      } else {
        errMsg = error.error;
      }
    }
    // REF: https://stackoverflow.com/questions/42503127/error-using-router-navigate-in-custom-error-handler
    this.injector.get(NgZone).run(() => {
      router.navigate(['/400'], {
        state: { error: errMsg },
        skipLocationChange: true,
      });
    });
  }
}
