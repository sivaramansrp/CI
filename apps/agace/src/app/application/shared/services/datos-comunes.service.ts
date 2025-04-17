import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JSONResponse } from '@libs/shared/data-access-user/src';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosComunesService {

  constructor(private http: HttpClient) {
    // Constructor de la clase DatosComunesService
   }

   getProductivoDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('./assets/json/31602/productivo.json').pipe(
        catchError((error) => {
        return throwError(() => error);
      })
    );
   }

  getServiciosAgaceDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('./assets/json/31602/serviciosAgace.json').pipe(
        catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  getTablaDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('./assets/json/31602/mencione-el-nombre.json').pipe(
        catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  getBancoDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('assets/json/31602/banco-catalog.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  getComboBimestres(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('assets/json/31602/combo-bimestres.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  getInstalacionesPrincipalesDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('assets/json/31602/instalacionesPrincipales-tabla.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  getControlInventariosTabla(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('assets/json/31602/control-inventarios-tabla.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  getAgregarMiembroTabla(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('assets/json/31602/agregar.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

}
