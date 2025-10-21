import {
  API_GET_CATALOGO_ADUANAS,
  API_GET_CATALOGO_FRACCION_ARANCELARIA,
  API_GET_CATALOGO_FRACCIONES_ARANCELARIAS,
  API_GET_CATALOGO_OFICINAS_INSPECCION,
  API_GET_CATALOGO_PUNTO_INSPECCION,
  API_GET_CATALOGO_REGIMENES_VIGENTES,
  API_GET_CATALOGO_RESTRICCIONES
} from '../../../../../core/server/api-router';
import { BaseResponse } from '@libs/shared/data-access-user/src/core/models/shared/base-response.model';
import { Catalogo } from '@ng-mf/data-access-user';
import { ENVIRONMENT } from '@ng-mf/data-access-user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  /**
   * URL base del servidor al que se realizarán las solicitudes relacionadas con aduanas.
   * Esta variable almacena la dirección del host para los servicios compartidos de catálogos.
   * Es de solo lectura y se inicializa en el constructor del servicio.
   */
  host: string;

  /**
   * Constructor del servicio que inicializa la URL base del host.
   * @param http Instancia de HttpClient para realizar solicitudes HTTP.
   */
  constructor(private http: HttpClient) {
    this.host = `${ENVIRONMENT.API_HOST}/api/`;
  }

  /**
   * Obtiene el catálogo de aduanas correspondiente a un trámite específico.
   *
   * @param tramite - El identificador numérico del trámite para el cual se requiere el catálogo de aduanas.
   * @returns Un observable que emite la respuesta base con el arreglo de catálogos de aduanas.
   */
  obtieneCatalogoAduana(tramite: number):Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${API_GET_CATALOGO_ADUANAS(tramite.toString())}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
  }

  /**
      * Obtiene el catálogo de fracciones correspondiente a un trámite específico.
      *
      * @param tramite - El identificador numérico del trámite para el cual se requiere obtener el catálogo de fracciones.
      * @returns Un observable que emite la respuesta base con un arreglo de objetos de tipo Catalogo.
      */
  obtieneCatalogoFraccionesArancelarias(tramite: number): Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${API_GET_CATALOGO_FRACCIONES_ARANCELARIAS(tramite.toString())}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT)
      .pipe(
        // Veo que al tener una descripcion muy larga, en la UI se ve mal, por eso ponen  la clave en UAT.
        map((response: BaseResponse<Catalogo[]>) => ({
          ...response,
          datos: response.datos?.map(item => ({
            ...item,
            descripcion: `${item.clave}`
          })) ?? []
        }))
      );
  }

  /**
     * Obtiene el catálogo de nico para un trámite y clave de fracción específicos.
     *
     * @param tramite - El identificador numérico del trámite para el cual se solicita el catálogo.
     * @param cveFraccion - La clave de la fracción arancelaria a consultar.
     * @returns Un observable que emite la respuesta base con el arreglo de catálogos correspondientes.
     */
  obtieneCatalogoNicoFraccionArancelaria(tramite: number, cveFraccion: string): Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${API_GET_CATALOGO_FRACCION_ARANCELARIA(tramite.toString(), cveFraccion)}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT)
      .pipe(
        // Veo que al tener una descripcion muy larga, en la UI se ve mal, por eso ponen  la clave en UAT.
        map((response: BaseResponse<Catalogo[]>) => ({
          ...response,
          datos: response.datos?.map(item => ({
            ...item,
            descripcion: `${item.clave}`
          })) ?? []
        }))
      );
  }

  /**
   * Obtiene el catálogo de oficinas de inspección para un trámite y aduana específicos.
   *
   * @param tramite - El identificador numérico del trámite para el cual se requiere el catálogo.
   * @param cveAduana - La clave de la aduana asociada al trámite.
   * @returns Un observable que emite la respuesta base con el arreglo de objetos de catálogo de oficinas de inspección.
   */
  obtieneCatalogoOficinasInspeccion(tramite: number, cveAduana: string): Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${API_GET_CATALOGO_OFICINAS_INSPECCION(tramite.toString(), cveAduana)}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
  }

  /**
   * Obtiene el catálogo de puntos de inspección para un trámite y OISA específicos.
   *
   * @param tramite - El identificador numérico del trámite.
   * @param oisa - El identificador de la OISA (Oficina de Inspección de Sanidad Agropecuaria).
   * @returns Un observable que emite la respuesta base con el arreglo de catálogos de puntos de inspección.
   */
  obtieneCatalogoPuntoInspeccion(tramite: number, oisa: string): Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${API_GET_CATALOGO_PUNTO_INSPECCION(tramite.toString(), oisa)}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
  }

  /**
   * Obtiene el catálogo de regímenes vigentes para un trámite específico.
   *
   * @param tramite - El identificador numérico del trámite para el cual se requiere obtener los regímenes vigentes.
   * @returns Un observable que emite la respuesta base con un arreglo de objetos de tipo `Catalogo`.
   */
  obtieneCatalogoRegimenesVigentes(tramite: number): Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${API_GET_CATALOGO_REGIMENES_VIGENTES(tramite.toString())}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
  }

  /**
   * Obtiene el catálogo de restricciones para un trámite específico.
   *
   * @param tramite - El identificador numérico del trámite para el cual se requiere obtener los regímenes vigentes.
   * @returns Un observable que emite la respuesta base con un arreglo de objetos de tipo `Catalogo`.
   */
  obtieneCatalogoRestricciones(tramite: number): Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${API_GET_CATALOGO_RESTRICCIONES(tramite.toString())}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
  }
}
