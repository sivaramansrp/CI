import { API_GET_VALIDA_RFC, RFC_QUERY } from '../../constants/api-constants';
import { Observable, catchError, map, throwError } from 'rxjs';
import { CatalogosBooleanResponse } from '../../models/shared/catalogo.model';
import { ENVIRONMENT } from '../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidaRfcService {

  private readonly host: string;

  constructor(
    private http: HttpClient
  ) {
    this.host = `${ENVIRONMENT.API_HOST}/api/`;
  }

  /**
   * Método que realiza una validación del RFC (Registro Federal de Contribuyentes) ingresado por el usuario en el formulario.
   * Este método envía una petición al API para verificar si el RFC proporcionado es válido.
   * @param rfc - El RFC a validar.
   */
  getValidacionRfc(rfc: string): Observable<CatalogosBooleanResponse> {
    const ENDPOINT = `${this.host}`+ API_GET_VALIDA_RFC.replace(RFC_QUERY, rfc);

    return this.http.get<CatalogosBooleanResponse>(ENDPOINT).pipe(
      map((response) => {
        return response;
      }),
      catchError(() => {
        const ERROR = new Error(`Ocurrió un error al devolver la información ${ENDPOINT} `);
        return throwError(() => ERROR);
      })
    );
  }
}
