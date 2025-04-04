import { Observable,catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JSONResponse } from '@libs/shared/data-access-user/src';
import { enviroment } from '@libs/shared/data-access-user/src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CertificadosLicenciasService {

  urlServer = enviroment.URL_SERVER_JSON_AUXILIAR;
  
  constructor(private http: HttpClient ) { }

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

  getBancoDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('./assets/json/260701/banco-catalog.json');
  }

  getTramitesAsociados(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('./assets/json/260701/tramites-asociados-tabla.json');
  }

  getDestinatarioDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('./assets/json/260701/destinatario-tabla.json');
  }

  getFabricanteDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('./assets/json/260701/fabricante-tabla.json');
  }

  getEstadoCatalogo(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('./assets/json/260701/estado-catalog.json');
  }

  getScianTablaDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('./assets/json/260701/scian-tabla.json');
  }

  getMercanciasTablaDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('./assets/json/260701/mercancias-tabla.json');
  }

  getListaClaveTablaDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('./assets/json/260701/lista-claves.json');
  }

}
