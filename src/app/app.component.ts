import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './structure/header/header.component';
import { FooterComponent } from './structure/footer/footer.component';
import { Store } from '@ngrx/store';
import { WeatherService } from './service/weather/weather.service';
import { Observable } from 'rxjs';
import { selectCurrentWeatherData, selectCurrentWeatherError, selectCurrentWeatherLoading } from './store/selector/weather.selector';
import { AppState } from './app.config';
import { CurrentWeatherActions } from './store/action/weather.action';
@Component({
    selector: 'app-root',
    imports: [RouterOutlet, HeaderComponent, FooterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'ngRx-learning';
    weatherData$: Observable<any | null>;
    loading$: Observable<boolean>;
    error$: Observable<any | null>;
    constructor(private store: Store<AppState>) {
        this.weatherData$ = this.store.select(selectCurrentWeatherData);
        this.loading$ = this.store.select(selectCurrentWeatherLoading);
        this.error$ = this.store.select(selectCurrentWeatherError);
    }

    ngOnInit() {
        this.store.dispatch(CurrentWeatherActions.fetchCurrentWeather({ query: 'London' }));
    }
    cityName: string = ''

    searchWeather(): void {
        if (this.cityName.trim()) {
            this.store.dispatch(CurrentWeatherActions.fetchCurrentWeather({ query: this.cityName }));
        }
    }
}

