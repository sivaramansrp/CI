import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENVIRONMENT } from '@libs/shared/data-access-user/src';
import { BaseResponse } from '@libs/shared/data-access-user/src/core/models/shared/base-response.model';
import { Observable } from 'rxjs';
import { FraccionArancelariaDecripcionModel } from '../../../../220201/models/220201/capturar-solicitud.model';
import { API_GET_SOLICITUDES_FRACCION_ARANCELARIA_DESCRIPCION } from 'apps/agricultura/src/app/application/core/server/api-router';

@Injectable({
  providedIn: 'root'
})
export class RegistroSolicitudService {
  /**
     * URL base del servidor al que se realizarán las solicitudes relacionadas con aduanas.
     * Esta variable almacena la dirección del host para los servicios compartidos de catálogos.
     * Es de solo lectura y se inicializa en el constructor del servicio.
     */
    host: string;

  constructor(private http: HttpClient) { 
            this.host = `${ENVIRONMENT.API_HOST}/api/`;
    
  }

  /**
     * Obtiene la descripción de la fracción arancelaria para un trámite y clave de fracción dados.
     *
     * @param tramite - El identificador numérico del trámite.
     * @param cveFraccion - La clave de la fracción arancelaria.
     * @returns Un observable con la respuesta base que contiene un arreglo de catálogos.
     */
    obtieneFraccionArancelariaDescripcion(tramite: number, cveFraccion: string): Observable<BaseResponse<FraccionArancelariaDecripcionModel>> {
        const ENDPOINT = `${this.host}${API_GET_SOLICITUDES_FRACCION_ARANCELARIA_DESCRIPCION(tramite.toString(), cveFraccion)}`;
        return this.http.get<BaseResponse<FraccionArancelariaDecripcionModel>>(ENDPOINT);
    }

}
