import { ListaTabla, ListaTablaBaja } from '../models/registro.model';
import { Mercancias, PlantasTabla, ProductorIndirecto, SectorTabla } from '../../../shared/models/complementaria.model';
import { Observable, catchError, throwError } from 'rxjs';
import { Bitacora } from '../../../shared/models/bitacora.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Servicio para gestionar la obtención de datos de catálogos.
 * Este servicio realiza solicitudes HTTP para obtener datos de diferentes tablas relacionadas con el trámite.
 */
@Injectable({
  providedIn: 'root',
})
export class CatalogosService {
  /**
   * Constructor del servicio.
   * @param http Cliente HTTP para realizar solicitudes a los recursos.
   */
  constructor(private http: HttpClient) {}

  /**
   * Obtiene los datos de la tabla de sectores activos.
   * @returns Un observable con la lista de sectores activos.
   */
  obtenerTablaLista(): Observable<ListaTabla[]> {
    return this.http.get<ListaTabla[]>('assets/json/90303/lista-tabla.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  /**
   * Obtiene los datos de la tabla de sectores en baja.
   * @returns Un observable con la lista de sectores en baja.
   */
  obtenerTablaListaBaja(): Observable<ListaTablaBaja[]> {
    return this.http.get<ListaTablaBaja[]>('assets/json/90303/lista-tabla-baja.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  /**
   * Obtiene los datos de la tabla de plantas.
   * @returns Un observable con la lista de plantas.
   */
  obtenerTablaPlantas(): Observable<PlantasTabla[]> {
    return this.http.get<PlantasTabla[]>('assets/json/90303/plantas.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  /**
   * Obtiene los datos de la tabla de sectores.
   * @returns Un observable con la lista de sectores.
   */
  obtenerTablaSector(): Observable<SectorTabla[]> {
    return this.http.get<SectorTabla[]>('assets/json/90303/sector.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  /**
   * Obtiene los datos de la tabla de mercancías.
   * @returns Un observable con la lista de mercancías.
   */
  obtenerTablaMercancia(): Observable<Mercancias[]> {
    return this.http.get<Mercancias[]>('assets/json/90303/mercancia.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  /**
   * Obtiene los datos de la tabla de productores indirectos.
   * @returns Un observable con la lista de productores indirectos.
   */
  obtenerTablaProductor(): Observable<ProductorIndirecto[]> {
    return this.http.get<ProductorIndirecto[]>('assets/json/90303/productor.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  /**
   * Obtiene los datos de la tabla de bitácoras.
   * @returns Un observable con la lista de bitácoras.
   */
  obtenerTablaBitacora(): Observable<Bitacora[]> {
    return this.http.get<Bitacora[]>('assets/json/90303/bitacora.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
 
}