import { Observable } from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {CurrencyModel} from './currency-model';
import { Http, Request, Response } from '@angular/http';

Injectable();
export class CurrencyService {
    constructor(private _http: Http) { }
    public currencyUrl1 = 'http://api.fixer.io/latest?base=';
    public currencyUrl2 = '&symbols=';

    public convert(model: CurrencyModel): Observable<any> {
        const url = this.currencyUrl1 + model.base + this.currencyUrl2 + model.target;
        return this._http.get(url).map(res => res.json);
    }
}
