import { ColumnasTabla, RespuestaConsulta, SeleccionadasTabla } from '../models/registro.model';
import { ENVIRONMENT, JSONResponse, RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Servicio para gestionar las solicitudes relacionadas con los catálogos y datos del trámite 110221.
 * Este servicio permite acceder a los diferentes catálogos y manejar la información asociada con el proceso.
 */
@Injectable({
  providedIn: 'root',
})
export class RegistroService {

  /**
   * URL base del servidor principal.
   * Esta URL se utiliza para realizar solicitudes al servidor principal.
   */
  urlServer = ENVIRONMENT.URL_SERVER;

  /**
   * URL base del servidor de catálogos auxiliares.
   * Esta URL se utiliza para realizar solicitudes al servidor de catálogos auxiliares.
   */
  urlServerCatalogos = ENVIRONMENT.URL_SERVER_JSON_AUXILIAR;

  /**
   * Constructor del servicio.
   * @param http Cliente HTTP para realizar solicitudes al servidor.
   */
  constructor(private http: HttpClient) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Obtiene el catálogo de tratados.
   * @returns Observable con la respuesta del catálogo de tratados.
   */
  getTratado(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/110221/tratado.json');
  }

  /**
   * Obtiene el catálogo de países.
   * @returns Observable con la respuesta del catálogo de países.
   */
  getPais(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/110221/pais.json');
  }

  /**
   * Obtiene el catálogo de idiomas.
   * @returns Observable con la respuesta del catálogo de idiomas.
   */
  getIdioma(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/110221/idioma.json');
  }

  /**
   * Obtiene el catálogo de países de destino.
   * @returns Observable con la respuesta del catálogo de países de destino.
   */
  getPaisDestino(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/110221/pais.json');
  }

  /**
   * Obtiene el catálogo de transportes.
   * @returns Observable con la respuesta del catálogo de transportes.
   */
  getTransporte(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/110221/pais.json');
  }

  /**
   * Obtiene el catálogo de entidades.
   * @returns Observable con la respuesta del catálogo de entidades.
   */
  getEntidad(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/110221/entidad.json');
  }

  /**
   * Obtiene el catálogo de representaciones.
   * @returns Observable con la respuesta del catálogo de representaciones.
   */
  getRepresentacion(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/110221/entidad.json');
  }

  /**
   * Obtiene el catálogo de tipos de factura.
   * @returns Observable con la respuesta del catálogo de tipos de factura.
   */
  getTipoFactura(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(
      'assets/json/110221/tipofactura.json'
    );
  }

  /**
   * Obtiene el catálogo de unidades de medida comercial (UMC).
   * @returns Observable con la respuesta del catálogo de UMC.
   */
  getUMC(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/110221/umc.json');
  }

  /**
   * Obtiene el catálogo de unidades de medida.
   * @returns Observable con la respuesta del catálogo de unidades de medida.
   */
  getUnidadMedida(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/110221/umc.json');
  }

  /**
   * Obtiene un catálogo específico por su identificador.
   * @param id Identificador del catálogo.
   * @returns Observable con la respuesta del catálogo solicitado.
   */
  getCatalogoById(id: number): Observable<JSONResponse> {
    return this.http.get<JSONResponse>(`${this.urlServerCatalogos}/${id}`);
  }

  /**
   * Recupera la lista de "Registro de Solicitudes" desde un archivo JSON.
   * @returns Observable que contiene un array de objetos RegistroDeSolicitudesTabla.
   * @throws Lanzará un error si la solicitud HTTP falla.
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
   * @returns Observable que contiene un array de objetos SeleccionadasTabla.
   * @throws Lanzará un error si la solicitud HTTP falla.
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