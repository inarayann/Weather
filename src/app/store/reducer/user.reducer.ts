import { createReducer, on } from '@ngrx/store';
import { User } from '../constant/interface';
import { UserActions, UserApiActions } from '../action/user.action';

export interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: any | null;
}

export const initialState: AuthState = {
  currentUser: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const userReducer = createReducer(
  initialState,

  on(UserActions.loginRequest, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UserActions.registerRequest, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UserActions.loadUserProfileRequest, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(UserApiActions.loginSuccess, (state, { user }) => ({
    ...state,
    currentUser: user,
    isAuthenticated: true,
    loading: false,
    error: null,
  })),
  on(UserApiActions.registerSuccess, (state, { user }) => ({
    ...state,
    currentUser: user,
    isAuthenticated: true,
    loading: false,
    error: null,
  })),
  on(UserApiActions.loadUserProfileSuccess, (state, { user }) => ({
    ...state,
    currentUser: user,
    loading: false,
    error: null,
  })),

  on(UserApiActions.loginFailure, (state, { error }) => ({
    ...state,
    currentUser: null,
    isAuthenticated: false,
    loading: false,
    error: error,
  })),
  on(UserApiActions.registerFailure, (state, { error }) => ({
    ...state,
    currentUser: null,
    isAuthenticated: false,
    loading: false,
    error: error,
  })),
  on(UserApiActions.loadUserProfileFailure, (state, { error }) => ({
    ...state,
    currentUser: null,
    loading: false,
    error: error,
  })),
);