
import { CATALOGO_ENTIDADES_FEDERATIVAS, CATALOGO_ESTADOS, CATALOGO_IDIOMA, CATALOGO_IMMEX, CATALOGO_MEDIO_TRANSPORTE, CATALOGO_NICO, CATALOGO_PAISES, CATALOGO_PAISES_BLOQUE, CATALOGO_REPRESENTACION_FEDERAL, CATALOGO_TIPO_FACTURA, CATALOGO_TRATADOS_ACUERDOS, CATALOGO_UNIDAD_MASA_BRUTA, COMUN_URL, UNIDADES_MEDIDA_COMERCIAL } from '../../servers/api-router';
import { BaseResponse } from '../../models/shared/base-response.model';
import { Catalogo } from '../../models/shared/catalogos.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogoServices {
  
  host: string;

  constructor(private http: HttpClient) {
    this.host = `${COMUN_URL.BASE_URL}`;
  }


  /*
   * Obtiene el catálogo de servicios IMMEX.
   * @param {string} tramite - El ID del trámite.
   * @returns {Observable<BaseResponse<Catalogo[]>>} - Observable con la respuesta del servidor.
   */
  immexCatalogo(tramite: string): Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${CATALOGO_IMMEX(tramite)}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
  }

  /*
   * Obtiene el catálogo de estados.
   * @param {string} tramite - El ID del trámite.
   * @returns {Observable<BaseResponse<Catalogo[]>>} - Observable con la respuesta del servidor.
   */
  estadosCatalogo(tramite: string): Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${CATALOGO_ESTADOS(tramite)}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
  }

  /*
   * Obtiene el catálogo de países.
   * @param {string} tramite - El ID del trámite.
   * @returns {Observable<BaseResponse<Catalogo[]>>} - Observable con la respuesta del servidor.
   */
  paisesCatalogo(tramite: string, paisDestino: string): Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${CATALOGO_PAISES(tramite, paisDestino)}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
  }

  /*
   * Obtiene el catálogo de NICO.
   * @param {string} tramite - El ID del trámite.
   * @returns {Observable<BaseResponse<Catalogo[]>>} - Observable con la respuesta del servidor.
   */
  nicosCatalogo(tramite: string, claveFraccion: string): Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${CATALOGO_NICO(tramite, claveFraccion)}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
  }
  /*
 * Obtiene el catálogo de tratados y acuerdos.
 * @param {string} tramite - El ID del trámite.
 * @param {string} ideTipoTratadoAcuerdo - El ID del tipo de tratado/acuerdo.
 * @returns {Observable<BaseResponse<Catalogo[]>>}
 */
tratadosAcuerdosCatalogo(tramite: string, ideTipoTratadoAcuerdo: string): Observable<BaseResponse<Catalogo[]>> {
  const ENDPOINT = `${this.host}${CATALOGO_TRATADOS_ACUERDOS(tramite, ideTipoTratadoAcuerdo)}`;
  return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
}

/*
 * Obtiene el catálogo de países (bloques).
 * @param {string} tramite - El ID del trámite.
 * @returns {Observable<BaseResponse<Catalogo[]>>}
 */
paisesBloqueCatalogo(tramite: string): Observable<BaseResponse<Catalogo[]>> {
  const ENDPOINT = `${this.host}${CATALOGO_PAISES_BLOQUE(tramite)}`;
  return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
}

/*
 * Obtiene el catálogo de entidades federativas.
 * @param {string} tramite - El ID del trámite.
 * @returns {Observable<BaseResponse<Catalogo[]>>}
 */
entidadesFederativasCatalogo(tramite: string): Observable<BaseResponse<Catalogo[]>> {
  const ENDPOINT = `${this.host}${CATALOGO_ENTIDADES_FEDERATIVAS(tramite)}`;
  return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
}

/*
 * Obtiene el catálogo de representación federal.
 * @param {string} tramite - El ID del trámite.
 * @param {string} cveEntidad - La clave de la entidad.
 * @returns {Observable<BaseResponse<Catalogo[]>>}
 */
representacionFederalCatalogo(tramite: string, cveEntidad: string): Observable<BaseResponse<Catalogo[]>> {
  const ENDPOINT = `${this.host}${CATALOGO_REPRESENTACION_FEDERAL(tramite, cveEntidad)}`;
  return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
}

/*
 * Obtiene el catálogo de tipos de factura.
 * @param {string} tramite - El ID del trámite.
 * @returns {Observable<BaseResponse<Catalogo[]>>}
 */
tipoFacturaCatalogo(tramite: string): Observable<BaseResponse<Catalogo[]>> {
  const ENDPOINT = `${this.host}${CATALOGO_TIPO_FACTURA(tramite)}`;
  return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
}

/*
 * Obtiene el catálogo de unidad de medida de la masa bruta.
 * @param {string} tramite - El ID del trámite.
 * @returns {Observable<BaseResponse<Catalogo[]>>}
 */
unidadMasaBrutaCatalogo(tramite: string): Observable<BaseResponse<Catalogo[]>> {
  const ENDPOINT = `${this.host}${CATALOGO_UNIDAD_MASA_BRUTA(tramite)}`;
  return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
}

/*
 * Obtiene el catálogo de idiomas.
 * @param {string} tramite - El ID del trámite.
 * @returns {Observable<BaseResponse<Catalogo[]>>}
 */
catalogoIdioma(tramite: string): Observable<BaseResponse<Catalogo[]>> {
  const ENDPOINT = `${this.host}${CATALOGO_IDIOMA(tramite)}`;
  return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
}

/*
 * Obtiene el catálogo de medios de transporte.
 * @param {string} tramite - El ID del trámite.
 * @returns {Observable<BaseResponse<Catalogo[]>>}
 */
catalogoMedioTransporte(tramite: string): Observable<BaseResponse<Catalogo[]>> {
  const ENDPOINT = `${this.host}${CATALOGO_MEDIO_TRANSPORTE(tramite)}`;
  return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
}

/*
 * Obtiene el catálogo de unidades de medida comercial.
 * @param {string} tramite - El ID del trámite.
 * @returns {Observable<BaseResponse<Catalogo[]>>}
 */
unidadesMedidaComercialCatalogo(tramite: string): Observable<BaseResponse<Catalogo[]>> {
  const ENDPOINT = `${this.host}${UNIDADES_MEDIDA_COMERCIAL(tramite)}`;
  return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
}
}