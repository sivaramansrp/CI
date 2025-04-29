import { catchError, map, Observable, throwError } from 'rxjs';
import { API_GET_EMPRESA } from '../../../shared/constants/api-constants';
import { EmpresaResponse } from '../../models/5701/empresa.model';
import { enviroment } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PatenteEmpresaService {

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
   * @returns Observable con la lista de empresas
   */
  getListaEmpresas(): Observable<EmpresaResponse> {
    const ENDPOINT = `${this.host}`+API_GET_EMPRESA;

    return this.http.get<EmpresaResponse>(ENDPOINT).pipe(
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
