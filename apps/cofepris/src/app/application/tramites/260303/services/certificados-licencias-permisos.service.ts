import { Observable,catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JSONResponse } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';

@Injectable({
  providedIn: 'root'
})
export class CertificadosLicenciasPermisosService {

  /**
   * Constructor del servicio para manejar solicitudes HTTP relacionadas con 
   * certificados, licencias y permisos.
   * 
   * @param http - La instancia de HttpClient utilizada para realizar operaciones HTTP.
   */
  constructor(private http: HttpClient) { 
    //
  }

  /**
   * Recupera los datos del estado desde un archivo JSON local.
   * @returns Un `Observable` de tipo `JSONResponse` que contiene los datos del estado.
   *          Si ocurre un error durante la solicitud HTTP, propagará el error.
   */
  public getEstadoDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('assets/json/260303/estado-catalog.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  /**
   * Recupera los datos del estado desde un archivo JSON local.
   * @returns Un `Observable` de tipo `JSONResponse` que contiene los datos del estado.
   *          Si ocurre un error durante la solicitud HTTP, propagará el error.
   */
  public getScianDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('assets/json/260303/scian-tabla.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  /**
   * Recupera los datos del estado desde un archivo JSON local.
   * @returns Un `Observable` de tipo `JSONResponse` que contiene los datos del estado.
   *          Si ocurre un error durante la solicitud HTTP, propagará el error.
   */
  public getClaveDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('assets/json/260303/clave-catalog.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

    /**
   * Recupera los datos del estado desde un archivo JSON local.
   * @returns Un `Observable` de tipo `JSONResponse` que contiene los datos del estado.
   *          Si ocurre un error durante la solicitud HTTP, propagará el error.
   */
  public getRegimenDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('assets/json/260303/regimen-catalog.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

    /**
   * Recupera los datos del estado desde un archivo JSON local.
   * @returns Un `Observable` de tipo `JSONResponse` que contiene los datos del estado.
   *          Si ocurre un error durante la solicitud HTTP, propagará el error.
   */
  public getMercanciasDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('assets/json/260303/mercancias-tabla.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

    /**
   * Recupera los datos del estado desde un archivo JSON local.
   * @returns Un `Observable` de tipo `JSONResponse` que contiene los datos del estado.
   *          Si ocurre un error durante la solicitud HTTP, propagará el error.
   */
  public getTipoDeProductoDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('assets/json/260303/tipo-de-producto-catalog.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  /**
   * Recupera los datos del estado desde un archivo JSON local.
   * @returns Un `Observable` de tipo `JSONResponse` que contiene los datos del estado.
   *          Si ocurre un error durante la solicitud HTTP, propagará el error.
   */
  public getPaisDeProcedenciaDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('assets/json/260303/pais-de-procedencia-catalog.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  /**
   * Recupera los datos del estado desde un archivo JSON local.
   * @returns Un `Observable` de tipo `JSONResponse` que contiene los datos del estado.
   *          Si ocurre un error durante la solicitud HTTP, propagará el error.
   */
  public getFabricanteDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('assets/json/260303/fabricante-tabla.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  /**
   * Recupera los datos del estado desde un archivo JSON local.
   * @returns Un `Observable` de tipo `JSONResponse` que contiene los datos del estado.
   *          Si ocurre un error durante la solicitud HTTP, propagará el error.
   */
  public getFacturadorDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('assets/json/260303/facturador-tabla.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  /**
   * Recupera los datos del estado desde un archivo JSON local.
   * @returns Un `Observable` de tipo `JSONResponse` que contiene los datos del estado.
   *          Si ocurre un error durante la solicitud HTTP, propagará el error.
   */
  public getProveedorDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('assets/json/260303/proveedor-tabla.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  /**
   * Recupera los datos del estado desde un archivo JSON local.
   * @returns Un `Observable` de tipo `JSONResponse` que contiene los datos del estado.
   *          Si ocurre un error durante la solicitud HTTP, propagará el error.
   */
  public getCertificadoDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('assets/json/260303/certificado-analitico-tabla.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  /**
   * Recupera los datos del estado desde un archivo JSON local.
   * @returns Un `Observable` de tipo `JSONResponse` que contiene los datos del estado.
   *          Si ocurre un error durante la solicitud HTTP, propagará el error.
   */
  public getOtrosDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('assets/json/260303/otros-tabla.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

    /**
   * Recupera los datos del estado desde un archivo JSON local.
   * @returns Un `Observable` de tipo `JSONResponse` que contiene los datos del estado.
   *          Si ocurre un error durante la solicitud HTTP, propagará el error.
   */
  public getBancoDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('assets/json/260303/banco-catalog.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

    /**
   * Recupera los datos del estado desde un archivo JSON local.
   * @returns Un `Observable` de tipo `JSONResponse` que contiene los datos del estado.
   *          Si ocurre un error durante la solicitud HTTP, propagará el error.
   */
  public getTipoDeDocumentoDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('assets/json/260303/tipo-de-documento.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
