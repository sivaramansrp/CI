import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JSONResponse } from '../../../models/shared/catalogos.model';

@Injectable({
  providedIn: 'root',
})
export class SolicitanteService {
  constructor(private http: HttpClient) {
    // Lógica de inicialización si es necesario
  }

  urlServer = 'https://dev.v30.ultrasist.net/api/json-auxiliar';

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
