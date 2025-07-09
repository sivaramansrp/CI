import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EconomicoService {

  constructor(private http: HttpClient) { }

  obtenerSectorProductivo(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/32606/sector-productivo.json');
  }

  obtenerServicio(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/32606/servicio.json');
  }

  obtenerBimestre(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/32606/bimestre.json');
  }

  obtenerDomicillio(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/32606/domicillio.json');
  }
}
