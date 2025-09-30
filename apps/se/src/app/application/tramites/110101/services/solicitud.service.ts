import { API_POST_GENERAR_CADENA_ORIGINAL, API_POST_GUARDAR_SOLICITUD } from "../server/api-router";
import { BaseResponse } from "@libs/shared/data-access-user/src/core/models/shared/base-response.model";
import { ENVIRONMENT } from "@libs/shared/data-access-user/src";
import { GenerarCadenaOrigRequest } from "../models/request/generar-cadena-original-request.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SolicitudCompletaRequest } from "../models/request/guardado-solicitud-request.model";

@Injectable({
    providedIn: 'root'
})

export class SolicitudService {


    /**
       * URL base del servidor al que se realizarán las solicitudes relacionadas con el tramite 110101.
       * Esta variable almacena la dirección del host para los servicios datos adicionales.
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
     * Registro de una solicitud.
     * @returns Observable con la respuesta del servidor
     */
    postSolicitudGuardar(PAYLOAD: SolicitudCompletaRequest): Observable<BaseResponse<number>> {
        const ENDPOINT = `${this.host}${API_POST_GUARDAR_SOLICITUD}`;
        return this.http.post<BaseResponse<number>>(ENDPOINT, PAYLOAD);
    }

    /**
     * Genera la cadena original para la solicitud.
     */
    postGenerarCadenaOriginal(PAYLOAD: GenerarCadenaOrigRequest): Observable<string> {
        const ENDPOINT = `${this.host}${API_POST_GENERAR_CADENA_ORIGINAL}`;
        return this.http.post<string>(ENDPOINT, {});
    }
}