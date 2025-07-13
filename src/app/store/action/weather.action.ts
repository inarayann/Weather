
import { createActionGroup, props } from '@ngrx/store';

export const CurrentWeatherActions = createActionGroup({
  source: 'Current Weather',
  events: {
    // Action to request current weather data
    'Fetch Current Weather': props<{ query: string }>(),
    // Action dispatched on successful data fetch
    'Fetch Current Weather Success': props<{ data: any }>(),
    // Action dispatched on failed data fetch
    'Fetch Current Weather Failure': props<{ error: any }>(),
  },
});
