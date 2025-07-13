import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
 
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NmVhOTk2NTY3MzA0ODQyMTk2OTc0ZiIsImVtYWlsIjoibmFyYXlhbnNpbmdoMzk5OEBnbWFpbC5jb20iLCJsb2NhdGlvbiI6eyJsYXQiOjMwLjczMzMsImxuZyI6NzYuNzc5NCwiX2lkIjoiNjg2ZWE5OTY1NjczMDQ4NDIxOTY5NzUwIn0sInVzZXJuYW1lIjoiaS5uYXJheWFuIiwiaWF0IjoxNzUyMzkzMTU4LCJleHAiOjE3NTQ5ODUxNTh9.FP-v6vpcJ2aHKdcY2mtoMVoFxZ6wTWCLgv0d50O-TSM'; // can get token from 3rd party, or from localstorage etc.

  const clonedReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    : req;

  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Client-side or network error
      if (error.error instanceof ErrorEvent) {
        console.error('Client/network error:', error.error.message);
      } else {
        // Server-side error
        switch (error.status) {
          case 0:
            console.error('CORS error / No connection (server down or blocked)');
            break;
          case 401:
            console.warn('Unauthorized – maybe redirect to login');
            // authService.logout();
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

      // Optionally rethrow or handle gracefully
      return throwError(() => error);
    })
  );
};
