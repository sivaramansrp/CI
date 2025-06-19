import {
  AvisoTablaDatos,
  CatalogoLista,
  DatosSolicitante,
  RespuestaConsulta,
 } from '../models/aviso-traslado.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
/**
 * Servicio para gestionar las operaciones relacionadas con el aviso de traslado.
 *
 * Este servicio proporciona métodos para obtener datos como catálogos, tablas de aviso,
 * tablas de mercancías, y otros datos necesarios para el trámite 32503.
 */
@Injectable({
  providedIn: 'root',
})
export class EntregaActaService {
  /**
   * Constructor del servicio.
   *
   * @param {HttpClient} http - Cliente HTTP para realizar solicitudes a los recursos.
   */
  constructor(private http: HttpClient) {
    // Constructor
  }


  /**
   * Obtiene los datos del solicitante.
   *
   * @returns {Observable<DatosSolicitante>} Un observable con los datos del solicitante.
   */
  obtenerDatosSolicitante(): Observable<DatosSolicitante> {
    return this.http.get<DatosSolicitante>(
      `assets/json/32507/datosSolicitante.json`
    );
  }

  /**
   * Obtiene los datos de la tabla de mercancías.
   *
   * @returns {Observable<MercanciaTablaDatos>} Un observable con los datos de la tabla de mercancías.
   */
  obtenerAvisoTabla(): Observable<AvisoTablaDatos> {
    return this.http.get<AvisoTablaDatos>(`assets/json/32507/aviso-tabla.json`);
  }

  /**
   * Obtiene la lista de entidades federativas.
   *
   * @returns {Observable<CatalogoLista>} Un observable con la lista de entidades federativas.
   */
  obtenerLevantaActa(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>(`assets/json/32507/levanta-acta.json`);
  }

  /**
   * Obtiene la lista de unidades de medida.
   *
   * @returns {Observable<CatalogoLista>} Un observable con la lista de unidades de medida.
   */
  obtenerUnidadMedida(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>(
      `assets/json/32507/entidad-federativa.json`
    );
  }

  /**
   * @method getDatosConsulta
   * @description Obtiene los datos de consulta desde un archivo JSON local.
   * 
   * Este método realiza una solicitud HTTP GET para obtener los datos de consulta simulados desde el archivo `consulta_11201.json`.
   * 
   * @returns {Observable<RespuestaConsulta>} Un observable que emite la respuesta de los datos de consulta.
   */
  getDatosConsulta(): Observable<RespuestaConsulta> {
    return this.http.get<RespuestaConsulta>(`assets/json/32507/consulta_32507.json`);
  }
}
