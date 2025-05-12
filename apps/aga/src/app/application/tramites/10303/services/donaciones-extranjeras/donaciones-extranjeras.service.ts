import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BasicRequerimientosRespuesta, ContribuyenteRespuesta, ManifiestosRespuesta } from '../../models/donaciones-extranjeras.model';
import { Observable } from 'rxjs';
import { RespuestaCatalogos } from '@ng-mf/data-access-user';

/**
 * Servicio para gestionar las donaciones extranjeras y acceder a diversos recursos como manifiestos, requerimientos,
 * catálogos y datos del contribuyente.
 */
@Injectable({
  providedIn: 'root'
})
export class DonacionesExtranjerasService {

  /**
   * Constructor del servicio.
   * 
   * @param http - Inyección del servicio HttpClient para realizar peticiones HTTP.
   */
  constructor(private http: HttpClient) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Obtiene la lista de manifiestos desde un archivo JSON.
   * 
   * @returns Observable con la respuesta de los manifiestos.
   */
  getManifiestos(): Observable<ManifiestosRespuesta> {
    return this.http.get<ManifiestosRespuesta>('assets/json/10303/manifiestos.json');
  }

  /**
   * Obtiene los requerimientos básicos desde un archivo JSON.
   * 
   * @returns Observable con la respuesta de los requerimientos básicos.
   */
  getBasicoRequerimientos(): Observable<BasicRequerimientosRespuesta> {
    return this.http.get<BasicRequerimientosRespuesta>('assets/json/10303/basic-requerimientos.json');
  }

  /**
   * Obtiene la lista de aduanas desde un archivo JSON.
   * 
   * @param catalogo - Parámetro que indica el catálogo de aduanas.
   * @returns Observable con la respuesta de las aduanas.
   */
  getAduana(catalogo: string): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/10303/aduana.json');
  }

  /**
   * Obtiene el destino de donación desde un archivo JSON.
   * 
   * @param catalogo - Parámetro que indica el catálogo de destino de donación.
   * @returns Observable con la respuesta del destino de donación.
   */
  getDestinoDonacion(catalogo: string): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/10303/destino-donacion.json');
  }

  /**
   * Obtiene el tipo de mercancía desde un archivo JSON.
   * 
   * @param catalogo - Parámetro que indica el catálogo de tipo de mercancía.
   * @returns Observable con la respuesta del tipo de mercancía.
   */
  getTipoDeMercancia(catalogo: string): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/10303/tipo-de-mercancia.json');
  }

  /**
   * Obtiene la unidad de medida desde un archivo JSON.
   * 
   * @param catalogo - Parámetro que indica el catálogo de unidad de medida.
   * @returns Observable con la respuesta de la unidad de medida.
   */
  getUnidadMedida(catalogo: string): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/10303/umc.json');
  }

  /**
   * Obtiene la unidad de medida de tráfico desde un archivo JSON.
   * 
   * @param catalogo - Parámetro que indica el catálogo de unidad de medida de tráfico.
   * @returns Observable con la respuesta de la unidad de medida de tráfico.
   */
  getUmt(catalogo: string): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/10303/umt.json');
  }

  /**
   * Obtiene la procedencia de otro tipo de mercancía desde un archivo JSON.
   * 
   * @param catalogo - Parámetro que indica el catálogo de procedencia de otro tipo de mercancía.
   * @returns Observable con la respuesta de la procedencia de otro tipo de mercancía.
   */
  getProcedenciaOtro(catalogo: string): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/10303/procedencia-otro.json');
  }

  /**
   * Obtiene la condición de la mercancía desde un archivo JSON.
   * 
   * @param catalogo - Parámetro que indica el catálogo de condición de la mercancía.
   * @returns Observable con la respuesta de la condición de la mercancía.
   */
  getCondicionMercancia(catalogo: string): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/10303/condicion-mercancia.json');
  }

  /**
   * Obtiene el país de origen del medicamento desde un archivo JSON.
   * 
   * @param catalogo - Parámetro que indica el catálogo de país de origen del medicamento.
   * @returns Observable con la respuesta del país de origen del medicamento.
   */
  getPaisOrigenMedicamento(catalogo: string): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/10303/pais-origen-medicamento.json');
  }

  /**
   * Obtiene el país de procedencia del medicamento desde un archivo JSON.
   * 
   * @param catalogo - Parámetro que indica el catálogo de país de procedencia del medicamento.
   * @returns Observable con la respuesta del país de procedencia del medicamento.
   */
  getPaisProcedenciaMedicamento(catalogo: string): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/10303/pais-procedencia-medicamento.json');
  }
  
  /**
   * Obtiene la lista de países desde un archivo JSON.
   * 
   * @param catalogo - Parámetro que indica el catálogo de países.
   * @returns Observable con la respuesta de los países.
   */
  getPaises(catalogo: string): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/10303/paises.json');
  }

  /**
   * Obtiene la lista de documentos de residencia desde un archivo JSON.
   * 
   * @param catalogo - Parámetro que indica el catálogo de documentos de residencia.
   * @returns Observable con la respuesta de los documentos de residencia.
   */
  getDocumentoResidencia(catalogo: string): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/10303/documento-residencia.json');
  }

  /**
   * Busca el contribuyente a partir de su RFC.
   * 
   * @param rfc - RFC del contribuyente a buscar.
   * @returns Observable con la respuesta del contribuyente.
   */
  buscarContribuyente(rfc: string): Observable<ContribuyenteRespuesta> {
    return this.http.get<ContribuyenteRespuesta>('assets/json/10303/donatario-datos.json');
  }
}
