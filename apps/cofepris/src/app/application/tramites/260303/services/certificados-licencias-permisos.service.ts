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
}
