import { BaseResponse } from '@libs/shared/data-access-user/src/core/models/shared/base-response.model';
import { ENVIRONMENT } from '@libs/shared/data-access-user/src';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_GET_ACUSES_RESOLUCION, API_GET_DICTAMENES, API_GET_REQUERIMIENTOS, API_GET_SOLICITUD_DOCUMENTOS, API_GET_TAREAS_DOCUMENTOS, IDSOLICITUD, NUMFOLIOTRAMITE, TRAMITE } from '../../../constantes/130118/api-constants';
import { AcusesResolucionResponse } from '@libs/shared/data-access-user/src/core/models/130118/consulta-acuses-response.model';
import { DictamenesResponse } from '@libs/shared/data-access-user/src/core/models/130118/dictamenes-response.model';
import { DocumentoSolicitud } from '@libs/shared/data-access-user/src/core/models/130118/consulta-documentos-response.model';
import { RequerimientosResponse } from '@libs/shared/data-access-user/src/core/models/130118/requerimientos-response.model';
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
   * 
   * @param tramite Numero del tramite.
   * @param idSolicitud ID de solicitud.
   * @returns Observable con la respuesta del servidor.
  */
  getDocumentosSolicitud(tramite: number, idSolicitud: string): Observable<BaseResponse<DocumentoSolicitud[]>> {
    const ENDPOINT = `${this.host}${API_GET_SOLICITUD_DOCUMENTOS.replace(TRAMITE, tramite.toString()).replace(IDSOLICITUD, idSolicitud)}`;
    return this.http.get<BaseResponse<DocumentoSolicitud[]>>(ENDPOINT);
  }

  /**
   * Consulta las tareas de la solicitud del trámite 130118.
   * 
   * @param tramite Numero del tramite.
   * @param numFolioTramite Número de folio del trámite.
   * @returns Observable con la respuesta del servidor.
  */
  getTareasSolicitud(tramite: number, numFolioTramite: string): Observable<BaseResponse<TareasSolicitud[]>> {
    const ENDPOINT = `${this.host}${API_GET_TAREAS_DOCUMENTOS.replace(TRAMITE, tramite.toString()).replace(NUMFOLIOTRAMITE, numFolioTramite)}`;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const params = new HttpParams().set('esFuncionario', 'true');

    return this.http.get<BaseResponse<TareasSolicitud[]>>(ENDPOINT, { params });
  }

  /**
   * Consulta los acuses de resolución del trámite 130118.
   * 
   * @param tramite Numero del tramite.
   * @param numFolioTramite Número de folio del trámite.
   * @returns Observable con la respuesta del servidor.
   */
  getAcusesResolucion(tramite: number, numFolioTramite: string): Observable<BaseResponse<AcusesResolucionResponse>> {
    const ENDPOINT = `${this.host}${API_GET_ACUSES_RESOLUCION.replace(TRAMITE, tramite.toString()).replace(NUMFOLIOTRAMITE, numFolioTramite)}`;
    return this.http.get<BaseResponse<AcusesResolucionResponse>>(ENDPOINT);
  }

  /**
   * Consulta los requerimientos asociados al trámite 130118.
   * 
   * @param tramite Numero del tramite.
   * @param numFolioTramite Número de folio del trámite.
   * @returns Observable con la respuesta del servidor.
   */
  getRequerimientos(tramite: number, numFolioTramite: string): Observable<BaseResponse<RequerimientosResponse[]>> {
     const ENDPOINT = `${this.host}${API_GET_REQUERIMIENTOS.replace(TRAMITE, tramite.toString()).replace(NUMFOLIOTRAMITE, numFolioTramite)}`;
    return this.http.get<BaseResponse<RequerimientosResponse[]>>(ENDPOINT);
  }

  /**
   * Consulta los dictámenes asociados al trámite 130118.
   *
   * @param tramite Numero del tramite.
   * @param numFolioTramite Número de folio del trámite.
   * @returns Observable con la respuesta del servidor.
   */
  getDictamenes(tramite: number, numFolioTramite: string): Observable<BaseResponse<DictamenesResponse[]>> {
     const ENDPOINT = `${this.host}${API_GET_DICTAMENES.replace(TRAMITE, tramite.toString()).replace(NUMFOLIOTRAMITE, numFolioTramite)}`;
    return this.http.get<BaseResponse<DictamenesResponse[]>>(ENDPOINT);
  }
}
