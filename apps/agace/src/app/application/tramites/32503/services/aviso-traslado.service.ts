import { AvisoTablaDatos, CatalogoLista,DatosSolicitante, MercanciaTablaDatos } from '../models/aviso-traslado.model';
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
  providedIn: 'root'
})
export class AvisoTrasladoService {
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
    return this.http.get<DatosSolicitante>(`assets/json/32503/datosSolicitante.json`);
  }
  /**
   * Obtiene los datos de la tabla de mercancías.
   * 
   * @returns {Observable<MercanciaTablaDatos>} Un observable con los datos de la tabla de mercancías.
   */
  obtenerMercanciaTabla(): Observable<MercanciaTablaDatos> {
    return this.http.get<MercanciaTablaDatos>(`assets/json/32503/mercancia-tabla.json`);
  }
  /**
   * Obtiene los datos de la tabla de aviso.
   * 
   * @returns {Observable<AvisoTablaDatos>} Un observable con los datos de la tabla de aviso.
   */
  obtenerAvisoTabla(): Observable<AvisoTablaDatos> {
    return this.http.get<AvisoTablaDatos>(`assets/json/32503/aviso-tabla.json`);
  }
  /**
   * Obtiene la lista de colonias.
   * 
   * @returns {Observable<CatalogoLista>} Un observable con la lista de colonias.
   */
  obtenerColonias(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>(`assets/json/32503/entidad-federativa.json`);
  }
  /**
   * Obtiene la lista de municipios.
   * 
   * @returns {Observable<CatalogoLista>} Un observable con la lista de municipios.
   */
  obtenerMunicipio(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>(`assets/json/32503/entidad-federativa.json`);
  }
  /**
   * Obtiene la lista de entidades federativas.
   * 
   * @returns {Observable<CatalogoLista>} Un observable con la lista de entidades federativas.
   */
  obtenerFederativa(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>(`assets/json/32503/entidad-federativa.json`);
  }
  /**
   * Obtiene la lista de unidades de medida.
   * 
   * @returns {Observable<CatalogoLista>} Un observable con la lista de unidades de medida.
   */
  obtenerUnidadMedida(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>(`assets/json/32503/entidad-federativa.json`);
  }
  /**
   * Obtiene la lista de fracciones arancelarias.
   * 
   * @returns {Observable<CatalogoLista>} Un observable con la lista de fracciones arancelarias.
   */
  obtenerFraccionArancelaria(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>(`assets/json/32503/entidad-federativa.json`);
  }
 
}