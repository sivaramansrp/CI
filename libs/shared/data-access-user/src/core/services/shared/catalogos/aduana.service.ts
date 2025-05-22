import { catchError, map, Observable, throwError } from 'rxjs';
import { API_GET_ADUANA } from '../../../constants/api-constants';
import { CatalogosResponse } from '../../../models/shared/catalogo.model';
import { enviroment } from '../../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AduanaService {
  private readonly host: string;

  constructor(private http: HttpClient) {
    this.host = `${enviroment.API_HOST}/api/`;
  }

  /**
   *Obtiene el catalogo de aduanas
   * @returns {Observable<CatalogosResponse>} Observable con la respuesta del servicio
   */
  getListaAduanas(): Observable<CatalogosResponse> {
    const ENDPOINT = `${this.host}` + API_GET_ADUANA;

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
