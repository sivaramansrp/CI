import { CambioDeModalidadForm, CambioModalidadResponse } from '../modelos/cambio-de-modalidad.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaCatalogos } from '@ng-mf/data-access-user';

@Injectable({
  providedIn: 'root'
})  

export class CambioModalidadService {

  /**
   * URL base para obtener los datos simulados desde archivos JSON.
   * @private
   * @type {string}
   */
  private datosSimuladosUrl = '/assets/json/80208/';

  /**
   * Constructor del servicio.
   * 
   * @param {HttpClient} http - Cliente HTTP para realizar solicitudes.
   */
  constructor(private http: HttpClient) {
    // No se necesita lógica de inicialización adicional.
  }

  /**
   * Obtiene los datos simulados para el formulario de cambio de modalidad.
   * 
   * @returns {Observable<CambioDeModalidadForm>} Observable que emite los datos del formulario.
   */
  getDatosSimulados(): Observable<CambioDeModalidadForm> {
    return this.http.get<CambioDeModalidadForm>(`${this.datosSimuladosUrl}cambio-de-modalidad.json`);
  }

  /**
   * Obtiene los servicios IMMEX desde un archivo JSON simulado.
   * 
   * @returns {Observable<RespuestaCatalogos>} Observable que emite la respuesta de los catálogos.
   */
  getServiciosImmx(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(`${this.datosSimuladosUrl}servicios-immex.json`);
  }

  /**
   * Obtiene la respuesta del cambio de modalidad desde un archivo JSON simulado.
   * 
   * @returns {Observable<CambioModalidadResponse>} Observable que emite la respuesta del cambio de modalidad.
   */
  getCambioDeModalidad(): Observable<CambioModalidadResponse> {
    return this.http.get<CambioModalidadResponse>(`${this.datosSimuladosUrl}cambio-de-modalidad.json`);
  }

}