import { CatalogosResponse } from '../../../models/shared/catalogo.model';
import { ENVIRONMENT } from '../../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, catchError, map, throwError } from 'rxjs';

import { API_GET_FRACCION_ARANCELARIA, API_GET_FRACCION_ARANCELARIA_CVE, API_GET_NICO, CVEFRACCION } from '../../../constants/api-constants';

@Injectable({
  providedIn: 'root'
})
export class FraccionArancelariaService {

  /**
   * URL base del servidor al que se realizarán las solicitudes relacionadas con aduanas.
    * Esta variable almacena la dirección del host para los servicios compartidos de catálogos.
    * Es de solo lectura y se inicializa en el constructor del servicio.
    */
  private readonly host: string;

  constructor(private http: HttpClient) {
    this.host = `${ENVIRONMENT.API_HOST}/api/`;
  }


  getFracciones(): Observable<CatalogosResponse> {
    const ENDPOINT = `${this.host}${API_GET_FRACCION_ARANCELARIA}`;

    return this.http.get<CatalogosResponse>(ENDPOINT).pipe(
      map((response) => {
        return response;
      }),
      catchError(() => {
        const ERROR = new Error(
          `Ocurrió un error al devolver la información ${ENDPOINT} `
        );
        return throwError(() => ERROR);
      })
    );
  }


  getFraccionesCve(cveFraccion: string): Observable<CatalogosResponse> {
    const ENDPOINT =
      `${this.host}` +
      API_GET_FRACCION_ARANCELARIA_CVE.replace(CVEFRACCION, cveFraccion);

    return this.http.get<CatalogosResponse>(ENDPOINT).pipe(
      map((response) => {
        return response;
      }),
      catchError(() => {
        const ERROR = new Error(
          `Ocurrió un error al devolver la información ${ENDPOINT} `
        );
        return throwError(() => ERROR);
      })
    );
  }

   getNico(cveFraccion: string): Observable<CatalogosResponse> {
    const ENDPOINT =
      `${this.host}` +
      API_GET_NICO.replace(CVEFRACCION, cveFraccion);

    return this.http.get<CatalogosResponse>(ENDPOINT).pipe(
      map((response) => {
        return response;
      }),
      catchError(() => {
        const ERROR = new Error(
          `Ocurrió un error al devolver la información ${ENDPOINT} `
        );
        return throwError(() => ERROR);
      })
    );
  }

}
