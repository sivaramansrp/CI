import { JSONResponse, RespuestaCatalogos } from '../../models/shared/catalogos.model';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ENVIRONMENT } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})

/**
 * Este servicio se utiliza para almacenar los datos del formulario del trámite 90201.
 */

export class ExpansionDeProductoresService {

  urlServer = ENVIRONMENT.URL_SERVER_JSON_AUXILIAR;
   /**
  * constructor de la clase
  * @param http: constructor de HttpClient
  */
  constructor(private http: HttpClient) {
    // Lógica de inicialización si es necesario
   }


  getSectorCatalog(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/90201/sector.json');
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
