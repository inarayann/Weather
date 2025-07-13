// src/app/app.config.ts

import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { userReducer } from './store/reducer/user.reducer';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { currentWeatherReducer } from './store/reducer/weather.reducer';
import { CurrentWeatherEffects } from './store/effects/weather.effects';
import { authInterceptor } from './auth.interceptor';


export interface AppState {
  weather: any;
  user: any;
  currentWeather: any;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({
      user: userReducer,
      currentWeather: currentWeatherReducer,
    }),

    provideEffects([
      CurrentWeatherEffects // This now correctly references the imported effect
    ]),

    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
    }),
  ]
};