import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { WeatherApiKey } from './weather-api-key';
import { Http, Request, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class WeatherService {
    constructor(private _http: Http) {}
    totalRequests = 0;
    weatherURL1 = 'http://api.openweathermap.org/data/2.5/weather?q=';
    weatherURL2 = '&appid=' + WeatherApiKey.key;
    public getWeather(city: string): Observable<any> {
        this.totalRequests++;
        console.log('[' + this.totalRequests + '] Service getWeather(' + city + ') invoked');
        return this._http.get(this.weatherURL1 + city + this.weatherURL2)
        .map(res => res.json());
    }
}
