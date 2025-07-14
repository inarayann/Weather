import { createActionGroup, props } from '@ngrx/store';
import { User } from '../constant/interface';
export type RegisterPayload = Pick<User, 'identifier' | 'email' | 'password'>;

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Login Request': props<{ credentials: Pick<User, 'identifier' | 'password'> }>(),
    'Register Request': props<{ registerData: RegisterPayload }>(),
    'Load User Profile Request': props<{ userId: number }>(),
    'Logout': props<{ redirect?: boolean }>(),
    'Refresh Token':props<{token:any}>()
  },
});

// Actions dispatched by NgRx Effects after interacting with an API
export const UserApiActions = createActionGroup({
  source: 'User API',
  events: {
    'Login Success': props<{ user: User }>(),
    'Login Failure': props<{ error: any }>(),

    // FIX: registerSuccess should return a User object
    'Register Success': props<{ user: User }>(),
    'Register Failure': props<{ error: any }>(),

    'Load User Profile Success': props<{ user: User }>(),
    'Load User Profile Failure': props<{ error: any }>(),
'Refresh Token Sucess':props<{token:string,message:any}>(),
'Refresh Token Error':props<{error:any}>(),
    // 'Logout Success': props<{}>(),
    'Logout Failure': props<{ error: any }>(),

    // If you had a 'User List' concept:
    'Load User List Success': props<{ users: User[] }>(),
    'Load User List Failure': props<{ error: any }>(),
  },
});