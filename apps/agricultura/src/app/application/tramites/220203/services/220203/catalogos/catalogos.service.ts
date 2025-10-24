import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Catalogo } from '@ng-mf/data-access-user';
import { ENVIRONMENT } from '@ng-mf/data-access-user';
import { BaseResponse } from '@libs/shared/data-access-user/src/core/models/shared/base-response.model';
import { map, Observable } from 'rxjs';
import { API_GET_CATALOGO_CONSULTA_PAISES, API_GET_CATALOGO_FRACCION_ARANCELARIA, API_GET_CATALOGO_FRACCIONES_ARANCELARIAS, API_GET_CATALOGO_RESTRICCIONES, API_GET_CATALOGO_UNIDADES_MEDIDA_COMERCIALES, API_GET_CATALOGO_USOS_MERCANCIA } from 'apps/agricultura/src/app/application/core/server/api-router';

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
     * Obtiene el catálogo de restricciones para un trámite específico.
     *
     * @param tramite - El identificador numérico del trámite para el cual se requiere obtener los regímenes vigentes.
     * @returns Un observable que emite la respuesta base con un arreglo de objetos de tipo `Catalogo`.
     */
    obtieneCatalogoRestricciones(tramite: number): Observable<BaseResponse<Catalogo[]>> {
      const ENDPOINT = `${this.host}${API_GET_CATALOGO_RESTRICCIONES(tramite.toString())}`;
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
        // la clave se pasa como descripcion y la descripcion se obtiene de otro endpoint
        map((response: BaseResponse<Catalogo[]>) => ({
          ...response,
          datos: response.datos?.map(item => ({
            ...item,
            descripcion: `${item.clave}`
          })) ?? []
        }))
      );
  };

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
        // la clave se pasa como descripcion y la descripcion se obtiene de otro endpoint
        map((response: BaseResponse<Catalogo[]>) => ({
          ...response,
          datos: response.datos?.map(item => ({
            ...item,
            descripcion: `${item.clave}`
          })) ?? []
        }))
      );
  };

  /**
     * Obtiene el catálogo de unidades de medida comerciales para un trámite específico.
     *
     * @param tramite - El identificador numérico del trámite para el cual se requiere obtener el catálogo.
     * @returns Un observable que emite la respuesta base con un arreglo de objetos de tipo Catalogo.
     */
  obtieneCatalogoUnidadesMedidaComerciales(tramite: number): Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${API_GET_CATALOGO_UNIDADES_MEDIDA_COMERCIALES(tramite.toString())}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
  }

  /**
   * Obtiene el catálogo de usos de mercancía para un trámite específico.
   *
   * @param tramite - El identificador numérico del trámite para el cual se requiere el catálogo de usos de mercancía.
   * @returns Un observable que emite la respuesta base con un arreglo de objetos de tipo `Catalogo`.
   */
  obtieneCatalogoUsosMercancia(tramite: number): Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${API_GET_CATALOGO_USOS_MERCANCIA(tramite.toString())}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
  }

  /**
       * Obtiene el catálogo de paises.
     *
     * @returns Un observable que emite la respuesta base con el arreglo de catálogos de paises.
     */
  obtieneCatalogoPaises(tramite: number): Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${API_GET_CATALOGO_CONSULTA_PAISES(tramite.toString())}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
  }

}
