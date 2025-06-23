import { CatalogoLista, DatosSolicitante, RespuestaConsulta, SolicitudTablaDatos } from '../models/autorizacion-importacion.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
/**
 * Servicio para gestionar las operaciones relacionadas con el aviso de traslado.
 * 
 * Este servicio proporciona métodos para obtener datos como catálogos, tablas de aviso,
 * tablas de mercancías, y otros datos necesarios para el trámite 6402.
 */
@Injectable({
  providedIn: 'root'
})
export class AutorizacionImportacionService {
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
    return this.http.get<DatosSolicitante>(`assets/json/6402/datosSolicitante.json`);
  }
  /**
   * Obtiene los datos de la tabla de Solicitud.
   * 
   * @returns {Observable<SolicitudTablaDatos>} Un observable con los datos de la tabla de Solicitud.
   */
  obtenerSolicitudTabla(): Observable<SolicitudTablaDatos> {
    return this.http.get<SolicitudTablaDatos>(`assets/json/6402/autorizacion-tabla.json`);
  }
  
   /**
   * Obtiene la lista de entidades federativas.
   * 
   * @returns {Observable<CatalogoLista>} Un observable con la lista de entidades federativas.
   */
  obtenerFederativa(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>(`assets/json/6402/entidad-federativa.json`);
  }

  /**
   * @descripcion Obtiene la lista de aduanas desde un archivo JSON local.
   * @retorno Un observable que emite un objeto de tipo `CatalogoLista` con los datos de las aduanas.
   */
  obtenerAduanas(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>(`assets/json/6402/aduanas.json`);
  }

  /**
   * @descripcion Obtiene la lista de aduaneras desde un archivo JSON local.
   * @retorna Un observable que emite un objeto de tipo `CatalogoLista` con los datos de las aduaneras.
   */
  obtenerAduaneras(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>(`assets/json/6402/aduaneras.json`);
  }

  /**
   * @descripcion Obtiene el catálogo de recintos fiscalizados desde un archivo JSON local.
   * @retorna Un observable que emite un objeto de tipo `CatalogoLista` con los datos del catálogo.
   */
  obtenerRecintoFiscalizado(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>(`assets/json/6402/recinto-fiscalizado.json`);
  }

  /**
   * @descripcion Obtiene el tipo de documento desde un archivo JSON local.
   * @retorno Un Observable que emite un objeto de tipo `CatalogoLista` con los datos del tipo de documento.
   */
  obtenerTipoDeDocumento(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>(`assets/json/6402/tipo-de-documento.json`);
  }

  /**
   * @descripcion Obtiene el catálogo de medios de transporte desde un archivo JSON local.
   * @retorna Un observable que emite un objeto de tipo `CatalogoLista` con los datos del catálogo.
   */
  obtenerMedioDeTransporte(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>(`assets/json/6402/medio-de-transporte.json`);
  }

  /**
   * @descripcion Obtiene la lista de países de procedencia desde un archivo JSON local.
   * @retorna Un observable que emite un objeto de tipo `CatalogoLista` con los datos de los países de procedencia.
   */
  obtenerPaisDeProcedencia(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>(`assets/json/6402/pais-de-procedencia.json`);
  }

  /**
   * Obtiene una lista de opciones "Sí" o "No" desde un archivo JSON local.
   * 
   * @returns {Observable<CatalogoLista>} Un observable que emite la lista de opciones "Sí" o "No".
   */
  obtenerSiNo(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>(`assets/json/6402/si-no.json`);
  }

  /**
   * @description Obtiene el catálogo de tipos de destino desde un archivo JSON local.
   * @returns {Observable<CatalogoLista>} Un observable que emite el catálogo de tipos de destino.
   */
  obtenerTipoDeDestino(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>(`assets/json/6402/tipo-de-destino.json`);
  }

  /**
 * Obtiene los datos para la consulta del trámite.
 * @returns {Observable<RespuestaConsulta>} Observable con los datos de consulta.
 */
  getDatosConsulta(): Observable<RespuestaConsulta> {
    return this.http.get<RespuestaConsulta>('assets/json/6402/consulta_6402.json');
  }
 
}