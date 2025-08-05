import { Observable, catchError, throwError } from 'rxjs';
import { API_GET_IDC_CONTRIBUYENTE } from '../../../constants/api-constants';
import { DatosGeneralesModel } from '../../../models/datos-generales.model';
import { ENVIRONMENT } from '../../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RFC_GENERICO } from '../../../constants/constantes-generales';

@Injectable({
  providedIn: 'root',
})
export class SolicitanteService {
  host: string;

  constructor(private http: HttpClient) {
    // Lógica de inicialización si es necesario
    this.host = `${ENVIRONMENT.API_HOST}/api/`;
  }

  /**
   * Obtiene los datos Generales del Usuario de una API
   * @param {id} - Id del json auxiliar que trae los datos generales del usuario
   * @returns {Observable<JSONResponse>} - Respuesta de la API de tipo observable de tipo JSONResponse.
   */
  getDatosGenerales(rfc: string): Observable<DatosGeneralesModel> {
    const ENDPOINT =
      `${this.host}` + API_GET_IDC_CONTRIBUYENTE.replace(RFC_GENERICO, rfc);
    return this.http.get<DatosGeneralesModel>(`${ENDPOINT}`).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
