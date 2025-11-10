import { API_GET_EXPORTADOR_AUTORIZADO } from "../server/api-router";
import { BaseResponse } from "@libs/shared/data-access-user/src/core/models/shared/base-response.model";
import { ENVIRONMENT } from "@libs/shared/data-access-user/src";
import { ExportadorAutorizadoResponse } from "../models/response/exportador-autorizado-response.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ExportadorAutorizadoService {

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
    
    getExportadorAutorizado(idSolicitud: string): Observable<BaseResponse<ExportadorAutorizadoResponse>> {
        const ENDPOINT = `${this.host}${API_GET_EXPORTADOR_AUTORIZADO(idSolicitud)}`;
        return this.http.get<BaseResponse<ExportadorAutorizadoResponse>>(ENDPOINT);
    }
}