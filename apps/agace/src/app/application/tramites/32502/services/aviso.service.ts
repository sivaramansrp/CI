import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaCatalogos } from '@ng-mf/data-access-user';

@Injectable({
  providedIn: 'any'
})
/**
 * Servicio para obtener catálogos utilizados en el trámite 32502.
 */
export class AvisoService {

  /**
   * Constructor del servicio AvisoService.
   * 
   * @param http - Cliente HTTP para realizar peticiones
   */
  constructor(
    private http: HttpClient
  ) {
    // Constructor del servicio AvisoService
    // Aquí puedes inicializar cualquier cosa necesaria para el servicio
  }

  /**
   * Obtiene el catálogo de fracciones arancelarias.
   *
   * @param _catalogo - Parámetro no utilizado (por compatibilidad futura)
   * @returns Observable con la respuesta del catálogo de fracción arancelaria
   */
  getFraccionArancelariaCatalogo(_catalogo: string): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/32502/fraccion-arancelaria-catalogo.json');
  }

  /**
   * Obtiene el catálogo de reglas asociadas a fracciones arancelarias.
   *
   * @param _catalogo - Parámetro no utilizado (por compatibilidad futura)
   * @returns Observable con la respuesta del catálogo de reglas
   */
  getFraccionReglaCatalogo(_catalogo: string): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/32502/fraccion-regla-catalogo.json');
  }

  /**
   * Obtiene el catálogo de tipos de documento.
   *
   * @param _catalogo - Parámetro no utilizado (por compatibilidad futura)
   * @returns Observable con la respuesta del catálogo de tipo de documento
   */
  getTipoDocumento(_catalogo: string): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/32502/tipoDocumento.json');
  }
}
