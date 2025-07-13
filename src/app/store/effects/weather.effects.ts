import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { WeatherService } from '../../service/weather/weather.service';
import { CurrentWeatherActions } from '../action/weather.action';

@Injectable()
export class CurrentWeatherEffects {
    private weatherService = inject(WeatherService);
 private actions$ = inject(Actions);
 

  fetchCurrentWeather$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CurrentWeatherActions.fetchCurrentWeather),
      tap(action => console.log('Effect: Action dispatched:', action)),
      tap(() => {
        console.log('Effect: Before mergeMap, this.weatherService is:', this.weatherService);
        if (!this.weatherService) {
          console.error('CRITICAL: weatherService is UNDEFINED just before HTTP call!');
        }
      }),
      mergeMap((action) => {
        console.log('Effect: Inside mergeMap, this.weatherService is:', this.weatherService);
        return this.weatherService.getCurrent(action.query).pipe(
          map((response: any) => {
            const weatherData = response.weatherAppData;
            console.log(weatherData, 'weather data is called here');
            return CurrentWeatherActions.fetchCurrentWeatherSuccess({ data: weatherData });
          }),
          catchError((error) => {
            console.error('Effect: Error in WeatherService getCurrent call:', error);
            return of(CurrentWeatherActions.fetchCurrentWeatherFailure({ error }));
          })
        );
      })
    )
  );
}