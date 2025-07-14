import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducer/user.reducer'; // Import AuthState from the reducer file
export const selectAuthState = createFeatureSelector<AuthState>('auth'); // AppState is not directly needed here
// 2. Create selectors for specific properties within the auth state
export const selectCurrentUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.currentUser
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);

export const selectAuthLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.loading
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);
export const selectAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.currentUser?.accessToken
);

export const selectUserLoading = selectAuthLoading;
export const selectUserError = selectAuthError;