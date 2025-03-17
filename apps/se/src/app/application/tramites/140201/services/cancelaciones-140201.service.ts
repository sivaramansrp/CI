import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Catalogo } from '@libs/shared/data-access-user/src';
import { Observable } from 'rxjs';

import { DomicilioNotificacion } from '../models/cancelacions.model';

@Injectable({
  providedIn: 'root',
})
export class Cancelaciones140201Service {
  constructor(private http: HttpClient) {
    //constructor
  }

  getEntidades(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/140201/entidad140201.json');
  }
  getColonia(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/140201/colonia140201.json');
  }
  getmunicipio(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/140201/municipio140201.json');
  }
  getLocalidad(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/140201/localidad140201.json');
  }
  getInfo(): Observable<DomicilioNotificacion> {
    return this.http.get<DomicilioNotificacion>(
      'assets/json/140201/notificacionsInfo.json'
    );
  }
}
