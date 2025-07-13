import { createReducer, on } from '@ngrx/store';
import { initialCurrentWeatherState } from '../state/weather.state';
import { CurrentWeatherActions } from '../action/weather.action';
export const currentWeatherReducer = createReducer(
  initialCurrentWeatherState,

on(CurrentWeatherActions.fetchCurrentWeatherSuccess, (state, { data }) => {
    console.log('Data received by reducer:', data);
    return {
        ...state,
        data: data,
        loading: false,
        error: null,
    };
}),
  // When 'Fetch Current Weather Failure' action is dispatched
  on(CurrentWeatherActions.fetchCurrentWeatherFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
    data: null,
  })),
);