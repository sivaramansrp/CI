import { CambioDeModalidadForm, CambioModalidadResponse, ServiciosState } from '../modelos/cambio-de-modalidad.model';
import { CambioModalidadStore } from '../estados/tramite80208.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaCatalogos } from '@ng-mf/data-access-user';

/**
 * @service CambioModalidadService
 * @description
 * Servicio para gestionar las operaciones relacionadas con el cambio de modalidad.
 * Proporciona métodos para obtener datos simulados, servicios IMMEX y cambios de modalidad desde archivos JSON.
 */
@Injectable({
  providedIn: 'root'
})  
export class CambioModalidadService {

  /**
   * @property {string} datosSimuladosUrl
   * @description URL base para obtener los datos simulados desde archivos JSON.
   * @private
   */
  private datosSimuladosUrl = '/assets/json/80208/';

  /**
   * @constructor
   * @description Constructor del servicio.
   * @param {HttpClient} http - Cliente HTTP para realizar solicitudes.
   */
  constructor(
    private http: HttpClient,
    public cambioModalidadStore: CambioModalidadStore,
  ) {
    // No se necesita lógica de inicialización adicional.
  }

  /**
   * @method getDatosSimulados
   * @description Obtiene los datos simulados para el formulario de cambio de modalidad.
   * @returns {Observable<CambioDeModalidadForm>} Observable que emite los datos del formulario.
   */
  getDatosSimulados(): Observable<CambioDeModalidadForm> {
    return this.http.get<CambioDeModalidadForm>(`${this.datosSimuladosUrl}cambio-de-modalidad.json`);
  }

  /**
   * @method getServiciosImmx
   * @description Obtiene los servicios IMMEX desde un archivo JSON simulado.
   * @returns {Observable<RespuestaCatalogos>} Observable que emite la respuesta de los catálogos.
   */
  getServiciosImmx(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(`${this.datosSimuladosUrl}servicios-immex.json`);
  }

  /**
   * @method getCambioDeModalidad
   * @description Obtiene la respuesta del cambio de modalidad desde un archivo JSON simulado.
   * @returns {Observable<CambioModalidadResponse>} Observable que emite la respuesta del cambio de modalidad.
   */
  getCambioDeModalidad(): Observable<CambioModalidadResponse> {
    return this.http.get<CambioModalidadResponse>(`${this.datosSimuladosUrl}cambio-de-modalidad.json`);
  }

  /**
   * @method actualizarEstadoFormulario
   * @description
   * Actualiza el estado del formulario en el store de cambio de modalidad.
   * @returns {void}
   */
  actualizarEstadoFormulario(DATOS:ServiciosState): void {
    this.cambioModalidadStore.setCambioDeModalidad(DATOS.combioDeModalidaDatos);
    this.cambioModalidadStore.setCambioModalidad(JSON.stringify(DATOS.cambioModalidad));
    this.cambioModalidadStore.setServiciosImmx(DATOS.serviciosImmx);
  }

  /**
   * @method getDatosDeLaSolicitudData
   * @description
   * Obtiene los datos de la solicitud de cambio de modalidad desde un archivo JSON simulado.
   * @returns {Observable<ServiciosState>} Observable que emite los datos de la solicitud.
   */
  getDatosDeLaSolicitudData(): Observable<ServiciosState> {
    return this.http.get<ServiciosState>('assets/json/80208/cambio-de-modalidad-datos.json');
  }

}