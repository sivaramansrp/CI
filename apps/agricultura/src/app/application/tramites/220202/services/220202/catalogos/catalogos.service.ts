import { API_GET_CATALOGO_ADUANAS, API_GET_CATALOGO_FRACCIONES_ARANCELARIAS } from '../../../../../core/server/api-router';
import { BaseResponse } from '@libs/shared/data-access-user/src/core/models/shared/base-response.model';
import { Catalogo } from '@ng-mf/data-access-user';
import { ENVIRONMENT } from '@ng-mf/data-access-user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
      // .pipe(
      //     // Veo que al tener una descripcion muy larga, en la UI se ve mal, por eso ponen  la clave en UAT.
      //     map((response: BaseResponse<Catalogo[]>) => ({
      //         ...response,
      //         datos: response.datos?.map(item => ({
      //             ...item,
      //             descripcion: `${item.clave}`
      //         })) ?? []
      //     }))
      // )
      ;
  }
}
