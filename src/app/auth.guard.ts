import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.verifySession().pipe(
    map(isAuth => isAuth ? true : router.parseUrl('/auth'))
  );
};

export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.verifySession().pipe(
    map(isAuth => isAuth ? router.parseUrl('/dashboard/projects') : true)
  );
};