import { API_GET_CAT_ENTIDADES, API_GET_CAT_PAISES, API_GET_CAT_REGIMENES, API_GET_CAT_REGIMENES_CLASIFICACION, API_GET_CAT_TIPOS_ADUANAS, API_GET_CAT_TIPOS_MONEDAS } from '../server/api-router';
import { Catalogo, ENVIRONMENT } from '@libs/shared/data-access-user/src';
import { BaseResponse } from '@libs/shared/data-access-user/src/core/models/shared/base-response.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogosTramiteService {


  /**
     * URL base del servidor al que se realizarán las solicitudes relacionadas con aduanas.
     * Esta variable almacena la dirección del host para los servicios compartidos de catálogos.
     * Es de solo lectura y se inicializa en el constructor del servicio.
     */
  private readonly host: string;

  /**
    * Constructor del servicio que inicializa la URL base del host.
    * @param http Instancia de HttpClient para realizar solicitudes HTTP.
    */
  constructor(private http: HttpClient) {
    this.host = `${ENVIRONMENT.API_HOST}/api/`;
  }

  /**
   * Obtiene el catálogo de regímenes desde el backend.
   *
   * @returns {Observable<BaseResponse<Catalogo[]>>} Observable que emite un objeto `BaseResponse`
   * con la lista de regímenes disponibles en forma de arreglo de `Catalogo`.
   */
  getCatRegimenes(): Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${API_GET_CAT_REGIMENES}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
  }

  /**
   * Obtiene el catálogo de regímenes filtrado por clave de régimen.
   *
   * @param {string} cveRegimen - Clave del régimen utilizada para realizar la búsqueda.
   * @returns {Observable<BaseResponse<Catalogo[]>>} Observable con la respuesta que contiene la lista de regímenes filtrados.
   */
  getCatCveRegimen(cveRegimen: string):
    Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${API_GET_CAT_REGIMENES_CLASIFICACION(cveRegimen)}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
  }

  /**
   * Obtiene el catálogo de entidades federativas desde el backend.
   * @returns Observable con la respuesta que contiene la lista de entidades federativas.
   */
  getCatEntidades(): Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${API_GET_CAT_ENTIDADES}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
  }

  /**
   * Obtiene el catálogo de tipos de aduanas desde el backend.
   * @returns Observable con la respuesta que contiene la lista de tipos de aduanas.
   */
  getCatTiposAduanas(): Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${API_GET_CAT_TIPOS_ADUANAS}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
  }

  /**
   * Obtiene el catálogo de tipos de monedas desde el backend.
   * @returns Observable con la respuesta que contiene la lista de tipos de monedas.
   */
  getCatTiposMonedas(): Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${API_GET_CAT_TIPOS_MONEDAS}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
  }

  /**
   * Obtiene el catálogo de países desde el backend.
   * @returns Observable con la respuesta que contiene la lista de países.
   */
  getCatPaises(): Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${API_GET_CAT_PAISES}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
  }

}
