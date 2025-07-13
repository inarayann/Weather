export interface CurrentWeatherState {
  data: any | null;       // Holds the fetched current weather data
  loading: boolean;       // Indicates if data is currently being loaded
  error: any | null;      // Holds any error that occurred during fetching
}

export const initialCurrentWeatherState: CurrentWeatherState = {
  data: null,
  loading: false,
  error: null,
};