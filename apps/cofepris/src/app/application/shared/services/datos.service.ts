
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Catalogo } from '@libs/shared/data-access-user/src';
import { ScianData } from '../models/datos-modificacion.model';

import { PreOperativo } from '../models/datos-modificacion.model';

import { DatosProducto } from '../models/datos-modificacion.model';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  constructor(private http:HttpClient) { 
    //constructor
  }

  obtenerEstadoData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/260603/estado.json');
  }

  obternerDatosData(): Observable<ScianData[]> {
    return this.http.get<ScianData[]>('assets/json/260603/datos-scian-tabla.json');
  }

  obtenerClaveScian(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/260603/clave-scian.json');
  }

  obtenerDescripcionScian(): Observable<Catalogo[]> { 
    return this.http.get<Catalogo[]>('assets/json/260603/descripcion-scian.json');
  }

  obtenerPreOperativo(): Observable<PreOperativo[]> {
    return this.http.get<PreOperativo[]>('assets/json/260603/pre-operativo.json');
  }
  
  obtenerDatosProducto(): Observable<DatosProducto[]> {
    return this.http.get<DatosProducto[]>('assets/json/260603/datos-producto.json');
  }
  obtenerClasificationProductos(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/260603/clasificacion-producto.json');
  }

  
}
