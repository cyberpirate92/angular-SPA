import { Component, OnChanges, OnInit, SimpleChange, SimpleChanges, Input } from '@angular/core';
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
  @Input()
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
    console.log('From: ' + from + ' To: ' + to);
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
      return parseFloat(cFrom.toFixed(2));
    } else if (to === 'F' || to === 'farenheit' || to === 'f') {
      return parseFloat(((cFrom * 9 / 5) + 32).toFixed(2));
    } else {
      return parseFloat((cFrom + 273.15).toFixed(2));
    }
  }
  public defaultConversion(): void {
    // API returns temperature in Kelvin
    // If a different scale is selected, wil be updated
    this.updateTemp('kelvin', this.tempScale);
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
  public updateTempScale(newScale: string) { // newScale - $event containing the new selection
    console.log('Updating scales - event');
    this.updateTemp(this.tempScale, newScale);
    this.tempScale = newScale;
  }
  public updateTemp(oldScale: string, newScale: string) {  // newScale - Which scale to convert to
    console.log('Prev: ' + oldScale);
    console.log('Curr: ' + newScale);
    this.response.main.temp = this.convert(oldScale, newScale, this.response.main.temp);
    this.response.main.temp_min = this.convert(oldScale, newScale, this.response.main.temp_min);
    this.response.main.temp_max = this.convert(oldScale, newScale, this.response.main.temp_max);
  }
}
