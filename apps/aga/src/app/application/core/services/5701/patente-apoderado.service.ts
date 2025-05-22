import { API_GET_PATENTE_APODERADO, RFC_QUERY } from '../../../constantes/5701/api-constants';
import { catchError, map, Observable, throwError } from 'rxjs';
import { enviroment } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PatenteApoderadoResponse } from '../../models/5701/Patente.model';

@Injectable({
  providedIn: 'root',
})
export class PatenteApoderadoService {
  
  private readonly host: string;

  constructor(
    private http: HttpClient
  ) {
    this.host = `${enviroment.API_HOST}/api/`;
  }

  /**
   * Obtiene el identificador único asociado a un agente aduanal,
   * apoderado o empresa que realiza operaciones de comercio exterior.
   * Este identificador es utilizado para representar la autorización o registro de una persona o
   * entidad para realizar actividades relacionadas con la importación o exportación de mercancías.
   *
   * En algunos escenarios puede devolver más de un registro.
   *
   * @param rfcApoderado - El RFC del apoderado.
   * @returns Observable con la lista de patentes asociadas.
   */
  getListaPatentesApoderado(rfcApoderado: string): Observable<PatenteApoderadoResponse> {
    const ENDPOINT = `${this.host}`+API_GET_PATENTE_APODERADO.replace(RFC_QUERY, rfcApoderado);

    return this.http.get<PatenteApoderadoResponse>(ENDPOINT).pipe(
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
