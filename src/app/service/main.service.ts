import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Candle, News, Quote } from './service.model';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  baseUrl: string = `${environment.baseApi}`;
  token: string = environment.apiKey;

  constructor(private http: HttpClient) { }

  getNews(): Observable<News[]> {
    return this.http.get<News[]>(`${this.baseUrl}news?category=general&token=${this.token}`);
  }
  getQuotes():Observable<Quote> {
    return this.http.get<Quote>(`${this.baseUrl}quote?symbol=AAPL&token=${this.token}`)
  }
  getCandles(filterValue: string):Observable<Candle> {
    //Set date Boundaries
    let startDate = Math.ceil(Date.now()/1000);
    let endDate = Math.ceil(Date.now()/1000)-7.884e+6; // Default of three months back
    return this.http.get<Candle>(`${this.baseUrl}stock/candle?symbol=AAPL&resolution=${filterValue}&from=${endDate}&to=${startDate}&token=${this.token}`)
  }
}
