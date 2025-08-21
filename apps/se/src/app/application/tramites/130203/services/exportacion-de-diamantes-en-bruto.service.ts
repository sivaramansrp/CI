import { Observable, map } from 'rxjs';
import {
  Tramite130203State,
  Tramite130203Store,
} from '../estados/tramites/tramites130203.store';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PartidasDeLaMercanciaModelo } from '../../../shared/models/partidas-de-la-mercancia.model';
import { ProductoResponse } from '../../../shared/constantes/vehiculos-adaptados.enum';

@Injectable({
  providedIn: 'root',
})
export class ExportacionDeDiamantesEnBrutoService {
  constructor(private http: HttpClient, private tramite130203Store:Tramite130203Store) {
    //
  }

  /**
   * Obtiene la lista de países disponibles desde un archivo JSON.
   * @returns {Observable<Catalogo[]>}
   */
  getListaDePaisesDisponibles(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('/assets/json/130203/pais-procenia.json');
  }

  /**
   * Obtiene la lista de países por bloque desde un archivo JSON.
   * @param {number} _bloqueId - El ID del bloque.
   * @returns {Observable<Catalogo[]>}
   */

  getPaisesPorBloque(_bloqueId: number): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      '/assets/json/130203/paises-por-bloque.json'
    );
  }

  /**
   * Obtiene la lista de entidades federativas desde un archivo JSON.
   * @returns {Observable<Catalogo[]>}
   */
  getEntidadFederativa(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      '/assets/json/130203/entidad-federativa.json'
    );
  }

  /**
   * Obtiene la lista de representaciones federales desde un archivo JSON.
   * @returns {Observable<Catalogo[]>}
   */
  getRepresentacionFederal(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      '/assets/json/130203/representacion-federal.json'
    );
  }

  /**
   * Obtiene las opciones de solicitud desde un archivo JSON.
   * @returns {Observable<ProductoResponse>}
   */
  getSolicitudeOptions(): Observable<ProductoResponse> {
    return this.http.get<ProductoResponse>(
      'assets/json/130203/solicitude-options.json'
    );
  }

  /**
   * Obtiene las opciones de producto desde un archivo JSON.
   * @returns {Observable<ProductoResponse>}
   */
  getProductoOptions(): Observable<ProductoResponse> {
    return this.http.get<ProductoResponse>(
      'assets/json/130203/producto-options.json'
    );
  }

  /**
   * Obtiene la lista de países emisores desde un archivo JSON.
   * @returns {Observable<Catalogo[]>} Un observable con el catálogo de países emisores.
   */
  getPaisesEmisores(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/130203/pais-emisor-del.json');
  }

  /**
  * Obtiene los nombres en inglés desde un archivo JSON local.  
  */
  getNombresIngles(): Observable<string[]> {
    return this.http.get<string[]>(
      'assets/json/130203/nomber-en-ingles-del.json'
    );
  }

  /**
   * Obtiene la tabla de datos de partidas de la mercancía desde un archivo JSON.
   * @returns {Observable<PartidasDeLaMercanciaModelo[]>} Un observable con las partidas de mercancía.
   */
  getTablaDatos(): Observable<PartidasDeLaMercanciaModelo[]> {
    return this.http.get<PartidasDeLaMercanciaModelo[]>(
      'assets/json/130203/partidas-de-la.json'
    );
  }

  /**
   * Obtiene el nombre del exportador desde un archivo JSON.
   * @returns {Observable<string>} Un observable con el nombre del exportador.
  */
  getNombreExporter(): Observable<string> {
    return this.http
      .get<{ nombreExportador: string }>(
        'assets/json/130203/nombre-exporter.json'
      )
    .pipe(map((response) => response.nombreExportador));
  }

  /**
  * Actualiza el estado del formulario en el store.
  * @param DATOS Estado actualizado del trámite.
  */
  actualizarEstadoFormulario(DATOS: Tramite130203State): void {
      this.tramite130203Store.actualizarEstado(DATOS);
  }

  /**
  * Obtiene los datos de la solicitud.
  * @returns Observable con los datos de la solicitud.
  */
  getDatosDeLaSolicitud(): Observable<Tramite130203State> {
      return this.http.get<Tramite130203State>('assets/json/130203/datos-de-la-solicitud.json');
  }
}
