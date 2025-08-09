import { API_GET_INICIAR_CONFIRMACION_NOTIFICACION, NUMFOLIOTRAMITE } from '../../../constantes/130118/api-constants';
import { BaseResponse } from '@libs/shared/data-access-user/src/core/models/5701/base-response.model';
import { ConfirmarNotificacionIniciarResponse } from '../../models/confirmar-notificacion/response/confirmar-notificacion-iniciar-response.model';
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

}
