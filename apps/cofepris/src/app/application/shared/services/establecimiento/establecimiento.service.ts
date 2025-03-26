import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Catalogo } from '@libs/shared/data-access-user/src';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstablecimientoService {

  constructor(private http: HttpClient) {
    //constructor
   }
  getEstadoData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/260401/establecimiento.json');
  }
  getSciandata(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/260401/scianda.json');
  }
  getRegimenData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/260401/regimen.json');
  }
  getAduanaDeSalidaData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/260401/aduanaDeSalida.json');
  }
}
