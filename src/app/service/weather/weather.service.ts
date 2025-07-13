// src/app/service/weather/weather.service.ts

import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ErrorService } from '../Error/error.service';
import { HttpClient } from '@angular/common/http';

const API_BASE_URL = environment.BACKEND_URL;

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  _currentWeather: string = 'weather/current';

  constructor(
    private http: HttpClient,
    private error: ErrorService
  ) {
    // ADD THESE CONSOLE LOGS
    console.log('WeatherService: Constructor called.');
    console.log('WeatherService: HttpClient injected:', !!this.http); // Check if http is defined
    console.log('WeatherService: ErrorService injected:', !!this.error); // Check if error is defined
  }

  getCurrent(name:string=''): Observable<any[]> {
    console.log('Attempting to fetch current weather via WeatherService');
    return this.http.get<any[]>(`${API_BASE_URL}${this._currentWeather}?q=${name}`).pipe(catchError(this.error.handleError));
  }
}