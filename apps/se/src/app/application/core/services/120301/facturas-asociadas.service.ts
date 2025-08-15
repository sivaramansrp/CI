import { BaseResponse } from '@libs/shared/data-access-user/src/core/models/5701/base-response.model';
import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ENVIRONMENT } from '@libs/shared/data-access-user/src';

import { API_DELETE_FACTURAS_TPL_ELIMINAR, API_GET_FACTURAS_TPL, API_GET_FACTURAS_TPL_ASOCIADAS, API_GET_FACTURAS_TPL_TOTAL_UNIDAD, API_POST_FACTURAS_TPL_ASOCIAR, IDEXPEDICION } from '../../../constantes/120301/api-constantes';
import { FacturaTplAsociadaResponse } from '../../models/120301/response/facturas-tpl-asociada-response.model';
import { FacturasTplAsociadasRequest } from '../../models/120301/request/facturas-tpl-asociadas-request.model';
import { FacturasTplEliminarRequest } from '../../models/120301/request/facturas-tpl-eliminar-request.model';
import { FacturasTplResponse } from '../../models/120301/response/facturas-tpl-response.model';

import { FacturaTotalUnidadResponse } from '../../models/120301/response/facturas-tpl-unidad-total-response.model';


@Injectable({
  providedIn: 'root'
})
export class FacturasAsociadasService {

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
     * Obtiene las facturas TPL.
     * 
     * @param rfc RFC del contribuyente.
     * @param idExpedicion ID de la expedición.
     * @param tipoRegimen Tipo de régimen (ej. "REG.02").
     * @param page Número de página (por defecto 0).
     * @param size Tamaño de página (por defecto 1).
     * @param sort Criterio de ordenamiento.
     * @returns Observable con la respuesta del servidor.
    */
    getFacturasTpl(
    rfc: string,
    idExpedicion: number,
    tipoRegimen: string,
    page: number = 0,
    size: number = 1,
    sort: string = 'asc'
    ): Observable<BaseResponse<FacturasTplResponse>> {
    const ENDPOINT = `${this.host}${API_GET_FACTURAS_TPL}`;

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const params = new HttpParams()
        .set('rfc', rfc)
        .set('idExpedicion', idExpedicion.toString())
        .set('tipoRegimen', tipoRegimen)
        .set('page', page.toString())
        .set('size', size.toString())
        .set('sort', sort);

    return this.http.get<BaseResponse<FacturasTplResponse>>(ENDPOINT, { params });
    }

    /**
     * Asocia facturas TPL.
     *
     * @param PAYLOAD Objeto que contiene los datos necesarios para asociar facturas TPL.
     * @returns Observable que emite la respuesta del servidor con el resultado de la operación.
     */
    postFacturasAsociar(PAYLOAD: FacturasTplAsociadasRequest): Observable<BaseResponse<null>>{
        const ENDPOINT = `${this.host}` + API_POST_FACTURAS_TPL_ASOCIAR;
        return this.http.post<BaseResponse<null>>(ENDPOINT, PAYLOAD);
    }

    /**
     * Consulta de facturas TPL asociadas a una expedición del trámite 120301.
     * 
     * @param idExpedicion Id de expedicion.
     * @param page Número de página para paginación (por defecto 0).
     * @param size Cantidad de elementos por página (por defecto 10).
     * @returns Observable con la respuesta del servidor.
     */
    getFacturasTplAsociadas(
     idExpedicion: number, 
     page: number = 0,
     size: number = 1,
     sort: string = 'asc'): Observable<BaseResponse<FacturaTplAsociadaResponse>>{
       const ENDPOINT = `${this.host}${API_GET_FACTURAS_TPL_ASOCIADAS.replace(IDEXPEDICION, idExpedicion.toString())}`;
       // eslint-disable-next-line @typescript-eslint/naming-convention
       const params = new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString())
        .set('sort', sort);
        return this.http.get<BaseResponse<FacturaTplAsociadaResponse>>(ENDPOINT, { params });
    }

    /**
     * Obtiene el total de unidades por factura TPL para una expedición.
     * 
     * @param idExpedicion Identificador único de la expedición.
     * @returns Observable con la respuesta del servidor que incluye 
     *          el total de unidades agrupadas por factura.
     */
    getFacturaTplTotalUnida(idExpedicion: number): Observable<BaseResponse<FacturaTotalUnidadResponse>>{
       const ENDPOINT = `${this.host}${API_GET_FACTURAS_TPL_TOTAL_UNIDAD.replace(IDEXPEDICION, idExpedicion.toString())}`;
      return this.http.get<BaseResponse<FacturaTotalUnidadResponse>>(ENDPOINT);
    }

    /**
     * Elimina una o más facturas TPL asociadas a una expedición.
     * 
     * @param PAYLOAD Arreglo de objetos con los identificadores de las facturas a eliminar.
     * @returns Observable con la respuesta del servidor que incluye 
     *          el resultado de la operación de eliminación.
   */
    deleteFacturaTpl(PAYLOAD:FacturasTplEliminarRequest[]): Observable<BaseResponse<FacturaTplAsociadaResponse>>{
       const ENDPOINT = `${this.host}` + API_DELETE_FACTURAS_TPL_ELIMINAR;
      return this.http.request<BaseResponse<FacturaTplAsociadaResponse>>('delete', ENDPOINT, {
        body: PAYLOAD
      });
    }
}
