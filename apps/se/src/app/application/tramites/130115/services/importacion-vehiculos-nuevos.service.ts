/**
 * ImportacionVehiculosNuevosService
 */
import { Catalogo } from '@ng-mf/data-access-user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductoResponse } from '../../../shared/constantes/vehiculos-adaptados.enum';

import { Tramite130115State, Tramite130115Store } from '../../../estados/tramites/tramite130115.store';
import { PartidasDeLaMercanciaModelo } from '../../../shared/models/partidas-de-la-mercancia.model';
/**
 * ImportacionVehiculosNuevosService
 **/

@Injectable({
  providedIn: 'root',
})
export class ImportacionVehiculosNuevosService {
  constructor(private http: HttpClient,private tramite130115Store: Tramite130115Store) {
    //
  }
  /**
   * Obtiene la lista de países disponibles desde un archivo JSON.
   * @returns {Observable<Catalogo[]>}
   */
  getListaDePaisesDisponibles(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('/assets/json/130115/pais-procenia.json');
  }
  /**
   * Obtiene la lista de países por bloque desde un archivo JSON.
   * @param {number} _bloqueId - El ID del bloque.
   * @returns {Observable<Catalogo[]>}
   */
  getPaisesPorBloque(_bloqueId: number): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      '/assets/json/130115/paises-por-bloque.json'
    );
  }
  /**
   * Obtiene la lista de entidades federativas desde un archivo JSON.
   * @returns {Observable<Catalogo[]>}
   */
  getEntidadFederativa(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      '/assets/json/130115/entidad-federativa.json'
    );
  }
  /**
   * Obtiene la lista de representaciones federales desde un archivo JSON.
   * @returns {Observable<Catalogo[]>}
   */
  getRepresentacionFederal(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      '/assets/json/130115/representacion-federal.json'
    );
  }

  /**
   * Obtiene las opciones de solicitud desde un archivo JSON.
   * @returns {Observable<ProductoResponse>}
   */
  getSolicitudeOptions(): Observable<ProductoResponse> {
    return this.http.get<ProductoResponse>(
      'assets/json/130115/solicitude-options.json'
    );
  }

  /**
   * Obtiene las opciones de producto desde un archivo JSON.
   * @returns {Observable<ProductoResponse>}
   */
  getProductoOptions(): Observable<ProductoResponse> {
    return this.http.get<ProductoResponse>(
      'assets/json/130115/producto-otions.json'
    );
  }
  /**
   * Obtiene la lista de productos desde un archivo JSON.
   * */
    getTablaDatos(): Observable<PartidasDeLaMercanciaModelo[]> {
      return this.http.get<PartidasDeLaMercanciaModelo[]>(
            'assets/json/130115/partidas-de-la.json'
          );
    }
       /**
   * Actualiza el estado del formulario en el store.
   * @param DATOS Estado actualizado del trámite.
   */
  actualizarEstadoFormulario(DATOS: Tramite130115State): void {
      this.tramite130115Store.actualizarEstado(DATOS);
  }
  /**
 * Obtiene los datos de la solicitud.
 * @returns Observable con los datos de la solicitud.
 */
getDatosDeLaSolicitud(): Observable<Tramite130115State> {
    return this.http.get<Tramite130115State>('assets/json/130115/datos-de-la-solicitud.json');
}
}
