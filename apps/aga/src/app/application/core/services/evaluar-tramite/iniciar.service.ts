import { ENVIRONMENT, TRAMITE } from '@libs/shared/data-access-user/src';
import { BaseResponse } from '@libs/shared/data-access-user/src/core/models/5701/base-response.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { API_GET_INICAR_DICTAMEN, NUMFOLIOTRAMITE } from '@libs/shared/data-access-user/src/core/servers/api-router';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class IniciarService {

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
    * Inicia el dictamen del trámite 130118.
    * @param numFolio Número de folio del trámite.
    * @returns Observable con la respuesta del servidor.
    */
    getIniciarDictamen(tramite: number, numFolio: string): Observable<BaseResponse<null>> {
        const ENDPOINT = `${this.host}${API_GET_INICAR_DICTAMEN.replace(TRAMITE, tramite.toString()).replace(NUMFOLIOTRAMITE, numFolio)}`;
        return this.http.get<BaseResponse<null>>(ENDPOINT);
    }

}
