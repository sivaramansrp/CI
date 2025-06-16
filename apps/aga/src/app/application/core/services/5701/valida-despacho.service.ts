import {
  BodyValidarRFCAutorizacionLDA,
  ValidacionLDAAutorizacionResponse,
} from '../../models/5701/validaciones-depacho.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { API_POST_VALIDA_LDA } from '../../../constantes/5701/api-constants';
import { ENVIRONMENT } from '@libs/shared/data-access-user/src';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidaDespachoService {
  private readonly host: string;

  constructor(private http: HttpClient) {
    this.host = `${ENVIRONMENT.API_HOST}/api/`;
  }

  /**
   * Método para obtener la entidad o persona asociada a un proceso de comercio o negocio que interactúa con el sistema.
   * @param claveSocioComercial Clave del socio comercial a consultar.
   * @returns Observable<CatalogosBooleanResponse> Respuesta del servicio con la información del socio comercial.
   */
  validaRFCAutorizacionLda(
    bodyValidarRFCAutorizacionLda: BodyValidarRFCAutorizacionLDA
  ): Observable<ValidacionLDAAutorizacionResponse> {
    const ENDPOINT = `${this.host}${API_POST_VALIDA_LDA}`;

    return this.http
      .post<ValidacionLDAAutorizacionResponse>(
        ENDPOINT,
        bodyValidarRFCAutorizacionLda
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const MENSAJE_ERROR =
            error.error?.mensaje || `Error al consultar ${ENDPOINT}`;
          console.error(MENSAJE_ERROR);
          return throwError(() => new Error(MENSAJE_ERROR));
        })
      );
  }
}
