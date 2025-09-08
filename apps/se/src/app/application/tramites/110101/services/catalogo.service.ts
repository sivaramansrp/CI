import { API_GET_CAT_CRITERIOS, API_GET_CAT_PAIS_BLOQUES, API_GET_CAT_TRATADOS_ACUERDO, API_GET_CAT_TRATADOS_ACUERDO_BLOQUE } from "../server/api-router";
import { BaseResponse } from "@libs/shared/data-access-user/src/core/models/shared/base-response.model";
import { Catalogo } from "@libs/shared/data-access-user/src";
import { ENVIRONMENT } from "@libs/shared/data-access-user/src";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})

export class CatalogosTramiteService {

  
  /**
     * URL base del servidor al que se realizarán las solicitudes relacionadas con el tramite 110101.
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
    * Consulta el catálogo de países y bloques comerciales
    * @returns Observable con la respuesta del servidor que contiene el catálogo
  */
  getCatPaisBloques(): Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${API_GET_CAT_PAIS_BLOQUES}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
  }

  /**
    * Consulta el catálogo de tratados acuerdos
    * @param cvePais - Identificador dela clave del pais.
    * @returns Observable con la respuesta del servidor que contiene el catálogo
  */
  getCatTratadosAcuerdos(cvePais: string): Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${API_GET_CAT_TRATADOS_ACUERDO(cvePais)}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
  }

  /**
    * Consulta el catálogo de tratados acuerdos bloque
    * @param cveTratadoAcuerdo - Identificador del cveTratadoAcuerdo del bloque.
    * @returns Observable con la respuesta del servidor que contiene el catálogo
  */
  getCatTratadosAcuerdosBloque(cveTratadoAcuerdo: string): Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${API_GET_CAT_TRATADOS_ACUERDO_BLOQUE(cveTratadoAcuerdo)}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
  }

  /**
    * Consulta el catálogo de criterios de origen
    * @param idTratadoAcuerdo - Identificador del idTratadoAcuerdo del bloque.
    * @returns Observable con la respuesta del servidor que contiene el catálogo
   */

  getCatCriterios(idTratadoAcuerdo: string): Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${API_GET_CAT_CRITERIOS(idTratadoAcuerdo)}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
  }
}