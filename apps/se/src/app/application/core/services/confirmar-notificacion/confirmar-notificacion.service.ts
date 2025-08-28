import { API_GET_INICIAR_CONFIRMACION_NOTIFICACION, API_POST_REQUERIMIENTO_GUARDAR, API_POST_RESOLUCION_GUARDAR, IDREQUERIMIENTO, IDRESOLUCION, NUMFOLIOTRAMITE, TRAMITE } from '../../../constantes/130118/api-constants';
import { BaseResponse } from '@libs/shared/data-access-user/src/core/models/5701/base-response.model';
import { ConfirmarNotificacionIniciarResponse } from '../../models/confirmar-notificacion/response/confirmar-notificacion-iniciar-response.model';
import { DocumentoOficialResponse } from '../../models/autorizar-requerimiento/response/oficio-autorizacion-response.model';
import { ENVIRONMENT } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmarNotificacionService {

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
   * Método para iniciar la confirmación de notificación.
   * @param numFolio Número de folio del trámite.
   * @returns Observable que emite la respuesta del servidor con el número de folio de la notificación.
   */
  getIniciarNotificacion(numFolio: string): Observable<BaseResponse<ConfirmarNotificacionIniciarResponse>> {
    const ENDPOINT = `${this.host}${API_GET_INICIAR_CONFIRMACION_NOTIFICACION.replace(NUMFOLIOTRAMITE, numFolio)}`;
    return this.http.get<BaseResponse<ConfirmarNotificacionIniciarResponse>>(ENDPOINT);
  }

  /** 
   * Genera documento de resolución
   * @param tramite - Número de trámite asociado
   * @param idResolucion - ID de la resolucion a autorizar
   * @returns Observable con la respuesta del documento generado
  */
  postResolucionGuardar(tramite: number, idResolucion: number): Observable<BaseResponse<DocumentoOficialResponse>>{
    const ENDPOINT = `${this.host}${API_POST_RESOLUCION_GUARDAR.replace(TRAMITE, tramite.toString()).replace(IDRESOLUCION, idResolucion.toString())}`;
    return this.http.post<BaseResponse<DocumentoOficialResponse>>(ENDPOINT, null);
  }

  /** 
   * Genera documento de requerimiento
   * @param tramite - Número de trámite asociado
   * @param idRequerimiento - ID de la resolucion a autorizar
   * @returns Observable con la respuesta del documento generado
  */
  postRequerimientoGuardar(tramite: number, idRequerimiento: number): Observable<BaseResponse<DocumentoOficialResponse>>{
    const ENDPOINT = `${this.host}${API_POST_REQUERIMIENTO_GUARDAR.replace(TRAMITE, tramite.toString()).replace(IDREQUERIMIENTO, idRequerimiento.toString())}`;
    return this.http.post<BaseResponse<DocumentoOficialResponse>>(ENDPOINT, null);
  }
}
