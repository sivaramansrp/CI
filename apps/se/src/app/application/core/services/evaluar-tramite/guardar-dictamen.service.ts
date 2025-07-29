import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ENVIRONMENT } from '@libs/shared/data-access-user/src';
import { Observable } from 'rxjs';

import { BaseResponse } from '@libs/shared/data-access-user/src/core/models/5701/base-response.model';
import { GuardarDictamenRequest } from '../../models/request/guardar-dictamen-request.model';

import { API_GET_DICTAMEN, API_POST_GUARDAR_DICTAMEN, IDSOLICITUDDICTAMEN, NUMFOLIOTRAMITE } from '../../../constantes/130118/api-constants';

@Injectable({
  providedIn: 'root'
})
export class GuardarDictamenService {

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
   * Guarda el dictamen del trámite 130118.
   * @param numFolio Número de folio del trámite.
   * @param PAYLOAD Datos del dictamen a guardar.
   * @returns Observable con la respuesta del servidor.
   */
  postGuadarDictamen(numFolio: string, PAYLOAD: GuardarDictamenRequest):
    Observable<BaseResponse<string>> {
    const ENDPOINT = `${this.host}` +
      API_POST_GUARDAR_DICTAMEN.replace(NUMFOLIOTRAMITE, numFolio);

    return this.http.post<BaseResponse<string>>(ENDPOINT, PAYLOAD);
  }


  /**
   * Inicia el dictamen del trámite 130118.
   * @param numFolio Número de folio del trámite.
   * @returns Observable con la respuesta del servidor.
   */
  getCriterios(idSolicitud: string): Observable<BaseResponse<string>> {
    const ENDPOINT = `${this.host}${API_GET_DICTAMEN.replace(IDSOLICITUDDICTAMEN, idSolicitud)}`;
    return this.http.get<BaseResponse<string>>(ENDPOINT);
  }

}
