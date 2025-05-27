import { Observable, catchError, throwError } from 'rxjs';
import { ENVIRONMENT } from '../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {JSONResponse} from '../../models/shared/catalogos.model';

@Injectable({
  providedIn: 'root'
})

/**
 * Este servicio se utiliza para almacenar los datos del formulario del trámite 110101.
 */

export class PantallasSvcService {

  urlServer = ENVIRONMENT.URL_SERVER_JSON_AUXILIAR;
   /**
  * constructor de la clase
  * @param http: constructor de HttpClient
  */
  constructor(private http: HttpClient) {
    // Lógica de inicialización si es necesario
   }

    /**
     * @description Función para obtener el trámite
     * @param id
     * @returns JSONResponse
     */
    obtenerTramite(id: number): Observable<JSONResponse> {
      return this.http.get<JSONResponse>(`${this.urlServer}/${id}`).pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
    }
}
