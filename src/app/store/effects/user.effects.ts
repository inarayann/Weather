import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { UserActions, UserApiActions, RegisterPayload } from '../action/user.action';
import { AuthService } from '../../service/user.service';

@Injectable()
export class UserEffects { 
  private authService = inject(AuthService);
  private actions$ = inject(Actions);

  registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.registerRequest),
      tap(action => console.log('Effect: Register Request Action:', action)),
      mergeMap((action) => {
        return this.authService.register(action.registerData).pipe(
          map((response: any) => {
            const registeredUser = response.user;
            console.log('User registered successfully:', registeredUser);
            return UserApiActions.registerSuccess({ user: registeredUser });
          }),
          catchError((error) => {
            console.error('Effect: Error during user registration:', error);
            return of(UserApiActions.registerFailure({ error }));
          })
        );
      })
    )
  );

loginUser$ = createEffect(() =>
  this.actions$.pipe(
    ofType(UserActions.loginRequest),
          tap(action => console.log('Effect: Login Request Action:', action)),

    mergeMap(action =>
      this.authService.login(action).pipe(
        map((user:any) => {
          console.log('User logged in:', user); 
          return UserApiActions.loginSuccess({user});
        }),
        catchError(error => of(UserApiActions.loginFailure({ error })))
      )
    )
  )
);

refreshToken$ = createEffect(() =>
  this.actions$.pipe(
    ofType(UserActions.refreshToken),
    mergeMap(action =>
      this.authService.refreshToken(action.token).pipe(
        map((user:any) => {
          console.log('Token Refreshed:', user);
          return UserApiActions.refreshTokenSucess({ message:user.message, token:user.token });
        }),
        catchError(error => of(UserApiActions.refreshTokenError({ error })))
      )
    )
  )
);


  loadUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUserProfileRequest),
      mergeMap((action) =>
        this.authService.getUserProfile(action.userId).pipe(
          map(user => UserApiActions.loadUserProfileSuccess({ user })),
          catchError(error => of(UserApiActions.loadUserProfileFailure({ error })))
        )
      )
  ));

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.logout),
      tap(() => this.authService.logout()), 
      catchError(error => of(UserApiActions.logoutFailure({ error })))
    )
  );
}