import { Complementaria } from '../../../tramites/constantes/120501/licitaciones-disponibles-table-data.enum';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class LicitacionesDisponiblesService {

  constructor(private http: HttpClient) { 
    // Lógica de inicialización si es necesario
  }

  getData(): Observable<any> {
    return this.http.get('assets/json/120501/licitaciones-disponibles.json');
  }
  getEntidadFederativa(): Observable<any> {
    return this.http.get('assets/json/120501/entidad-federativa.json');
  }
  getRepresentacionFederal(): Observable<any> {
    return this.http.get<any>('assets/json/120501/representacion-federal.json');
  }
  getDetallesDelalicitacion(): Observable<unknown> {
    return this.http.get('assets/json/120501/detalles-licitacion.json');
  }
  getAdquiriente(): Observable<any> {
    return this.http.get('assets/json/120501/adquiriente.json');
  }
  getTableData(): Observable<Complementaria[]> {
    return this.http.get<Complementaria[]>('assets/json/120501/datos-de-la-tabla.json');
  }
}
