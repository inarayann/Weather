import { ApplicationConfig, importProvidersFrom, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { ActionReducer, MetaReducer, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { userReducer } from './store/reducer/user.reducer';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { currentWeatherReducer } from './store/reducer/weather.reducer';
import { CurrentWeatherEffects } from './store/effects/weather.effects';
import { authInterceptor } from './auth.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { UserEffects } from './store/effects/user.effects';
import { localStorageSync } from 'ngrx-store-localstorage';


export interface AppState {
  weather: any;
  user: any;
  currentWeather: any;
}

function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: [
      {
        auth: ['currentUser', 'isAuthenticated', 'token'] //  'auth' persist
      },
      // {
      //   currentWeather: ['someWeatherPropertyToPersist']
      // }
    ],
    rehydrate: true, // Rehydrate on initial app load
    storage: localStorage, // or sessionStorage
  })(reducer);
}

const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({
      auth: userReducer,
      currentWeather: currentWeatherReducer,
    },{
        metaReducers: metaReducers
      }),
    importProvidersFrom([ReactiveFormsModule]),

    provideEffects([
      CurrentWeatherEffects,
      UserEffects
    ]),

    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
    }),
  ],
};