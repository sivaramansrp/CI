import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturasAsociadasService {
  private jsonUrl = 'assets/json/120301/facturas-asociadas.json';
  constructor(private httpClient: HttpClient) {}

  getDatos(): Observable<any> {
    return this.httpClient.get<any>(this.jsonUrl);
  }
}