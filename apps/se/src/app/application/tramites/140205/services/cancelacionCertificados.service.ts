import {
  CatalogoLista,
  CuposTablaDatos,
  DisponsiblesTablaDatos,
  RespuestaConsulta,
} from '../model/cancelaciones-certificado.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * @file Servicio para la gestión de la cancelación de certificados.
 * @description Este servicio centraliza la obtención de catálogos, tablas y datos
 * relacionados con el trámite de cancelación de certificados de origen.
 */
@Injectable({
  providedIn: 'root',
})
export class CancelacionCertificadosService {
  /**
   * Constructor del servicio.
   *
   * @param http Cliente HTTP para realizar las peticiones a los archivos JSON.
   */
  constructor(private http: HttpClient) {}

  /**
   * Obtiene el catálogo de datos aduaneros.
   *
   * @returns {Observable<CatalogoLista>} Observable con los datos del catálogo aduanero.
   */
  obtenerAduanero(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>('assets/json/140205/aduanero.json');
  }

  /**
   * Obtiene el catálogo de mecanismos.
   *
   * @returns {Observable<CatalogoLista>} Observable con los datos del catálogo de mecanismos.
   */
  obtenerMecanismo(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>('assets/json/140205/aduanero.json');
  }

  /**
   * Obtiene el catálogo de tratados comerciales.
   *
   * @returns {Observable<CatalogoLista>} Observable con los datos del catálogo de tratados.
   */
  obtenerTratado(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>('assets/json/140205/aduanero.json');
  }

  /**
   * Obtiene el catálogo de nombres de productos.
   *
   * @returns {Observable<CatalogoLista>} Observable con los datos del catálogo de productos.
   */
  obtenerNombreProducto(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>('assets/json/140205/aduanero.json');
  }

  /**
   * Obtiene el catálogo de nombres de subproductos.
   *
   * @returns {Observable<CatalogoLista>} Observable con los datos del catálogo de subproductos.
   */
  obtenerNombreSubProducto(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>('assets/json/140205/aduanero.json');
  }

  /**
   * Obtiene el catálogo de datos federales.
   *
   * @returns {Observable<CatalogoLista>} Observable con los datos del catálogo federal.
   */
  obtenerFederal(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>('assets/json/140205/aduanero.json');
  }

  /**
   * Obtiene los datos de la tabla de avisos de cupos.
   *
   * @returns {Observable<CuposTablaDatos>} Observable con los datos de la tabla de cupos.
   */
  obtenerAvisoTabla(): Observable<CuposTablaDatos> {
    return this.http.get<CuposTablaDatos>('assets/json/140205/cupo-tabla.json');
  }

  /**
   * Obtiene los datos de la tabla de avisos disponibles.
   *
   * @returns {Observable<DisponsiblesTablaDatos>} Observable con los datos de la tabla de avisos disponibles.
   */
  obtenerAvisoTabla2(): Observable<DisponsiblesTablaDatos> {
    return this.http.get<DisponsiblesTablaDatos>(
      'assets/json/140205/cupo-disponsible.json'
    );
  }

  /**
   * Obtiene los datos de la consulta del trámite.
   *
   * @returns {Observable<RespuestaConsulta>} Observable con los datos de la consulta de certificado de origen.
   */
  getDatosConsulta(): Observable<RespuestaConsulta> {
    return this.http.get<RespuestaConsulta>(
      'assets/json/140205/consulta_140205.json'
    );
  }
}
