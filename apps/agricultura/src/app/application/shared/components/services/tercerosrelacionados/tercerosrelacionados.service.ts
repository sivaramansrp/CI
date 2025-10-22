/**
 * @fileoverview
 * Servicio para la gestión de catálogos y datos relacionados con terceros en el trámite 220201 de agricultura.
 * Permite obtener listas de catálogos desde archivos remotos.
 * Cobertura compodoc 100%: cada clase, método y propiedad está documentada.
 * @module TercerosrelacionadosService
 */

import { 
  API_GET_CATALOGO_CONSULTA_PAISES
 } from '../../../../core/server/api-router';
import { Catalogo, RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { ENVIRONMENT } from '@ng-mf/data-access-user';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../../../../tramites/220102/constantes/fitosanitario.enum';
import { BaseResponse } from '@libs/shared/data-access-user/src/core/models/shared/base-response.model';

/**
 * Servicio para la gestión de catálogos y datos relacionados con terceros.
 * Permite obtener listas de catálogos desde archivos remotos.
 *
 * @export
 * @class TercerosrelacionadosService
 * @providedIn root
 */
@Injectable({
  providedIn: 'root'
})
export class TercerosrelacionadosService {

  /**
   * URL base para las peticiones a los catálogos y datos.
   * @type {string}
   */
  url: string = URL;
  host: string;

  /**
   * Constructor del servicio.
   * @param http Servicio HttpClient para realizar peticiones HTTP.
   */
  constructor(public readonly http: HttpClient) { 
    this.host = `${ENVIRONMENT.API_HOST}/api/`;
  }

  /**
   * Obtiene la lista de catálogos a partir de un archivo.
   * @param {string} fileName - Nombre del archivo de catálogo.
   * @returns {Observable<Catalogo[]>} Observable con la lista de catálogos.
   */
  obtenerSelectorList(fileName: string): Observable<Catalogo[]> {
    const BASEURL = this.url + fileName;
    return this.http.get<RespuestaCatalogos>(BASEURL).pipe(
      map(response => response.data)
    );
  }

  obtenerPaisesList(tramite: number): Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${API_GET_CATALOGO_CONSULTA_PAISES(tramite.toString())}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
  }

}