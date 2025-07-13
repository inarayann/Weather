// src/app/store/selectors/current-weather.selectors.ts (New file)

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../app.config'; // Assuming AppState is defined in app.config.ts
import { CurrentWeatherState } from '../state/weather.state';

// 1. Create a feature selector to get the 'currentWeather' slice of the state
// The string 'currentWeather' must match the key you use in provideStore (e.g., in app.config.ts)
export const selectCurrentWeatherState = createFeatureSelector<AppState, CurrentWeatherState>('currentWeather');

// 2. Create selectors for specific properties within the currentWeather state
export const selectCurrentWeatherData = createSelector(
  selectCurrentWeatherState,
  (state: CurrentWeatherState) => state.data
);

export const selectCurrentWeatherLoading = createSelector(
  selectCurrentWeatherState,
  (state: CurrentWeatherState) => state.loading
);

export const selectCurrentWeatherError = createSelector(
  selectCurrentWeatherState,
  (state: CurrentWeatherState) => state.error
);