
import { API_GET_SECCION_ADUANA, CLAVE_ADUANA_QUERY } from '../../../constants/api-constants';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CatalogosResponse } from '../../../models/shared/catalogo.model';
import { enviroment } from '../../../../enviroments/enviroment'
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SeccionAduanaService {

  private readonly host: string;

  constructor(
    private http: HttpClient
  ) {
    this.host = `${enviroment.API_HOST}/api/`;
  }

  /**
   *Obtiene el catalogo de las secciones de aduanas de una aduana en particular de la API `catalogo/aduanas/`
   * @param claveAduana Clave de la aduana a consultar
   * @returns Observable<CatalogosResponse> Respuesta del API `catalogo/aduanas/`
   */
  getListaSeccionesAduanas(claveAduana: string): Observable<CatalogosResponse> {
    const ENDPOINT = `${this.host}` + API_GET_SECCION_ADUANA.replace(CLAVE_ADUANA_QUERY, claveAduana);

    return this.http.get<CatalogosResponse>(ENDPOINT).pipe(
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
