import { CurrencyModel } from './currency-model';
import { Component, OnInit } from '@angular/core';

import { CurrencyService } from './currency.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent {
  constructor(private _service: CurrencyService) {
    this.model = new CurrencyModel(_service, 'INR', 'USD');
  }
  public model: CurrencyModel = null;
  public amount = 0;
  public getExchange(): void {
    this.model.updateExchangeRate();
  }
}
