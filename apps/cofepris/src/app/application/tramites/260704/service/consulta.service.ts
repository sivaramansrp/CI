import { Asociados, ColumnasTabla, Destinatario, ListaClave, Mercancia} from '../models/consulta.model';
import { Catalogo, RespuestaCatalogos} from '@libs/shared/data-access-user/src';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConsultaService {
  constructor(private http: HttpClient) {
     // Constructor vacío, no requiere inicialización adicional.
  }

  obtenerDatosEstado(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/260704/estado.json');
  }
  obtenerDatosClave(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/260704/clave.json');
  }
  obtenerTablaScian(): Observable<ColumnasTabla[]> {
    return this.http
      .get<ColumnasTabla[]>('assets/json/260704/clave-scian.json')
      .pipe(
        catchError((error) => {
          // Maneja errores en la solicitud HTTP.
          return throwError(() => error);
        })
      );
  }
  obtenerTablaMercancias(): Observable<Mercancia[]> {
    return this.http
      .get<Mercancia[]>('assets/json/260704/mercancia-tabla.json')
      .pipe(
        catchError((error) => {
          // Maneja errores en la solicitud HTTP.
          return throwError(() => error);
        })
      );
  }
  obtenerTablaListaClave(): Observable<ListaClave[]> {
    return this.http
      .get<ListaClave[]>('assets/json/260704/lista-clave-tabla.json')
      .pipe(
        catchError((error) => {
          // Maneja errores en la solicitud HTTP.
          return throwError(() => error);
        })
      );
  }
  obtenerTablaTramites(): Observable<Asociados[]> {
    return this.http
      .get<Asociados[]>('assets/json/260704/asociados-tabla.json')
      .pipe(
        catchError((error) => {
          // Maneja errores en la solicitud HTTP.
          return throwError(() => error);
        })
      );
  }
  obtenerTablaTerceros(): Observable<Destinatario[]> {
    return this.http
      .get<Destinatario[]>('assets/json/260704/terceros-tabla.json')
      .pipe(
        catchError((error) => {
          // Maneja errores en la solicitud HTTP.
          return throwError(() => error);
        })
      );
  }
  obtenerDatosBanco(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/260704/banco.json');
  }

  getDescripcionScian(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(
      'assets/json/260601/descripcion-scian.json'
    );
  }
}
