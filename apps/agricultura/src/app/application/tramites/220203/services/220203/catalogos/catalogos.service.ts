import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Catalogo } from '@ng-mf/data-access-user';
import { ENVIRONMENT } from '@ng-mf/data-access-user';
import { BaseResponse } from '@libs/shared/data-access-user/src/core/models/shared/base-response.model';
import { Observable } from 'rxjs';
import { API_GET_CATALOGO_RESTRICCIONES } from 'apps/agricultura/src/app/application/core/server/api-router';

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
}
