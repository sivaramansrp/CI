import { Observable,catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JSONResponse } from '@libs/shared/data-access-user/src';

@Injectable({
  providedIn: 'root'
})
export class DatosComunesService {

  /**
   * Inicializa una nueva instancia de la clase `DatosComunesService`.
   * 
   * @param http - La instancia de `HttpClient` utilizada para realizar solicitudes HTTP.
   */
  constructor(private http: HttpClient) {
    // Constructor de la clase DatosComunesService
   }

  /**
   * Obtiene los datos productivos desde un archivo JSON local.
   *
   * @returns {Observable<JSONResponse>} Un observable que emite la respuesta JSON que contiene los datos productivos.
   * @throws Propagará cualquier error HTTP encontrado durante la solicitud.
   */
   getProductivoDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('./assets/json/31602/productivo.json').pipe(
        catchError((error) => {
        return throwError(() => error);
      })
    );
   }

  /**
   * Obtiene los datos de servicios AGACE desde un archivo JSON local.
   *
   * @returns {Observable<JSONResponse>} Un observable que emite la respuesta JSON que contiene los datos de servicios AGACE.
   * @throws Propagará cualquier error HTTP encontrado durante la solicitud.
   */
  getServiciosAgaceDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('./assets/json/31602/serviciosAgace.json').pipe(
        catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  /**
   * Obtiene datos desde un archivo JSON ubicado en la ruta especificada y los devuelve como un observable.
   *
   * @returns {Observable<JSONResponse>} Un observable que contiene la respuesta JSON.
   * @throws Propagará cualquier error HTTP encontrado durante la solicitud.
   */
  getTablaDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('./assets/json/31602/mencione-el-nombre.json').pipe(
        catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  /**
   * Obtiene los datos del banco desde un archivo JSON local.
   *
   * @returns {Observable<JSONResponse>} Un observable que emite la respuesta JSON que contiene los datos del banco.
   * @throws Propagará cualquier error HTTP encontrado durante la solicitud.
   */
  getBancoDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('assets/json/31602/banco-catalog.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  /**
   * Recupera los datos del combo de bimestres desde un archivo JSON.
   *
   * @returns Un `Observable` de tipo `JSONResponse` que contiene los datos.
   * @throws Propagará cualquier error HTTP encontrado durante la solicitud.
   */
  getComboBimestres(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('assets/json/31602/combo-bimestres.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  /**
   * Recupera los datos principales de instalaciones desde un archivo JSON local.
   *
   * @returns {Observable<JSONResponse>} Un observable que emite la respuesta JSON.
   * @throws Propagará cualquier error HTTP encontrado durante la solicitud.
   */
  getInstalacionesPrincipalesDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('assets/json/31602/instalacionesPrincipales-tabla.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  /**
   * Recupera los datos de la tabla de control de inventarios desde un archivo JSON local.
   *
   * @returns {Observable<JSONResponse>} Un observable que emite la respuesta JSON que contiene los datos de la tabla de control de inventarios.
   * @throws Propagará cualquier error HTTP encontrado durante la solicitud.
   */
  getControlInventariosTabla(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('assets/json/31602/control-inventarios-tabla.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  /**
   * Recupera datos desde un archivo JSON ubicado en 'assets/json/31602/agregar.json'.
   * Este método realiza una solicitud HTTP GET y devuelve la respuesta como un observable.
   * 
   * @returns {Observable<JSONResponse>} Un observable que contiene la respuesta JSON.
   * @throws Propagará cualquier error encontrado durante la solicitud HTTP.
   */
  getAgregarMiembroTabla(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('assets/json/31602/agregar.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

}
