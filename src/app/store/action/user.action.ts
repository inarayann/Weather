// src/app/store/actions/user.actions.ts

import { createActionGroup, props } from '@ngrx/store';
import { User } from '../constant/interface';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Login Request': props<{ credentials: Pick<User, 'identifier' | 'password'> }>(),
    'Register Request': props<{ user: User }>(),
    'Load User Profile Request': props<{ userId: number }>(),
  },
});

// Actions dispatched by NgRx Effects after interacting with an API
export const UserApiActions = createActionGroup({
  source: 'User API',
  events: {
    'Login Success': props<{ user: User }>(),
    'Login Failure': props<{ error: any }>(),

    'Register Success': props<{ user: User }>(),
    'Register Failure': props<{ error: any }>(),

    'Load User Profile Success': props<{ user: User }>(),
    'Load User Profile Failure': props<{ error: any }>(),

    // If you had a 'User List' concept:
    'Load User List Success': props<{ users: User[] }>(),
    'Load User List Failure': props<{ error: any }>(),
  },
});