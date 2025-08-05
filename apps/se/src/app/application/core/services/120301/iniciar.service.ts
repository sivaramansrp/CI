import { BaseResponse } from '@libs/shared/data-access-user/src/core/models/shared/base-response.model';
import { ENVIRONMENT } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { IniciarRequest } from '../../models/130118/request/iniciar-request.model';
import { IniciarResponse } from '../../models/120301/response/iniciar-response.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_POST_INICIO } from '../../../constantes/120301/api-constantes';

@Injectable({
  providedIn: 'root'
})
export class IniciarService {

  /**
    * URL del servidor donde se encuentra la API.
    */
  private readonly host: string;

  /**
   * Constructor del servicio IniciarService.
   * @param http - Cliente HTTP para realizar solicitudes al servidor.
   */
  constructor(private http: HttpClient) {
    this.host = `${ENVIRONMENT.API_HOST}/api/`;
  }

  /**
   * Envía la solicitud para iniciar el trámite 120301.
   * @param PAYLOAD Datos de la solicitud para iniciar el trámite.
   * @returns Observable con la respuesta del servidor.
   */
  postIniciar(PAYLOAD: IniciarRequest): Observable<BaseResponse<IniciarResponse>> {
    const ENDPOINT = `${this.host}` + API_POST_INICIO;
    return this.http.post<BaseResponse<IniciarResponse>>(ENDPOINT, PAYLOAD);
  }
}
