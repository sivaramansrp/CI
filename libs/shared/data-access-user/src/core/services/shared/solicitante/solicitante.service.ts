import { API_GET_IDC_CONTRIBUYENTE, COMUN_URL } from '../../../servers/api-router';
import { Observable, catchError, throwError } from 'rxjs';
import { DatosGeneralesModel } from '../../../models/datos-generales.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JSONResponse } from '../../../models/shared/catalogos.model';
import { RFC_GENERICO } from '../../../constants/constantes-generales';
@Injectable({
  providedIn: 'root',
})
export class SolicitanteService {
  host: string;

  constructor(private http: HttpClient) {
    // Lógica de inicialización si es necesario
    this.host = `${COMUN_URL.BASE_URL}`;
  }

  urlServer = 'https://dev.v30.ultrasist.net/api/json-auxiliar';

  /**
   * Obtiene los datos generales de un contribuyente desde la API.
   * @param {string} rfc - RFC del contribuyente para realizar la consulta.
   * @returns {Observable<DatosGeneralesModel>} - Observable con la respuesta de la API.
   */
  getDatosGeneralesAPI(rfc: string): Observable<DatosGeneralesModel> {
    const ENDPOINT =
      `${this.host}` + API_GET_IDC_CONTRIBUYENTE.replace(RFC_GENERICO, rfc);
    return this.http.get<DatosGeneralesModel>(`${ENDPOINT}`).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  /**
   * Obtiene los datos Generales del Usuario de una API
   * @param {id} - Id del json auxiliar que trae los datos generales del usuario
   * @returns {Observable<JSONResponse>} - Respuesta de la API de tipo observable de tipo JSONResponse.
   */
  getDatosGenerales(id: number): Observable<JSONResponse> {
    return this.http.get<JSONResponse>(`${this.urlServer}/${id}`).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
