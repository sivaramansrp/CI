import { ColumnasTabla, RespuestaConsulta, SeleccionadasTabla } from '../models/registro.model';
import { ENVIRONMENT, JSONResponse, RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Servicio para gestionar las solicitudes relacionadas con los catálogos y datos del trámite 110221.
 * Este servicio permite acceder a diferentes catálogos y manejar la información asociada al proceso.
 */
@Injectable({
  providedIn: 'root',
})
export class RegistroService {

  /**
   * URL base del servidor principal.
   * @type {string}
   */
  urlServer = ENVIRONMENT.URL_SERVER;

  /**
   * URL base del servidor de catálogos auxiliares.
   * @type {string}
   */
  urlServerCatalogos = ENVIRONMENT.URL_SERVER_JSON_AUXILIAR;

  /**
   * Constructor del servicio.
   * @param {HttpClient} http - Cliente HTTP para realizar solicitudes al servidor.
   */
  constructor(private http: HttpClient) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Obtiene el catálogo de tratados.
   * @returns {Observable<RespuestaCatalogos>} Observable con la respuesta del catálogo.
   */
  getTratado(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/110221/tratado.json');
  }

  /**
   * Obtiene el catálogo de países.
   * @returns {Observable<RespuestaCatalogos>} Observable con la respuesta del catálogo.
   */
  getPais(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/110221/pais.json');
  }

  /**
   * Obtiene el catálogo de idiomas.
   * @returns {Observable<RespuestaCatalogos>} Observable con la respuesta del catálogo.
   */
  getIdioma(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/110221/idioma.json');
  }

  /**
   * Obtiene el catálogo de países de destino.
   * @returns {Observable<RespuestaCatalogos>} Observable con la respuesta del catálogo.
   */
  getPaisDestino(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/110221/pais.json');
  }

  /**
   * Obtiene el catálogo de transportes.
   * @returns {Observable<RespuestaCatalogos>} Observable con la respuesta del catálogo.
   */
  getTransporte(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/110221/pais.json');
  }

  /**
   * Obtiene el catálogo de entidades.
   * @returns {Observable<RespuestaCatalogos>} Observable con la respuesta del catálogo.
   */
  getEntidad(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/110221/entidad.json');
  }

  /**
   * Obtiene el catálogo de representaciones.
   * @returns {Observable<RespuestaCatalogos>} Observable con la respuesta del catálogo.
   */
  getRepresentacion(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/110221/entidad.json');
  }

  /**
   * Obtiene el catálogo de tipos de factura.
   * @returns {Observable<RespuestaCatalogos>} Observable con la respuesta del catálogo.
   */
  getTipoFactura(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(
      'assets/json/110221/tipofactura.json'
    );
  }

  /**
   * Obtiene el catálogo de unidades de medida comercial (UMC).
   * @returns {Observable<RespuestaCatalogos>} Observable con la respuesta del catálogo.
   */
  getUMC(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/110221/umc.json');
  }

  /**
   * Obtiene el catálogo de unidades de medida.
   * @returns {Observable<RespuestaCatalogos>} Observable con la respuesta del catálogo.
   */
  getUnidadMedida(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/110221/umc.json');
  }

  /**
   * Obtiene un catálogo específico por su identificador.
   * @param {number} id - Identificador del catálogo.
   * @returns {Observable<JSONResponse>} Observable con la respuesta del catálogo.
   */
  getCatalogoById(id: number): Observable<JSONResponse> {
    return this.http.get<JSONResponse>(`${this.urlServerCatalogos}/${id}`);
  }

  /**
   * Recupera la lista de "Registro de Solicitudes" desde un archivo JSON.
   * @returns {Observable<ColumnasTabla[]>} Observable con array de objetos.
   * @throws {Error} Lanza error si la solicitud HTTP falla.
   */
  public getSolicitudesTabla(): Observable<ColumnasTabla[]> {
    return this.http.get<ColumnasTabla[]>('assets/json/110221/mercancia-disponsible.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  /**
   * Recupera la lista de "Solicitudes Seleccionadas" desde un archivo JSON.
   * @returns {Observable<SeleccionadasTabla[]>} Observable con array de objetos.
   * @throws {Error} Lanza error si la solicitud HTTP falla.
   */
  public getSolicitudesDataTabla(): Observable<SeleccionadasTabla[]> {
    return this.http.get<SeleccionadasTabla[]>('assets/json/110221/mercancias-seleccionadas.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  /**
   * Obtiene los datos para la consulta del trámite.
   * @returns {Observable<RespuestaConsulta>} Observable con los datos de consulta.
   */
  getDatosConsulta(): Observable<RespuestaConsulta> {
    return this.http.get<RespuestaConsulta>('assets/json/110221/consulta_110221.json');
  }
}