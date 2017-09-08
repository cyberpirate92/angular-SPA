import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule, Request, Response } from '@angular/http';

import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { CurrencyComponent } from './currency/currency.component';
import { WeatherService } from './weather/weather.service';
import { CurrencyService } from './currency/currency.service';

const appRoutes: Routes = [
  {path: 'weather', component: WeatherComponent},
  {path: 'currency', component: CurrencyComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    CurrencyComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: true}),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [WeatherService, CurrencyService],
  bootstrap: [AppComponent]
})
export class AppModule {}
