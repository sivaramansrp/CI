import { AvisoTablaDatos, CatalogoLista,DatosSolicitante, DesperdicioTablaDatos, PedimentoTablaDatos, ProcesoTablaDatos } from '../models/aviso-destruccion.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
/**
 * Servicio para gestionar las operaciones relacionadas con el aviso de traslado.
 * 
 * Este servicio proporciona métodos para obtener datos como catálogos, tablas de aviso,
 * tablas de mercancías, y otros datos necesarios para el trámite 32506.
 */
@Injectable({
  providedIn: 'root'
})
export class AvisoDestruccionService {
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
    return this.http.get<DatosSolicitante>(`assets/json/32506/datosSolicitante.json`);
  }
  /**
   * Obtiene los datos de la tabla de Pedimento.
   * 
   * @returns {Observable<PedimentoTablaDatos>} Un observable con los datos de la tabla de Pedimento.
   */
  obtenerPedimentoTabla(): Observable<PedimentoTablaDatos> {
    return this.http.get<PedimentoTablaDatos>(`assets/json/32506/pedimento-tabla.json`);
  }

  /**
   * Obtiene los datos de la tabla de procesos.
   * 
   * @returns {Observable<ProcesoTablaDatos>} Un observable con los datos de la tabla de procesos.
   */
  obtenerProcesoTabla(): Observable<ProcesoTablaDatos> {
    return this.http.get<ProcesoTablaDatos>(`assets/json/32506/proceso-tabla.json`);
  }

  /**
   * @descripcion Obtiene los datos de la tabla de desperdicio desde un archivo JSON local.
   * @retorno Un observable que emite los datos de la tabla de desperdicio (`DesperdicioTablaDatos`).
   */
  obtenerDesperdicioTabla(): Observable<DesperdicioTablaDatos> {
    return this.http.get<DesperdicioTablaDatos>(`assets/json/32506/desperdicio-tabla.json`);
  }

  /**
   * Obtiene los datos de la tabla de aviso.
   * 
   * @returns {Observable<AvisoTablaDatos>} Un observable con los datos de la tabla de aviso.
   */
  obtenerAvisoTabla(): Observable<AvisoTablaDatos> {
    return this.http.get<AvisoTablaDatos>(`assets/json/32506/aviso-tabla.json`);
  }
  /**
   * Obtiene la lista de colonias.
   * 
   * @returns {Observable<CatalogoLista>} Un observable con la lista de colonias.
   */
  obtenerColonias(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>(`assets/json/32506/entidad-federativa.json`);
  }
  /**
   * Obtiene la lista de municipios.
   * 
   * @returns {Observable<CatalogoLista>} Un observable con la lista de municipios.
   */
  obtenerMunicipio(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>(`assets/json/32506/entidad-federativa.json`);
  }
  /**
   * Obtiene la lista de entidades federativas.
   * 
   * @returns {Observable<CatalogoLista>} Un observable con la lista de entidades federativas.
   */
  obtenerFederativa(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>(`assets/json/32506/entidad-federativa.json`);
  }
  /**
   * Obtiene la lista de unidades de medida.
   * 
   * @returns {Observable<CatalogoLista>} Un observable con la lista de unidades de medida.
   */
  obtenerUnidadMedida(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>(`assets/json/32506/entidad-federativa.json`);
  }
  /**
   * Obtiene la lista de fracciones arancelarias.
   * 
   * @returns {Observable<CatalogoLista>} Un observable con la lista de fracciones arancelarias.
   */
  obtenerFraccionArancelaria(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>(`assets/json/32506/entidad-federativa.json`);
  }
 
}