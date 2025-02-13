import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CapturarFacturasService {

  private jsonUrl = 'assets/json/120301/capturar-facturas.json';
  constructor(private httpClient: HttpClient) {}

  getDatos(): Observable<any> {
    console.log('Fetching data from:', this.jsonUrl);
    return this.httpClient.get<any[]>(this.jsonUrl);
  }
}
