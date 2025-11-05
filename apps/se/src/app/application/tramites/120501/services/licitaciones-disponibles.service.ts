import { Adquiriente, Complementaria, DetallesLicitacion, LicitacionesDisponibles } from '@libs/shared/data-access-user/src/tramites/constantes/120501/licitaciones-disponibles-table-data.enum';
import { Solicitud120501State, Tramite120501Store } from '../estados/tramites/tramite120501.store';
import { Catalogo, CATALOGO_ENTIDADES_FEDERATIVAS, CATALOGO_REPRESENTACION_FEDERAL, COMUN_URL } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BaseResponse } from '@libs/shared/data-access-user/src/core/models/shared/base-response.model';

/**
 * Servicio encargado de gestionar las operaciones relacionadas con las licitaciones disponibles,
 * incluyendo la obtención de catálogos, detalles de licitación, adquirientes y el manejo del estado
 * del formulario para el trámite 120501.
 *
 * Proporciona métodos para consumir archivos JSON locales que simulan respuestas de un backend,
 * así como para actualizar el estado global del formulario a través del store correspondiente.
 */
@Injectable({
  providedIn: 'root'
})
export class LicitacionesDisponiblesService {

  /**
   * URL base del host para todas las consultas de catálogos.
   *
   * Esta propiedad almacena la URL base configurada desde las variables de entorno
   * y se utiliza como prefijo para construir todos los endpoints de los catálogos.
   *
   * @type {string}
   * @readonly
   * @since 1.0.0
   */
  host: string;

  /**
   * Constructor del servicio.
   * Servicio HttpClient para realizar peticiones HTTP.
   * Store para gestionar el estado del trámite 120501.
   */
  constructor(private http: HttpClient, private tramite120501Store: Tramite120501Store) {
    this.host = `${COMUN_URL.BASE_URL}`;
  }

  /**
   * Obtiene el listado de licitaciones disponibles.
   */
  getData(): Observable<LicitacionesDisponibles[]> {
    return this.http.get<LicitacionesDisponibles[]>('assets/json/120501/licitaciones-disponibles.json');
  }

  /**
   * Obtiene el catálogo de entidades federativas.
   */
  // getEntidadFederativa(): Observable<Catalogo[]> {
  //   return this.http.get<Catalogo[]>('assets/json/120501/entidad-federativa.json');
  // }


  /*
    * Obtiene el catálogo de entidades federativas.
    * @param {string} tramite - El ID del trámite.
    * @returns {Observable<BaseResponse<Catalogo[]>>}
    */
  entidadesFederativasCatalogo(tramite: string): Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${CATALOGO_ENTIDADES_FEDERATIVAS(tramite)}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
  }

  /*
   * Obtiene el catálogo de representación federal.
   * @param {string} tramite - El ID del trámite.
   * @param {string} cveEntidad - La clave de la entidad.
   * @returns {Observable<BaseResponse<Catalogo[]>>}
   */
  representacionFederalCatalogo(tramite: string, cveEntidad: string): Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${CATALOGO_REPRESENTACION_FEDERAL(tramite, cveEntidad)}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
  }

  /**
   * Obtiene el catálogo de representaciones federales.
   */
  // getRepresentacionFederal(): Observable<Catalogo[]> {
  //   return this.http.get<Catalogo[]>('assets/json/120501/representacion-federal.json');
  // }

  /**
   * Obtiene los detalles de una licitación específica.
   */
  getDetallesDelalicitacion(): Observable<DetallesLicitacion> {
    return this.http.get<DetallesLicitacion>('assets/json/120501/detalles-licitacion.json');
  }

  /**
   * Obtiene los datos del adquiriente.
   */
  getAdquiriente(): Observable<Adquiriente> {
    return this.http.get<Adquiriente>('assets/json/120501/adquiriente.json');
  }

  /**
   * Obtiene los datos para poblar la tabla dinámica.
   */
  getTableData(): Observable<Complementaria[]> {
    return this.http.get<Complementaria[]>('assets/json/120501/datos-de-la-tabla.json');
  }

  /**
   * Obtiene los datos vigentes de licitaciones para el formulario principal.
   */
  getLicitationesVigentesData(): Observable<Solicitud120501State> {
    return this.http.get<Solicitud120501State>('assets/json/120501/solicitar-transferencia-cupos.json');
  }

  /**
   * Actualiza el estado global del formulario en el store con los datos proporcionados.
   */
  actualizarEstadoFormulario(DATOS: Solicitud120501State): void {
    this.tramite120501Store.actualizarEstado(DATOS);
  }
}