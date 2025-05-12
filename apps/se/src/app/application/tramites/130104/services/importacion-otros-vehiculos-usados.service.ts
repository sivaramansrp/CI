/**
 * ImportacionOtrosVehiculosUsadosService
 */
import { Catalogo } from '@ng-mf/data-access-user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductoResponse } from '../../../shared/constantes/vehiculos-adaptados.enum';

import { PartidasDeLaMercanciaModelo } from '../../../shared/models/partidas-de-la-mercancia.model';
/**
 * ImportacionOtrosVehiculosUsadosService
 **/

@Injectable({
  providedIn: 'root',
})
export class ImportacionOtrosVehiculosUsadosService {
  constructor(private http: HttpClient) {
    //
  }
  /**
   * Obtiene la lista de países disponibles desde un archivo JSON.
   * @returns {Observable<Catalogo[]>}
   */
  getListaDePaisesDisponibles(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('/assets/json/130104/pais-procenia.json');
  }
  /**
   * Obtiene la lista de países por bloque desde un archivo JSON.
   * @param {number} _bloqueId - El ID del bloque.
   * @returns {Observable<Catalogo[]>}
   */
  getPaisesPorBloque(_bloqueId: number): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      '/assets/json/130104/paises-por-bloque.json'
    );
  }
  /**
   * Obtiene la lista de entidades federativas desde un archivo JSON.
   * @returns {Observable<Catalogo[]>}
   */
  getEntidadFederativa(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      '/assets/json/130104/entidad-federativa.json'
    );
  }
  /**
   * Obtiene la lista de representaciones federales desde un archivo JSON.
   * @returns {Observable<Catalogo[]>}
   */
  getRepresentacionFederal(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      '/assets/json/130104/representacion-federal.json'
    );
  }

  /**
   * Obtiene las opciones de solicitud desde un archivo JSON.
   * @returns {Observable<ProductoResponse>}
   */
  getSolicitudeOptions(): Observable<ProductoResponse> {
    return this.http.get<ProductoResponse>(
      'assets/json/130104/solicitude-options.json'
    );
  }

  /**
   * Obtiene las opciones de producto desde un archivo JSON.
   * @returns {Observable<ProductoResponse>}
   */
  getProductoOptions(): Observable<ProductoResponse> {
    return this.http.get<ProductoResponse>(
      'assets/json/130104/producto-otions.json'
    );
  }
  /**
   * Obtiene los datos de la tabla de partidas de la mercancía desde un archivo JSON.
   */
   getTablaDatos(): Observable<PartidasDeLaMercanciaModelo[]> {
      return this.http.get<PartidasDeLaMercanciaModelo[]>(
            'assets/json/130104/partidas-de-la.json'
          );
    }
}
