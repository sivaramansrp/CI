import { API_GET_DESCARGAR_DOCUMENTOS, COMUN_URL, DOCUMENTOMINIO } from '../../servers/api-router';
import { BaseResponse } from '../../models/shared/base-response.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TabDocumentosDescarga } from '../../models/shared/documentos-request.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentosTabsService {

  /**
   * URL base del servicio
   */
  private readonly host: string;

  /**
   * Constructor del servicio AcuseDetalleService
   * @param http HttpClient para realizar peticiones HTTP
   */
  constructor(private http: HttpClient) {
    this.host = `${COMUN_URL.BASE_URL}`;
  }

  /**
   * Consulta para base64 de descarga de documentos en pestañas
   * @param documentoMinio  Valor de descarga
   * @returns Observable con la respuesta del servidor
 */
  getDescargarDoc(documentoMinio: string): Observable<BaseResponse<TabDocumentosDescarga>> {
    const ENDPOINT = `${this.host}${API_GET_DESCARGAR_DOCUMENTOS.replace(DOCUMENTOMINIO, documentoMinio)}`;
    return this.http.get<BaseResponse<TabDocumentosDescarga>>(ENDPOINT);
  }
}
