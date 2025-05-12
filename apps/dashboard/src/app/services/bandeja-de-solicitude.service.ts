import { Observable,catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JSONResponse } from '@libs/shared/data-access-user/src';

@Injectable({
  providedIn: 'root'
})
export class BandejaDeSolicitudeService {

  constructor(private http: HttpClient) { }
  /**
  * Recupera los datos del estado desde un archivo JSON local.
  * @returns Un `Observable` de tipo `JSONResponse` que contiene los datos del estado.
  *          Si ocurre un error durante la solicitud HTTP, propagará el error.
  */
  public getSolicitudeTablaDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('assets/json/bandeja-de-solicitude/bandeja-solicitude-tabla.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  public getTareasPendientesTablaDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('assets/json/bandeja-de-tareas-pendientes/de-tareas-pendientes-tabla.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
