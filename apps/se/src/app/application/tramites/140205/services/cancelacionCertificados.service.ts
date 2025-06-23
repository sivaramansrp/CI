import { CatalogoLista, CuposTablaDatos } from '../model/cancelaciones-certificado.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


/**
 * @file Servicio para la gestión de la cancelación de certificados.
 * @description Este servicio incluye métodos para obtener datos, seleccionar y deseleccionar elementos,
 * actualizar tablas, manejar diálogos y validar entradas.
 */

/**
 * @description Servicio para la cancelación de certificados.
 * Proporciona métodos para interactuar con los datos necesarios para los trámites de cancelación.
 */
@Injectable({
  providedIn: 'root'
})
export class CancelacionCertificadosService {
  /**
   * @description Notificador para destruir las suscripciones y evitar fugas de memoria.
   */
  constructor(private http: HttpClient) { }

  /**
   * @description Obtiene el catálogo de datos aduaneros.
   * @returns {Observable<CatalogoLista>} Observable con los datos del catálogo aduanero.
   */
  obtenerAduanero(): Observable<CatalogoLista> {
    return this.http
      .get<CatalogoLista>('assets/json/140205/aduanero.json');
  }

  /**
   * @description Obtiene el catálogo de mecanismos.
   * @returns {Observable<CatalogoLista>} Observable con los datos del catálogo de mecanismos.
   */
  obtenerMecanismo(): Observable<CatalogoLista> {
    return this.http
      .get<CatalogoLista>('assets/json/140205/aduanero.json');
  }

  /**
   * @description Obtiene el catálogo de tratados.
   * @returns {Observable<CatalogoLista>} Observable con los datos del catálogo de tratados.
   */
  obtenerTratado(): Observable<CatalogoLista> {
    return this.http
      .get<CatalogoLista>('assets/json/140205/aduanero.json');
  }

  /**
   * @description Obtiene el catálogo de nombres de productos.
   * @returns {Observable<CatalogoLista>} Observable con los datos del catálogo de nombres de productos.
   */
  obtenerNombreProducto(): Observable<CatalogoLista> {
    return this.http
      .get<CatalogoLista>('assets/json/140205/aduanero.json');
  }
 
  /**
   * @description Obtiene el catálogo de nombres de subproductos.
   * @returns {Observable<CatalogoLista>} Observable con los datos del catálogo de nombres de subproductos.
   */
  obtenerNombreSubProducto(): Observable<CatalogoLista> {
    return this.http
      .get<CatalogoLista>('assets/json/140205/aduanero.json');
  }
 
  /**
   * @description Obtiene el catálogo de datos federales.
   * @returns {Observable<CatalogoLista>} Observable con los datos del catálogo federal.
   */
  obtenerFederal(): Observable<CatalogoLista> {
    return this.http
      .get<CatalogoLista>('assets/json/140205/aduanero.json');
  }

  /**
   * @description Obtiene los datos de la tabla de avisos de cupos.
   * @returns {Observable<CuposTablaDatos>} Observable con los datos de la tabla de avisos.
   */
  obtenerAvisoTabla(): Observable<CuposTablaDatos> {
    return this.http.get<CuposTablaDatos>(`assets/json/140205/cupo-tabla.json`);
  }
}