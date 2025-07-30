import { BaseResponse } from '@libs/shared/data-access-user/src/core/models/shared/base-response.model';
import { ENVIRONMENT } from '@libs/shared/data-access-user/src';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_GET_SOLICITUD_DOCUMENTOS,API_GET_TAREAS_DOCUMENTOS,IDSOLICITUD,NUMFOLIOTRAMITE } from '../../../constantes/130118/api-constants';
import { DocumentoSolicitud } from '@libs/shared/data-access-user/src/core/models/130118/consulta-documentos-response.model';
import { TareasSolicitud } from '@libs/shared/data-access-user/src/core/models/130118/consulta-tareas-response.model';
@Injectable({
  providedIn: 'root'
})
export class TabsSolicitudServiceTsService {

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
   * Consulta los documentos de la solicitud del trámite 130118.
   * @param idSolicitud ID de solicitud.
   * @returns Observable con la respuesta del servidor.
  */
  getDocumentosSolicitud(idSolicitud: string): Observable<BaseResponse<DocumentoSolicitud[]>> {
    const ENDPOINT = `${this.host}${API_GET_SOLICITUD_DOCUMENTOS.replace(IDSOLICITUD, idSolicitud)}`;
    return this.http.get<BaseResponse<DocumentoSolicitud[]>>(ENDPOINT);
  }

  /**
   * Consulta las tareas de la solicitud del trámite 130118.
   * @param numFolioTramite Número de folio del trámite.
   * @returns Observable con la respuesta del servidor.
  */
  getTareasSolicitud(numFolioTramite: string): Observable<BaseResponse<TareasSolicitud[]>> {
    const ENDPOINT = `${this.host}${API_GET_TAREAS_DOCUMENTOS.replace(NUMFOLIOTRAMITE, numFolioTramite)}`;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const params = new HttpParams().set('esFuncionario', 'true');

    return this.http.get<BaseResponse<TareasSolicitud[]>>(ENDPOINT,{params});
  }
}
