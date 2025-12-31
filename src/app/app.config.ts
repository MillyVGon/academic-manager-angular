import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { MatSnackBarConfig } from '@angular/material/snack-bar';

export const SNACK_BAR_CONFIG = {
  success: {
    duration: 3000,
    horizontalPosition: 'end',
    verticalPosition: 'top',
    panelClass: ['snackbar-success'],
  } as MatSnackBarConfig,

  error: {
    duration: 5000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
    panelClass: ['snackbar-error'],
  } as MatSnackBarConfig,
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
  ]
};
