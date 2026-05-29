import { APP_INITIALIZER, ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { credentialsInterceptor } from './credentials.interceptor';
import { AuthService } from './core/services/auth.service';
import { firstValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
function initAuth(authService: AuthService) {
  return () => firstValueFrom(authService.verifySession());
}


export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
        {
      provide: APP_INITIALIZER,
      useFactory: (authService: AuthService) => initAuth(authService),
      deps: [AuthService],
      multi: true,
    },
    provideHttpClient(withFetch(), withInterceptors([credentialsInterceptor])),
  ]
};
