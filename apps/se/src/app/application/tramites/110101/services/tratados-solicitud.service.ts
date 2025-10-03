import { API_POST_SOLICITUD_TRATADOS_CONFIGURACION, API_POST_TRATADO_CRITERIO } from "../server/api-router";
import { BaseResponse } from "@libs/shared/data-access-user/src/core/models/shared/base-response.model";
import { CriterioConfiguracionRequest } from "../models/request/tratado-configuracion-request.model";
import { CriterioConfiguracionResponse } from "../models/response/tratado-configuracion-response.model";
import { CriterioTratadoResponse } from "../models/response/tratado-criterio-response.model";
import { ENVIRONMENT } from "@libs/shared/data-access-user/src";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TratadoAcuerdoCriterioRequest } from "../models/request/tratado-criterio-request.model";

@Injectable({
  providedIn: 'root'
})

export class TratadosSolicitudService {

  
  /**
     * URL base del servidor al que se realizarán las solicitudes relacionadas con el tramite 110101.
     * Esta variable almacena la dirección del host para los servicios tratados solicitud.
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
 * Validar si es posible agregar criterios de tratado a una solicitud.
 * 
 * @param PAYLOAD - Datos de validación de criterios de tratado
 * @returns Observable con la respuesta de validación del servidor
 */
  postTratadoCriterio(PAYLOAD: TratadoAcuerdoCriterioRequest): Observable<BaseResponse<CriterioTratadoResponse[]>> {
    const ENDPOINT = `${this.host}${API_POST_TRATADO_CRITERIO}`;
    return this.http.post<BaseResponse<CriterioTratadoResponse[]>>(ENDPOINT, PAYLOAD);
  }

/**
 * Valida las configuraciones de acuerdo a los criterios y tratados seleccionados.
 * 
 * @param PAYLOAD - Datos de validación de configuracion de criterios de tratado
 * @returns Observable con la respuesta de validación del servidor
 */
  postTratadoConfiguracion(PAYLOAD: CriterioConfiguracionRequest[]): Observable<BaseResponse<CriterioConfiguracionResponse>> {
    const ENDPOINT = `${this.host}${API_POST_SOLICITUD_TRATADOS_CONFIGURACION}`;
    return this.http.post<BaseResponse<CriterioConfiguracionResponse>>(ENDPOINT, PAYLOAD);
  }
}