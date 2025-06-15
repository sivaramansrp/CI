import { Tramite130112State, Tramite130112Store } from '../estados/tramites/tramites130112.store';
import { Catalogo } from '@ng-mf/data-access-user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PartidasDeLaMercanciaModelo } from '../../../shared/models/partidas-de-la-mercancia.model';
import { ProductoResponse } from '../../../shared/constantes/vehiculos-adaptados.enum';


/**
 * @descripcion
 * Servicio que proporciona métodos para obtener datos relacionados con el trámite de importación
 * de material de investigación científica. Este servicio realiza solicitudes HTTP para obtener
 * datos desde archivos JSON estáticos.
 *
 * @decorador @Injectable
 */
@Injectable({
  providedIn: 'root',
})
export class ImportacionMaterialDeInvestigacionCientificaService {
  /**
   * @descripcion
   * Constructor del servicio. Inyecta el cliente HTTP para realizar solicitudes.
   * @param {HttpClient} http - Cliente HTTP para realizar solicitudes.
   */
  constructor(private http: HttpClient, private tramite130112Store:Tramite130112Store) {}

  /**
   * @descripcion
   * Obtiene la lista de países disponibles desde un archivo JSON.
   * @returns {Observable<Catalogo[]>} Observable que emite la lista de países.
   */
  getListaDePaisesDisponibles(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('/assets/json/130112/pais-procenia.json');
  }

  /**
   * @descripcion
   * Obtiene la lista de países por bloque desde un archivo JSON.
   * @param {number} _bloqueId - El ID del bloque.
   * @returns {Observable<Catalogo[]>} Observable que emite la lista de países por bloque.
   */
  getPaisesPorBloque(_bloqueId: number): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      '/assets/json/130112/paises-por-bloque.json'
    );
  }

  /**
   * @descripcion
   * Obtiene la lista de entidades federativas desde un archivo JSON.
   * @returns {Observable<Catalogo[]>} Observable que emite la lista de entidades federativas.
   */
  getEntidadFederativa(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      '/assets/json/130112/entidad-federativa.json'
    );
  }

  /**
   * @descripcion
   * Obtiene la lista de representaciones federales desde un archivo JSON.
   * @returns {Observable<Catalogo[]>} Observable que emite la lista de representaciones federales.
   */
  getRepresentacionFederal(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      '/assets/json/130112/representacion-federal.json'
    );
  }

  /**
   * @descripcion
   * Obtiene las opciones de solicitud desde un archivo JSON.
   * @returns {Observable<ProductoResponse>} Observable que emite las opciones de solicitud.
   */
  getSolicitudeOptions(): Observable<ProductoResponse> {
    return this.http.get<ProductoResponse>(
      'assets/json/130112/solicitude-options.json'
    );
  }

  /**
   * @descripcion
   * Obtiene las opciones de producto desde un archivo JSON.
   * @returns {Observable<ProductoResponse>} Observable que emite las opciones de producto.
   */
  getProductoOptions(): Observable<ProductoResponse> {
    return this.http.get<ProductoResponse>(
      'assets/json/130112/producto-otions.json'
    );
  }

  /**
   * @descripcion
   * Obtiene la lista de fracciones y descripciones de partidas de la mercancía desde un archivo JSON.
   * @returns {Observable<Catalogo[]>} Observable que emite la lista de fracciones y descripciones.
   */
  getFraccionDescripcionPartidasDeLaMercancia(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      '/assets/json/130112/fraccion-descripcion-partidas-de-la-mercancia.json'
    );
  }

  /**
   * @descripcion
   * Obtiene la lista de partidas de la mercancía desde un archivo JSON.
   * @returns {Observable<PartidasDeLaMercanciaModelo[]>} Observable que emite la lista de partidas.
   */
  getTablaDatos(): Observable<PartidasDeLaMercanciaModelo[]> {
      return this.http.get<PartidasDeLaMercanciaModelo[]>(
            'assets/json/130111/partidas-de-la.json'
          );
    }
  /**
  * Actualiza el estado del formulario en el store.
  * @param DATOS Estado actualizado del trámite.
  */
  actualizarEstadoFormulario(DATOS: Tramite130112State): void {
    this.tramite130112Store.actualizarEstado(DATOS);
  }

  /**
  * Obtiene los datos de la solicitud.
  * @returns Observable con los datos de la solicitud.
  */
  getDatosDeLaSolicitud(): Observable<Tramite130112State> {
    return this.http.get<Tramite130112State>('assets/json/130112/datos-de-la-solicitud.json');
  }
}