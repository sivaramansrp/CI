import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RespuestaCaatTabla, RespuestaContribuyentePMNTabla, RespuestaContribuyenteTabla } from '../../models/transportacion-maritima.model';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';

/**
 * Servicio para la gestión de datos relacionados con la transportación marítima.
 */
@Injectable({
  providedIn: 'root'
})

/**
 * Clase que representa el servicio de transportación marítima.
 * Este servicio se encarga de realizar peticiones HTTP para obtener datos relacionados con la transportación marítima.
 */
export class TransportacionMaritimaService {

  /**
   * Constructor del servicio TransportacionMaritimaService.
   * @param http - Instancia de HttpClient para realizar peticiones HTTP.
   * @description El constructor inyecta la dependencia HttpClient para realizar peticiones HTTP.
   */
  constructor(
    private http: HttpClient
  ) {
    // El constructor se utiliza para la inyección de dependencias
  }

  /**
   * Obtiene el catálogo de paises.
   * @returns Observable<RespuestaCatalogos>
   * @description Este método realiza una petición HTTP GET a un archivo JSON local que contiene un catálogo de países.
   */
  getPaisCatalogo(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/40201/pais-catalogo.json');
  }

  /**
   * Obtiene el catálogo de estados.
   * @returns Observable<RespuestaCatalogos>
   * @description Este método realiza una petición HTTP GET a un archivo JSON local que contiene un catálogo de estados.
   */
  getEstadoCatalogo(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/40201/estado-catalogo.json');
  }

  /**
   * Obtiene el catálogo de municipios.
   * @returns Observable<RespuestaCatalogos>
   * @description Este método realiza una petición HTTP GET a un archivo JSON local que contiene un catálogo de municipios.
   */
  getMunicipioCatalogo(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/40201/municipio-catalogo.json');
  }

  /**
   * Obtiene el catálogo de colonias.
   * @returns Observable<RespuestaCatalogos>
   * @description Este método realiza una petición HTTP GET a un archivo JSON local que contiene un catálogo de colonias.
   */
  getColoniaCatalogo(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/40201/colonia-catalogo.json');
  }

  /**
   * Obtiene el catálogo de empresas CAAT.
   * @returns Observable<RespuestaCatalogos>
   * @description Este método realiza una petición HTTP GET a un archivo JSON local que contiene un catálogo de empresas CAAT.
   */
  obtenerBuscarEmpresaCaat(): Observable<RespuestaCaatTabla> {
    return this.http.get<RespuestaCaatTabla>('assets/json/40201/buscar-empresa-caat.json');
  }

  /**
   * Obtiene el catálogo de contribuyentes.
   * @returns Observable<RespuestaContribuyenteTabla>
   * @description Este método realiza una petición HTTP GET a un archivo JSON local que contiene un catálogo de contribuyentes.
   */
  buscarContribuyentePFN(): Observable<RespuestaContribuyenteTabla> {
    return this.http.get<RespuestaContribuyenteTabla>('assets/json/40201/buscar-contribuyente-pfn-datos.json');
  }

  /**
   * Obtiene el catálogo de contribuyentes.
   * @returns Observable<RespuestaContribuyentePMNTabla>
   * @description Este método realiza una petición HTTP GET a un archivo JSON local que contiene un catálogo de contribuyentes.
   */
  buscarContribuyentePMN(): Observable<RespuestaContribuyentePMNTabla> {
    return this.http.get<RespuestaContribuyentePMNTabla>('assets/json/40201/buscar-contribuyente-pmn-datos.json');
  }
}