/* eslint-disable sort-imports */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JSONResponse } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CertificadosLicenciasPermisosService {

  constructor(private http: HttpClient) { 
    //
  }

  public getEstadoDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('assets/json/260303/estado-catalog.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  public getScianDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('assets/json/260303/scian-tabla.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }


  public getClaveDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('assets/json/260303/clave-catalog.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  public getRegimenDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('assets/json/260303/regimen-catalog.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  public getMercanciasDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('assets/json/260303/mercancias-tabla.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  public getTipoDeProductoDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('assets/json/260303/tipo-de-producto-catalog.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  public getPaisDeProcedenciaDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('assets/json/260303/pais-de-procedencia-catalog.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  public getFabricanteDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('assets/json/260303/fabricante-tabla.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  public getFacturadorDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('assets/json/260303/facturador-tabla.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  public getProveedorDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('assets/json/260303/proveedor-tabla.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  public getCertificadoDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('assets/json/260303/certificado-analitico-tabla.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  public getOtrosDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('assets/json/260303/otros-tabla.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  public getBancoDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('assets/json/260303/banco-catalog.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  public getTipoDeDocumentoDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('assets/json/260303/tipo-de-documento.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
