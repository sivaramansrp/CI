/**
 * retorno-importacion-temporal.service.ts
 * servicio para gestionar solicitudes relacionadas con el trámite 630307.
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Catalogo } from '@libs/shared/data-access-user/src';
/**
 * Servicio que gestiona las solicitudes relacionadas con el trámite 630307.
 * Proporciona métodos para obtener datos desde archivos JSON locales, como aduanas, prórrogas, propietarios y tipos de propietarios.
 */
@Injectable({
  providedIn: 'root',
})
export class RetornoImportacionTemporalService {
  /**
   * Constructor del servicio.
   * 
   * @param {HttpClient} http - Cliente HTTP para realizar solicitudes.
   */
  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista de secciones aduaneras desde un archivo JSON local.
   * 
   * @returns {Observable<Catalogo[]>} Observable que emite un arreglo de objetos tipo Catalogo.
   */
  getSeccionAduanera(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('/assets/json/630307/seccion-aduanera.json');
  }

  /**
   * Obtiene la lista de aduanas de ingreso desde un archivo JSON local.
   * 
   * @returns {Observable<Catalogo[]>} Observable que emite un arreglo de objetos tipo Catalogo.
   */
  getAduanaDeIngreso(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('/assets/json/630307/aduana-de-ingreso.json');
  }

  /**
   * Obtiene la lista de prórrogas desde un archivo JSON local.
   * 
   * @returns {Observable<Catalogo[]>} Observable que emite un arreglo de objetos tipo Catalogo.
   */
  getProrroga(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('/assets/json/630307/prorroga.json');
  }

  /**
   * Obtiene la lista de propietarios desde un archivo JSON local.
   * 
   * @returns {Observable<Catalogo[]>} Observable que emite un arreglo de objetos tipo Catalogo.
   */
  getPropietario(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('/assets/json/630307/propietario.json');
  }

  /**
   * Obtiene la lista de tipos de propietarios desde un archivo JSON local.
   * 
   * @returns {Observable<Catalogo[]>} Observable que emite un arreglo de objetos tipo Catalogo.
   */
  getTipoDePropietario(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('/assets/json/630307/tipo-de-propietario.json');
  }
  /**
   * Obtiene la lista de países desde un archivo JSON local.
   **/

  getPais(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('/assets/json/630307/pais.json');
  }
}