
import { CATALOGO_ESTADOS, CATALOGO_IMMEX, CATALOGO_MEDIO_TRANSPORTE, CATALOGO_NICO, CATALOGO_PAISES, CATALOGO_PAISES_BLOQUE, CATALOGO_TRATADO_ACUERDO, COMUN_URL } from '../../servers/api-router';
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
  paisesCatalogo(tramite: string): Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${CATALOGO_PAISES(tramite)}`;
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

  /**
   * Obtiene el catálogo de tratados de acuerdo para un trámite específico.
   *
   * @param tramite - Identificador del trámite para el cual se solicita el catálogo.
   * @returns Un observable que emite la respuesta base con el arreglo de elementos del catálogo.
   */
  tratadoAcuerdoCatalogo(tramite: string): Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${CATALOGO_TRATADO_ACUERDO(tramite)}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
  }

  /**
   * Obtiene el catálogo de países bloqueados para un trámite específico.
   *
   * @param tramite - Identificador del trámite para el cual se requiere el catálogo de países bloqueados.
   * @returns Un observable que emite la respuesta base con el listado de países bloqueados en el catálogo.
   */
  paisBloqueCatalogo(tramite: string): Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${CATALOGO_PAISES_BLOQUE(tramite)}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
  }

  /**
   * Obtiene el catálogo de medios de transporte para un trámite específico.
   *
   * @param tramite - Identificador del trámite para el cual se solicita el catálogo de medios de transporte.
   * @returns Un observable que emite la respuesta base con el listado de medios de transporte disponibles.
   */
  medioTransporteCatalogo(tramite: string): Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${CATALOGO_MEDIO_TRANSPORTE(tramite)}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
   
  }

  }