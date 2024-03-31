import { inject }                   from '@angular/core';
import { CanActivateFn, Router }    from '@angular/router';
import { AuthService }              from '../services/auth.service';
import { catchError, map, of }      from 'rxjs';

export const AuthGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.authorize().pipe(
        map(_ => true),
        catchError(_ => of(router.parseUrl('/login')))
    );
}