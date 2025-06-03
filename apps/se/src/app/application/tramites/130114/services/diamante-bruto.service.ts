import { Tramite130114State, Tramite130114Store } from '../../../estados/tramites/tramite130114.store';
import { Catalogo } from '@ng-mf/data-access-user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PartidasDeLaMercanciaModelo } from '../../../shared/models/partidas-de-la-mercancia.model';
import { ProductoResponse } from '../../../shared/constantes/vehiculos-adaptados.enum';

@Injectable({
  providedIn: 'root',
})
export class DiamanteBrutoService {
  constructor(private http: HttpClient,private tramite130114Store: Tramite130114Store) {
    //
  }
  /**
   * Obtiene la lista de países disponibles desde un archivo JSON.
   * @returns {Observable<Catalogo[]>}
   */
  getListaDePaisesDisponibles(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('/assets/json/130114/pais-procenia.json');
  }
  /**
   * Obtiene la lista de países por bloque desde un archivo JSON.
   * @param {number} _bloqueId - El ID del bloque.
   * @returns {Observable<Catalogo[]>}
   */
  getPaisesPorBloque(_bloqueId: number): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      '/assets/json/130114/paises-por-bloque.json'
    );
  }
  /**
   * Obtiene la lista de entidades federativas desde un archivo JSON.
   * @returns {Observable<Catalogo[]>}
   */
  getEntidadFederativa(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      '/assets/json/130114/entidad-federativa.json'
    );
  }
  /**
   * Obtiene la lista de representaciones federales desde un archivo JSON.
   * @returns {Observable<Catalogo[]>}
   */
  getRepresentacionFederal(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      '/assets/json/130114/representacion-federal.json'
    );
  }

  /**
   * Obtiene las opciones de solicitud desde un archivo JSON.
   * @returns {Observable<ProductoResponse>}
   */
  getSolicitudeOptions(): Observable<ProductoResponse> {
    return this.http.get<ProductoResponse>(
      'assets/json/130114/solicitude-options.json'
    );
  }

  /**
   * Obtiene las opciones de producto desde un archivo JSON.
   * @returns {Observable<ProductoResponse>}
   */
  getProductoOptions(): Observable<ProductoResponse> {
    return this.http.get<ProductoResponse>(
      'assets/json/130114/producto-otions.json'
    );
  }

  /**
   * Obtiene los datos de las partidas de la mercancía desde un archivo JSON.
   * @returns {Observable<PartidasDeLaMercanciaModelo[]>} Un observable que emite una lista de modelos de partidas de la mercancía.
   */
  getTablaDatos(): Observable<PartidasDeLaMercanciaModelo[]> {
    return this.http.get<PartidasDeLaMercanciaModelo[]>(
      'assets/json/130114/partidas-de-la.json'
    );
  }
    /**
   * Actualiza el estado del formulario en el store.
   * @param DATOS Estado actualizado del trámite.
   */
  actualizarEstadoFormulario(DATOS: Tramite130114State): void {
      this.tramite130114Store.actualizarEstado(DATOS);
  }
  /**
 * Obtiene los datos de la solicitud.
 * @returns Observable con los datos de la solicitud.
 */
getDatosDeLaSolicitud(): Observable<Tramite130114State> {
    return this.http.get<Tramite130114State>('assets/json/130114/datos-de-la-solicitud.json');
}
}

