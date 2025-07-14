// src/app/auth.interceptor.ts

import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, take } from 'rxjs/operators';
import { throwError, of, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './app.config';
import { selectAuthState } from './store/selector/user.selector';
import { AuthState } from './store/reducer/user.reducer';
import { Router } from '@angular/router'; // Import Router for 401 handling
import { UserActions } from './store/action/user.action'; // Import UserActions for logout

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store<AppState>);
  const router = inject(Router);

  // Use switchMap to wait for the token from the store
  // take(1) ensures we only get the current token and complete the observable
  return store.select(selectAuthState).pipe(
    take(1), // Get the current state once
    switchMap((authState: AuthState) => {
      const token = authState.currentUser?.accessToken; 

      const clonedReq = token 
        ? req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}` 
            }
          })
        : req; 

      return next(clonedReq).pipe(
        catchError((error: HttpErrorResponse) => {
         if (error.error instanceof ErrorEvent) {
            console.error('Client/network error:', error.error.message);
          } else {
            switch (error.status) {
              case 0:
                console.error('CORS error / No connection (server down or blocked)');
                break;
              case 401:
                console.warn('Unauthorized – Redirecting to login');
                store.dispatch(UserActions.logout({ redirect: true }));
                break;
              case 403:
                console.warn('Forbidden – no permission');
                break;
              case 500:
                console.error('Internal Server Error');
                break;
              default:
                console.error(`Unhandled HTTP error: ${error.status}`, error.message);
            }
          }

          return throwError(() => error);
        })
      );
    })
  );
};