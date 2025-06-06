import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CatalogosBooleanResponse, ENVIRONMENT } from '@libs/shared/data-access-user/src';
import { catchError, map, Observable, throwError } from 'rxjs';
import { DocumentosRequest } from '../../../../../../../../../libs/shared/data-access-user/src/core/models/shared/documentos-request.model';
import { BaseResponse } from '../../../models/5701/base-response.model';
import { FirmarRequest } from '../../../models/5701/firmar-request-model';


@Injectable({
  providedIn: 'root'
})
export class DocumentosService {

  urlServer = ENVIRONMENT.API_HOST;

  constructor(public http: HttpClient) { }


  /**
 * Envía una solicitud de firma para un trámite específico.
 *
 * @param body Objeto de tipo `FirmarRequest` que contiene los datos necesarios para firmar el trámite.
 * @returns Un `Observable` de tipo `BaseResponse` que contiene el resultado de la operación.
 */
  enviarFirma(body: FirmarRequest): Observable<BaseResponse> {
    return this.http.post<BaseResponse>(`${this.urlServer}/api/tramite/firmar`, body);
  }

}
