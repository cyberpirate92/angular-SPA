import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {WeatherModel} from './weather-model';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})

export class WeatherComponent {
  constructor(private _service: WeatherService) { }
  public response: any = null;
  public city = 'Mumbai';
  public tempScale = 'kelvin';
  public countryFlagURL: string = null;
  public requestComplete = true;
  public onSubmit(): void {
    const self = this;
    console.log('Request initiated');
    this.requestComplete = false;
    // this._service.getWeather(this.city).subscribe(data => this.response = data);
    this._service.getWeather(this.city).subscribe(function(data) {
      self.response = data;
      self.defaultConversion();
      self.updateCountryFlagURL();
      self.requestComplete = true;
    });
    // clearning input field
    this.city = '';
  }
  public convert(from: string, to: string, value: number): number {
    if (from === to) {
      return value;
    }
    let cFrom: number;
    // converting to celcius
    if (from === 'C' || from === 'celcius' || from === 'c' ) {
      cFrom = value;
    } else if (from === 'F' || from === 'farenheit' || from === 'f' ) {
      cFrom = (value - 32) * (5 / 9);
    } else {
      cFrom = value - 273.15;
    }
    // converting to requested scale from celcius (cFrom)
    if (to === 'C' || to === 'celcius' || to === 'c' ) {
      return Math.ceil(cFrom);
    } else if (to === 'F' || to === 'farenheit' || to === 'f') {
      return Math.ceil((cFrom * 9 / 5) + 32);
    } else {
      return Math.ceil(cFrom + 273.15);
    }
  }
  public defaultConversion(): void {
    // API returns temperature in Kelvin
    // If a different scale is selected, wil be updated
    this.updateTempScale('K');
  }
  public updateCountryFlagURL(): void {
    if (this.response != null && this.response.hasOwnProperty('sys') && this.response.sys.hasOwnProperty('country')) {
      const countryCode: string = this.response.sys.country;
      const URL = 'http://www.geonames.org/flags/x/' + countryCode.toLowerCase() + '.gif';
      this.countryFlagURL = URL;
      return;
    }
    this.countryFlagURL = null;
  }
  public updateTempScale(newScale: string) { // , newScale: string): void {
    const oldScale = this.tempScale;
    console.log('Prev: ' + oldScale);
    console.log('Curr: ' + newScale);
    this.response.main.temp = this.convert(oldScale, newScale, this.response.main.temp);
    this.response.main.temp_min = this.convert(oldScale, newScale, this.response.main.temp_min);
    this.response.main.temp_max = this.convert(oldScale, newScale, this.response.main.temp_max);
  }
}
