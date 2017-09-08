import { CurrencyService } from './currency.service';

export class CurrencyModel {
    public exchangeRate: number;
    public timestamp?: number;
    public base: string;
    public target: string;

    constructor(private _service: CurrencyService, b: string, t: string) {
        this.base = b;
        this.target = t;
        this.timestamp = (+new Date()); // + forces Date to return milliseconds
        this.updateExchangeRate();
    }
    // updates exchange rate from the API
    public updateExchangeRate() {
        this._service.convert(this).subscribe(x => this.exchangeRate = x);
    }
}
