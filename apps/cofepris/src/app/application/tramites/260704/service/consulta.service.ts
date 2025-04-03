import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Catalogo,
  RespuestaCatalogos,
} from '@libs/shared/data-access-user/src';
import { catchError, Observable, throwError } from 'rxjs';
import { ColumnasTabla, ListaClave, Mercancia } from '../models/consulta.model';

@Injectable({
  providedIn: 'root',
})
export class ConsultaService {
  constructor(private http: HttpClient) {}

  obtenerDatosEstado(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/260704/estado.json');
  }
  getScianTabla(): Observable<ColumnasTabla[]> {
    return this.http
      .get<ColumnasTabla[]>('assets/json/260704/clave-scian.json')
      .pipe(
        catchError((error) => {
          // Maneja errores en la solicitud HTTP.
          return throwError(() => error);
        })
      );
  }
  getMercanciasTabla(): Observable<Mercancia[]> {
    return this.http
    .get<Mercancia[]>('assets/json/260704/mercancia-tabla.json')
    .pipe(
      catchError((error) => {
        // Maneja errores en la solicitud HTTP.
        return throwError(() => error);
      })
    );
}
getListaClaveTabla(): Observable<ListaClave[]> {
  return this.http
    .get<ListaClave[]>('assets/json/260704/lista-clave-tabla.json')
    .pipe(
      catchError((error) => {
        // Maneja errores en la solicitud HTTP.
        return throwError(() => error);
      })
    );
}
}
