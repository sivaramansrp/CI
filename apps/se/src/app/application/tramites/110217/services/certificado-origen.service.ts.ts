import { CatalogoLista, DisponiblesTabla, RespuestaConsulta, SeleccionadasTabla } from '../models/certificado-origen.model';
import { HttpClient } from '@angular/common/http';
import { HttpCoreService } from '@libs/shared/data-access-user/src';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductorExportador } from '../models/certificado-origen.model';
import { PROC_110217, PRODUCTORS_EXPORTADOR } from '../servers/api-route';

/**
 * Servicio para gestionar las operaciones relacionadas con el certificado de origen.
 * 
 * Este servicio proporciona métodos para obtener datos como idiomas, entidades federativas,
 * representaciones federales, productores/exportadores, mercancías disponibles y seleccionadas,
 * tratados y países desde archivos JSON.
 */
@Injectable({
  providedIn: 'root'
})
export class CertificadosOrigenService {
  /**
   * Constructor del servicio.
   * 
   * @param {HttpClient} http - Cliente HTTP para realizar solicitudes a los archivos JSON.
   */
  constructor(private http: HttpClient, public httpService: HttpCoreService,) { }

  /**
   * Obtiene la lista de idiomas disponibles.
   * 
   * Este método realiza una solicitud HTTP para obtener los datos de idiomas desde un archivo JSON.
   * 
   * @returns {Observable<CatalogoLista>} Un observable que emite la lista de idiomas.
   */
  obtenerIdioma(): Observable<CatalogoLista> {
    return this.http
      .get<CatalogoLista>('assets/json/110217/idioma.json');
  }

  /**
   * Obtiene la lista de entidades federativas disponibles.
   * 
   * Este método realiza una solicitud HTTP para obtener los datos de entidades federativas desde un archivo JSON.
   * 
   * @returns {Observable<CatalogoLista>} Un observable que emite la lista de entidades federativas.
   */
  obtenerEntidadFederativa(): Observable<CatalogoLista> {
    return this.http
      .get<CatalogoLista>('assets/json/110217/entidad-federativa.json');
  }

  /**
   * Obtiene la lista de representaciones federales disponibles.
   * 
   * Este método realiza una solicitud HTTP para obtener los datos de representaciones federales desde un archivo JSON.
   * 
   * @returns {Observable<CatalogoLista>} Un observable que emite la lista de representaciones federales.
   */
  obtenerRepresentacionFederal(): Observable<CatalogoLista> {
    return this.http
      .get<CatalogoLista>('assets/json/110217/representacion-federal.json');
  }

  /**
   * Obtiene la información del productor por exportador.
   * 
   * @returns {Observable<Record<string, unknown>>} Un observable con los datos del productor por exportador.
   */
  obtenerProductorPorExportador(rfc: string): Observable<Record<string, unknown>> {
    return this.http.get<Record<string, unknown>>(PRODUCTORS_EXPORTADOR(rfc));
  }

  /**
     * Obtiene la lista de mercancías disponibles.
     * 
     * @returns {Observable<DisponiblesTabla[]>} Un observable con la lista de mercancías disponibles.
     */
    obtenerMercanciasDisponibles(body: Record<string, unknown>): Observable<unknown> {
      return this.httpService.post<unknown>(PROC_110217.BUSCAR_MERCANCIAS, { body: body });
    }

  /**
   * Obtiene la lista de mercancías seleccionadas.
   * 
   * Este método realiza una solicitud HTTP para obtener los datos de mercancías seleccionadas desde un archivo JSON.
   * 
   * @returns {Observable<SeleccionadasTabla[]>} Un observable que emite la lista de mercancías seleccionadas.
   */
  obtenerMercanciasSeleccionadas(): Observable<SeleccionadasTabla[]> {
    return this.http
      .get<SeleccionadasTabla[]>('assets/json/110217/mercancias-seleccionadas.json');
  }

  /**
   * Obtiene la lista de tratados disponibles.
   * 
   * Este método realiza una solicitud HTTP para obtener los datos de tratados desde un archivo JSON.
   * 
   * @returns {Observable<CatalogoLista>} Un observable que emite la lista de tratados.
   */
  obtenerTratado(): Observable<CatalogoLista> {
    return this.http
      .get<CatalogoLista>('assets/json/110217/pais.json');
  }

  /**
   * Obtiene la lista de países disponibles.
   * 
   * Este método realiza una solicitud HTTP para obtener los datos de países desde un archivo JSON.
   * 
   * @returns {Observable<CatalogoLista>} Un observable que emite la lista de países.
   */
  obtenerPais(): Observable<CatalogoLista> {
    return this.http
      .get<CatalogoLista>('assets/json/110217/pais.json');
  }

    /**
 * Obtiene los datos para la consulta del trámite.
 * @returns {Observable<RespuestaConsulta>} Observable con los datos de consulta.
 */
  getDatosConsulta(): Observable<RespuestaConsulta> {
    return this.http.get<RespuestaConsulta>('assets/json/110217/consulta_110217.json');
  }

  /**
 * Realiza una solicitud POST para agregar productores exportador utilizando el RFC del solicitante.
 * @param body Objeto con el RFC del solicitante.
 * @returns Observable con la respuesta de la solicitud.
 */
  agregarProductores(body: {rfc_solicitante: string}): Observable<unknown> {
    return this.httpService.post<unknown>(PROC_110217.AGREGAR_PRODUCTOR, { body: body });
  }
}