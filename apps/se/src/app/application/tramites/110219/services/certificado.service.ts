import { ColumnasTabla, MercanciaCertificado} from '../models/certificado.model';
import { Observable, catchError, throwError } from 'rxjs';
import { Catalogo} from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
/**
 * Servicio para gestionar las operaciones relacionadas con los certificados.
 */
@Injectable({
  providedIn: 'root',
})
export class CertificadoService {
  /**
   * Constructor del servicio.
   * 
   * @param http Cliente HTTP para realizar solicitudes a servicios externos.
   */
  constructor(private http: HttpClient) {}

  /**
   * Obtiene los datos del catálogo de tratados.
   * 
   * @returns Un observable que emite una lista de catálogos de tratados.
   */
  getTratadoData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/110219/tratado.json');
  }

  /**
   * Obtiene los datos de la tabla de solicitudes.
   * 
   * @returns Un observable que emite una lista de columnas de la tabla de solicitudes.
   */
  public getSolicitudesTabla(): Observable<ColumnasTabla[]> {
    return this.http
      .get<ColumnasTabla[]>('assets/json/110219/mercanciaTable.json')
      .pipe(
        catchError((error) => {
          // Maneja errores en la solicitud HTTP.
          return throwError(() => error);
        })
      );
  }

  /**
   * Obtiene los datos de la tabla de mercancías asociadas al certificado.
   * 
   * @returns Un observable que emite una lista de mercancías asociadas al certificado.
   */
  public getMercanciaCertificadoTabla(): Observable<MercanciaCertificado[]> {
    return this.http
      .get<MercanciaCertificado[]>(
        'assets/json/110219/mercanciaCertificado.json'
      )
      .pipe(
        catchError((error) => {
          // Maneja errores en la solicitud HTTP.
          return throwError(() => error);
        })
      );
  }
}