import { Observable,catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JSONResponse } from '@libs/shared/data-access-user/src';

@Injectable({
  providedIn: 'root'
})
export class TercerosRelacionadosService {

  /**
   * Inicializa una nueva instancia de la clase `TercerosRelacionadosService`.
   * 
   * @param http - Una instancia de `HttpClient` utilizada para realizar solicitudes HTTP.
   */
  constructor(private http: HttpClient) {
    // Constructor de la clase TercerosRelacionadosService
   }

  /**
   * Obtiene los datos del enlace operativo desde un archivo JSON local.
   *
   * @throws Lanzará un error si la solicitud HTTP falla.
   */
  getEnlaceOperativoDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('./assets/json/31602/enlace_tabla.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  /**
   * Obtiene los datos de personas desde un archivo JSON local.
   *
   * @returns Un `Observable` que emite el `JSONResponse` con los datos de personas.
   */
  getPersonasParaDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('./assets/json/31602/personas-tabla.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
