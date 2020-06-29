import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: WeatherForecast[];

  // constructor(http: HttpClient) {
  //   http.get<WeatherForecast[]>('http://localhost:5001/' + 'api/SampleData/WeatherForecasts').subscribe(result => {
  //     this.forecasts = result;
  //   }, error => console.error(error));
  // }
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<WeatherForecast[]>(baseUrl + 'weatherforecast').subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));
  }
}

interface WeatherForecast {
  Date: string;
  TemperatureC: number;
  TemperatureF: number;
  Summary: string;
}
