/* eslint-disable sort-imports */
/* eslint-disable @nx/enforce-module-boundaries */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DATOS_GENERALES, REGISTRO_DE_SOLICITUDES_TABLA } from '@libs/shared/data-access-user/src/core/models/6001/registro-cuentas-bancarias.model';
import { JSONResponse } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { enviroment } from '@libs/shared/data-access-user/src/enviroments/enviroment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroCuentasBancariasService {

  urlServer = enviroment.URL_SERVER_JSON_AUXILIAR;


  constructor(private http: HttpClient) {
    //
   }

   public getSolicitudesTabla():Observable<REGISTRO_DE_SOLICITUDES_TABLA[]> {
      return this.http.get<REGISTRO_DE_SOLICITUDES_TABLA[]>('assets/json/6001/registro-de-solicitudes-tabla.json');
   }

   public obtenerDatosDeFormularioDeAPI():Observable<DATOS_GENERALES> {
      return this.http.get<DATOS_GENERALES>('assets/json/6001/respuesta-de-la-api.json');
   }

     /**
   * @description Función para obtener el trámite
   * @param id
   * @returns JSONResponse
   */
  public obtenerTramite(id: number): Observable<JSONResponse> {
    return this.http.get<JSONResponse>(`${this.urlServer}/${id}`).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
