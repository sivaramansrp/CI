import { Adquiriente, Complementaria, DetallesLicitacion, LicitacionesDisponibles } from '../../../tramites/constantes/120501/licitaciones-disponibles-table-data.enum';
import { Catalogo } from '../../models/shared/catalogos.model';
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

  getData(): Observable<LicitacionesDisponibles[]> {
    return this.http.get<LicitacionesDisponibles[]>('assets/json/120501/licitaciones-disponibles.json');
  }
  getEntidadFederativa(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/120501/entidad-federativa.json');
  }
  getRepresentacionFederal(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/120501/representacion-federal.json');
  }
  getDetallesDelalicitacion(): Observable<DetallesLicitacion> {
    return this.http.get<DetallesLicitacion>('assets/json/120501/detalles-licitacion.json');
  }
  getAdquiriente(): Observable<Adquiriente> {
    return this.http.get<Adquiriente>('assets/json/120501/adquiriente.json');
  }
  getTableData(): Observable<Complementaria[]> {
    return this.http.get<Complementaria[]>('assets/json/120501/datos-de-la-tabla.json');
  }
}
