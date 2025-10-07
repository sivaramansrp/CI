import { API_GET_FRACCION_ARANCELARIA_PARTIDA, API_POST_FRACCION_ARANCELARIA_VALIDAR, API_POST_VALIDAR_EMPAQUE, API_POST_VALIDAR_INSUMO } from "../server/api-router";
import { BaseResponse } from "@libs/shared/data-access-user/src/core/models/shared/base-response.model";
import { DatosFraccionArancelariaResponse } from "../models/response/datos-fraccion-arancelaria-response.model";
import { ENVIRONMENT } from "@libs/shared/data-access-user/src";
import { FraccionValidarRequest } from "../models/request/validar-fraccion-request.model";
import { FraccionValidarResponse } from "../models/response/validar-fraccion-response.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { InsumoTratadosRequest } from "../models/request/validar-insumo-request.model";
import { Observable } from "rxjs";
@Injectable({
    providedIn: 'root'
})

export class DatosMercanciaService {  
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
     * Consulta la fracción arancelaria o partida arancelaria
     * @param cveFraccion - Identificador de la clave de la fracción o partida arancelaria.
     * @returns Observable con la respuesta del servidor que contiene los datos de la fracción o partida arancelaria
    */
    getFraccionArancelariaPartida(cveFraccion: string): Observable<BaseResponse<DatosFraccionArancelariaResponse>> {
        const ENDPOINT = `${this.host}${API_GET_FRACCION_ARANCELARIA_PARTIDA(cveFraccion)}`;
        return this.http.get<BaseResponse<DatosFraccionArancelariaResponse>>(ENDPOINT);
    }
    
    /**
     * Valida la fracción arancelaria mediante petición POST
     * @param PAYLOAD - Datos requeridos para la validación de la fracción arancelaria
     * @returns Observable con la respuesta del servidor que contiene el resultado de la validación
     */
    postFracccionArancelariaValidar(PAYLOAD: FraccionValidarRequest): Observable<BaseResponse<FraccionValidarResponse>> {
        const ENDPOINT = `${this.host}${API_POST_FRACCION_ARANCELARIA_VALIDAR}`;
        return this.http.post<BaseResponse<FraccionValidarResponse>>(ENDPOINT, PAYLOAD);
    }

    /**
     * Valida un insumo
     * @param PAYLOAD - Datos del insumo a validar
     * @returns Observable con la respuesta del servidor que indica si el insumo es válido
     */
    postValidarInsumo(PAYLOAD: InsumoTratadosRequest): Observable<BaseResponse<boolean>> {
        const ENDPOINT = `${this.host}${API_POST_VALIDAR_INSUMO}`;
        return this.http.post<BaseResponse<boolean>>(ENDPOINT, PAYLOAD);
    }

    /**
     * Valida un empaque
     * @param PAYLOAD - Datos del empaque a validar
     * @returns Observable con la respuesta del servidor que indica si el empaque es válido
     */
    postValidarEmpaque(PAYLOAD: InsumoTratadosRequest): Observable<BaseResponse<boolean>> {
        const ENDPOINT = `${this.host}${API_POST_VALIDAR_EMPAQUE}`;
        return this.http.post<BaseResponse<boolean>>(ENDPOINT, PAYLOAD);
    }
}