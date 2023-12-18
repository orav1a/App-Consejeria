import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_KEY = '8498ea2d256d483609f8570fec0bb9aa';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherService {

  private API_URL = 'https://api.openweathermap.org/data/2.5/weather';
  private API_KEY = '8498ea2d256d483609f8570fec0bb9aa';

  constructor(private httpClient: HttpClient) { }

  getWeatherByCoordinates(lat: number, lon: number): Observable<any> {
    const url = `${this.API_URL}?lat=${lat}&lon=${lon}&appid=${this.API_KEY}`;
    console.log(url);
    return this.httpClient.get(url);
  }

  // Puedes agregar más métodos para obtener datos climáticos por ciudad, etc.
}