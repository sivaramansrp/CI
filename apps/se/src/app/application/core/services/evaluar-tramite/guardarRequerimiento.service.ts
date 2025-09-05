import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_POST_GUARDAR_REQUERIMIENTO, API_POST_GUARDAR_REQUERIMIENTO_MOSTRAR_FIRMA } from '@libs/shared/data-access-user/src';
import { BaseResponse } from '@libs/shared/data-access-user/src/core/models/shared/base-response.model';
import { ENVIRONMENT } from '@libs/shared/data-access-user/src';
import { GuardarRequerimiento } from '../../models/evaluar/request/guardar-requerimiento-request.model';
import { GuardarRequerimientosResponse } from '../../models/evaluar/response/guardar-requerimiento-response.model';
import { MostrarFirmarRequerimientoRequest } from '../../models/evaluar/request/firma-mostrar-requerimiento.request.model';
import { MostrarFirmarRequerimientoResponse } from '../../models/evaluar/response/mostrar-firmar-requerimiento.response.model';

@Injectable({
  providedIn: 'root'
})
export class GuardarRequerimientoService {

  /**
     * URL base del servidor al que se realizarán las solicitudes relacionadas con aduanas.
     * Esta variable almacena la dirección del host para los servicios compartidos de catálogos.
     * Es de solo lectura y se inicializa en el constructor del servicio.
     */
  private readonly host: string;

  /**
    * Constructor del servicio que inicializa la URL base del host.
    * @param http Instancia de HttpClient para realizar solicitudes HTTP.
    */
  constructor(private http: HttpClient) {
    this.host = `${ENVIRONMENT.API_HOST}/api/`;
  }

  /** 
  * Guarda un requerimiento en el sistema
  * @param tramite - Número de trámite al que pertenece el requerimiento
  * @param numFolio - Número de folio del trámite
  * @param PAYLOAD - Datos del requerimiento a guardar
  * @returns Observable con la respuesta del servidor que incluye el ID del requerimiento guardado
  */
  postGuardarRequerimiento(tramite: number, numFolio: string, PAYLOAD: GuardarRequerimiento):
    Observable<BaseResponse<GuardarRequerimientosResponse>> {
    const ENDPOINT = `${this.host}${API_POST_GUARDAR_REQUERIMIENTO(tramite.toString(), numFolio)}`;

    return this.http.post<BaseResponse<GuardarRequerimientosResponse>>(ENDPOINT, PAYLOAD);
  }

  /** 
   * Prepara y muestra la interfaz de firma para un requerimiento
   * @param tramite - Número de trámite al que pertenece el requerimiento
   * @param numFolio - Número de folio del trámite
   * @param PAYLOAD - Datos para la firma del requerimiento
   * @returns Observable con la respuesta del servidor para mostrar la firma
 */
  postMostrarFirma(tramite: number, numFolio: string, PAYLOAD: MostrarFirmarRequerimientoRequest):
   Observable<BaseResponse<MostrarFirmarRequerimientoResponse>> {
    const ENDPOINT = `${this.host}${API_POST_GUARDAR_REQUERIMIENTO_MOSTRAR_FIRMA(tramite.toString(), numFolio)}`;
    return this.http.post<BaseResponse<MostrarFirmarRequerimientoResponse>>(ENDPOINT, PAYLOAD);
  }
}
