import { API_GET_EMPRESA, TIPO_PATENTE_QUERY } from '../../../constantes/5701/api-constants';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CLAVE_PATENTE_QUERY, enviroment } from '@libs/shared/data-access-user/src';
import { EmpresaResponse } from '../../models/5701/empresa.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patente } from '../../models/5701/Patente.model';

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
   * Obtiene la lista de empresas asociadas a una patente
   * @param patente Objeto de tipo Patente que contiene la clave y el tipo de patente
   * @returns Observable con la lista de empresas
   */
  getListaEmpresas(patente: Patente): Observable<EmpresaResponse> {
    const ENDPOINT = `${this.host}` + API_GET_EMPRESA.replace(CLAVE_PATENTE_QUERY, patente.patente).replace(TIPO_PATENTE_QUERY, patente.tipo_patente);

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
