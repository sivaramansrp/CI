import { RespuestaAduanas, RespuestaConsulta } from "@libs/shared/data-access-user/src/core/models/11201/datos-tramite.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RespuestaApi } from "@libs/shared/data-access-user/src/core/models/11201/datos-tramite.model";
import { RespuestaCatalogos } from "@libs/shared/data-access-user/src";
import { RespuestaContenedor } from "@libs/shared/data-access-user/src/core/models/11201/datos-tramite.model";

/**
 * Servicio para gestionar los datos del trámite 11201.
 * 
 * Este servicio proporciona métodos para obtener diferentes tipos de datos
 * relacionados con el trámite de contenedores temporales, incluyendo:
 * - Contenedores
 * - Catálogos de transporte y aduanas
 * - Datos de tablas y solicitantes
 * - Simulación de carga de archivos y envío de formularios
 * 
 * @injectable
 */
@Injectable({
  providedIn: 'root',
})
export class DatosTramiteService {

  /**
   * Constructor del servicio DatosTramiteService.
   * 
   * @param {HttpClient} http - Cliente HTTP para realizar peticiones a APIs o archivos JSON.
   */
  constructor(
    private http: HttpClient
    // eslint-disable-next-line no-empty-function
  ) {
  }

  /**
   * Obtener una lista de Contenedores
   * 
   * @returns {Observable<RespuestaContenedores>} Un observable con la respuesta de contenedores.
   */
  getContenedores(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(`assets/json/11201/tipoLista.json`);
  }

  /**
   * Simular la carga de archivos
   * 
   * @returns {Observable<RespuestaApi>} Un observable con la respuesta de la simulación de carga de archivos.
   */
  uploadArchivo(): Observable<RespuestaApi> {
    return this.http.get<RespuestaApi>(`assets/json/11201/contenedorLista.json`);
  }

  /**
   * Simular un envío exitoso de formulario
   * 
   * @returns {Observable<RespuestaAduanas>} Un observable con la respuesta de la simulación de envío de formulario.
   */
  submitSolicitud(): Observable<RespuestaAduanas> {
    return this.http.get<RespuestaAduanas>(`assets/json/11201/aduanaList.json`);
  }

  /**
   * Agregar una solicitud
   * 
   * @returns {Observable<RespuestaContenedor>} Un observable con la respuesta de agregar una solicitud.
   */
  agregarSolicitud(): Observable<RespuestaContenedor> {
    return this.http.get<RespuestaContenedor>(`assets/json/11201/contenedorLista.json`);
  }

  /**
   * Obtener una lista de Transporte
   * 
   * @param {string} catalogo - El nombre del catálogo a obtener.
   * @returns {Observable<RespuestaCatalogos>} Un observable con la respuesta del catálogo de transporte.
   */
  getTransporteList(catalogo: string): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(`assets/json/11201/${catalogo}.json`);
  }

  /**
   * Obtener una lista de Aduanas
   * 
   * @param {string} catalogo - El nombre del catálogo a obtener.
   * @returns {Observable<RespuestaAduanas>} Un observable con la respuesta del catálogo de aduanas.
   */
  getAduanaList(catalogo: string): Observable<RespuestaAduanas> {
    return this.http.get<RespuestaAduanas>(`assets/json/11201/${catalogo}.json`);
  }

  /**
   * Obtener datos de la tabla
   * 
   * @returns {Observable<RespuestaCatalogos[]>} Un observable con la respuesta de los datos de la tabla.
   */
  getDatosTableData(): Observable<RespuestaCatalogos[]> {
    return this.http.get<RespuestaCatalogos[]>(`assets/json/11201/datosTabla.json`);
  }

  /**
   * Obtener datos del solicitante
   * 
   * @returns {Observable<RespuestaCatalogos[]>} Un observable con la respuesta de los datos del solicitante.
   */
  getDatosSolicitante(): Observable<RespuestaCatalogos[]> {
    return this.http.get<RespuestaCatalogos[]>(`assets/json/11201/datosSolicitante.json`);
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
    return this.http.get<RespuestaConsulta>(`assets/json/11201/consulta_11201.json`);
  }
}