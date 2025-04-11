import { Asociados, ColumnasTabla, Destinatario, ListaClave, Mercancia } from '../models/consulta.model';
import { Catalogo, RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Servicio de consulta para obtener datos y tablas relacionados con el trámite 260704.
 *
 * Este servicio se encarga de realizar solicitudes HTTP para obtener:
 * - Datos de catálogos (estado, clave, banco, etc.).
 * - Tablas de datos (SCIAN, mercancías, lista clave, trámites asociados y terceros).
 * - Descripción del SCIAN.
 *
 * Los métodos retornan Observables tipados, y manejan errores mediante catchError.
 */
@Injectable({
  providedIn: 'root',
})
export class ConsultaService {
  /**
   * Constructor que inyecta el HttpClient para realizar solicitudes HTTP.
   * @param http Instancia de HttpClient.
   */
  constructor(private http: HttpClient) {
    // Constructor vacío, no requiere inicialización adicional.
  }

  /**
   * Obtiene el catálogo de estados.
   * @returns Observable que emite un arreglo de Catalogo.
   */
  obtenerDatosEstado(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/260704/estado.json');
  }

  /**
   * Obtiene el catálogo de claves.
   * @returns Observable que emite un arreglo de Catalogo.
   */
  obtenerDatosClave(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/260704/clave.json');
  }

  /**
   * Obtiene la tabla SCIAN.
   * @returns Observable que emite un arreglo de ColumnasTabla.
   */
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

  /**
   * Obtiene la tabla de mercancías.
   * @returns Observable que emite un arreglo de Mercancia.
   */
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

  /**
   * Obtiene la tabla de lista clave.
   * @returns Observable que emite un arreglo de ListaClave.
   */
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

  /**
   * Obtiene la tabla de trámites asociados.
   * @returns Observable que emite un arreglo de Asociados.
   */
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

  /**
   * Obtiene la tabla de terceros.
   * @returns Observable que emite un arreglo de Destinatario.
   */
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

  /**
   * Obtiene el catálogo de bancos.
   * @returns Observable que emite un arreglo de Catalogo.
   */
  obtenerDatosBanco(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/260704/banco.json');
  }

  /**
   * Obtiene la descripción SCIAN.
   * @returns Observable que emite un objeto RespuestaCatalogos con la descripción del SCIAN.
   */
  getDescripcionScian(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/260601/descripcion-scian.json');
  }
}
