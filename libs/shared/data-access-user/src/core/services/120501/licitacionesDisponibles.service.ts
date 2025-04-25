import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { Catalogo } from '../../models/shared/catalogos.model';

@Injectable({
  providedIn: 'root'
})
export class LicitacionesDisponiblesService {

  constructor(private http: HttpClient) { 
    // Lógica de inicialización si es necesario
  }

  getData(): Observable<unknown> {
    return this.http.get<{ [key: string]: unknown }>('assets/json/120501/licitaciones-disponibles.json');
  }
  getEntidadFederativa(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/120501/entidad-federativa.json');
  }
  getRepresentacionFederal(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/120501/representacion-federal.json');
  }
  getDetallesDelalicitacion(): Observable<unknown> {
    return this.http.get('assets/json/120501/detalles-licitacion.json');
  }
  getAdquiriente(): Observable<unknown> {
    return this.http.get('assets/json/120501/adquiriente.json');
  }
  getTableData(): Observable<unknown> {
    return this.http.get('assets/json/120501/datos-de-la-tabla.json');
  }
}
