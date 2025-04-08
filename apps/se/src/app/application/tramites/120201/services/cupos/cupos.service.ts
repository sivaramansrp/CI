import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { RespuestaCuposTabla } from '../../models/cupos.model';

/**
 * Servicio para obtener los catálogos de la aplicación.
 */
@Injectable({
  providedIn: 'root'
})
/**
 * Clase que representa el servicio de catálogos.
 * @class CuposService
 */
export class CuposService {

  /**
   * Constructor del servicio de catálogos.
   * @param http - Inyección del servicio HttpClient para realizar peticiones HTTP.
   * @description Este servicio se encarga de obtener los catálogos necesarios para el funcionamiento de la aplicación.
   */
  constructor(
    private http: HttpClient
  ) { 
    // Constructor vacío

  }

  /**
   * Método para obtener el catálogo de tratados.
   * @returns Observable<RespuestaCatalogos> - Observable que emite la respuesta del catálogo de tratados.
   * @description Método para obtener el catálogo de tratados.
   */
  getTratadoCatalogo(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/120201/tratado-catalogo.json');
  }

  /**
   * Método para obtener el catálogo de régimen de clasificación.
   * @returns Observable<RespuestaCatalogos> - Observable que emite la respuesta del catálogo de régimen de clasificación.
   * @description Método para obtener el catálogo de régimen de clasificación.
   */
  getRegimenClasificacionCatalogo(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/120201/regimen-clasificacion-catalogo.json');
  }

  /**
   * Método para obtener el catálogo de país de destino.
   * @returns Observable<RespuestaCatalogos> - Observable que emite la respuesta del catálogo de país de destino.
   * @description Método para obtener el catálogo de país de destino.
   */
  getPaisDestinoCatalogo(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/120201/pais-destino-catalogo.json');
  }

  /**
   * Método para obtener el catálogo de país de origen.
   * @returns Observable<RespuestaCatalogos> - Observable que emite la respuesta del catálogo de país de origen.
   * @description Método para obtener el catálogo de país de origen.
   */
  getEstadoCatalogo(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/120201/estado-catalogo.json');
  }

  /**
   * Método para obtener el catálogo de fracción arancelaria.
   * @returns Observable<RespuestaCatalogos> - Observable que emite la respuesta del catálogo de representación federal.
   * @description Método para obtener el catálogo de representación federal.
   */
  getRepresentacionFederalCatalogo(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/120201/representacion-federal-catalogo.json');
  }

  /**
   * Método para obtener datos de solicitud de tabla de cupos.
   * @returns Observable<ResquestaCatalogos> - Observable que emite la resquesta del cupos.
   * @description Método para obtener el tablón de cupos.
   */
  obtenerTablaDatos(): Observable<RespuestaCuposTabla> {
    return this.http.get<RespuestaCuposTabla>('assets/json/120201/tabla-cupos.json');
  }
}
