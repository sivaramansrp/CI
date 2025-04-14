import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JSONResponse } from '@libs/shared/data-access-user/src';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TercerosRelacionadosService {

  constructor(private http: HttpClient) {
    // Constructor de la clase TercerosRelacionadosService
   }

  getEnlaceOperativoDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('./assets/json/31602/enlace_tabla.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  getPersonasParaDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('./assets/json/31602/personas-tabla.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
