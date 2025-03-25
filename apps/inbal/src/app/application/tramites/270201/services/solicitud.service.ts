import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Catalogo } from '@libs/shared/data-access-user/src';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  constructor(private http: HttpClient) { }

  getOperacionData(): Observable<Catalogo[]>{
    return this.http.get<Catalogo[]>('assets/json/270201/operacion.json')
  }

  getMovimientoData(): Observable<Catalogo[]>{
    return this.http.get<Catalogo[]>('assets/json/270201/movimiento.json')
  }

  getPaisData(): Observable<Catalogo[]>{
    return this.http.get<Catalogo[]>('assets/json/270201/pais.json')
  }

  getTransporteData(): Observable<Catalogo[]>{
    return this.http.get<Catalogo[]>('assets/json/270201/transporte.json')
  }

  getAduanaData(): Observable<Catalogo[]>{
    return this.http.get<Catalogo[]>('assets/json/270201/aduana.json')
  }

  getMotivoData(): Observable<Catalogo[]>{
    return this.http.get<Catalogo[]>('assets/json/270201/motivo.json')
  }

  getMonedaData(): Observable<Catalogo[]>{
    return this.http.get<Catalogo[]>('assets/json/270201/moneda.json')
  }

  getArancelariaData(): Observable<Catalogo[]>{
    return this.http.get<Catalogo[]>('assets/json/270201/arancelaria.json')
  }
}
