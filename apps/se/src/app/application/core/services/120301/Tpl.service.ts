import { BaseResponse } from '@libs/shared/data-access-user/src/core/models/shared/base-response.model';
import { ENVIRONMENT } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TplRequest } from '../../models/120301/request/tpl-request.model';
import { TplResponse } from '../../models/120301/response/tpl-response.model';

import { API_POST_TPL } from '../../../constantes/120301/api-constantes';

@Injectable({
  providedIn: 'root'
})
export class TplService {

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
   * Envía la solicitud para guardar los datos TPL del trámite 120301.
   * @param PAYLOAD Datos de la solicitud TPL.
   * @returns Observable con la respuesta del servidor.
   */
  posTpl(PAYLOAD: TplRequest): Observable<BaseResponse<TplResponse[]>> {
    const ENDPOINT = `${this.host}` + API_POST_TPL;
    return this.http.post<BaseResponse<TplResponse[]>>(ENDPOINT, PAYLOAD);
  }
}
