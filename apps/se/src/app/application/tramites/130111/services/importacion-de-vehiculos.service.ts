import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImportacionDeVehiculosService {

  constructor(private http: HttpClient) { }
  
  getPartidasdelaTable(): Observable<unknown> {
    return this.http.get('assets/json/130111/partidas-de-la.json');
  }
}
