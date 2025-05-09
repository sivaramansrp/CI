/**
 * @fileoverview This file defines the `ModificacionService`, which provides methods to fetch data 
 * related to "DestinoFinal" and "Proveedor" entities from JSON files. The service uses Angular's 
 * `HttpClient` to perform HTTP requests and returns the data as observables.
 */

import { DestinoFinalRespuesta, ProveedorRespuesta } from "../models/modificacion.model";
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * @class ModificacionService
 * @description Service to handle data retrieval for "DestinoFinal" and "Proveedor" entities.
 * This service fetches data from local JSON files and provides it as observables.
 */
@Injectable({
  providedIn: 'root',
})
export class ModificacionService {
  /**
   * @private
   * @property {string} apiUrl - Base URL for accessing the JSON files containing the data.
   */
  private apiUrl = 'assets/json/240321/';

  /**
   * @constructor
   * @param {HttpClient} http - Angular's HTTP client for making HTTP requests.
   */
  constructor(private http: HttpClient) {}

  /**
   * @method getDestinatariosFinales
   * @description Fetches the list of "DestinoFinal" entities from a JSON file.
   * @returns {Observable<DestinoFinalRespuesta>} Observable emitting the response containing "DestinoFinal" data.
   */
  getDestinatariosFinales(): Observable<DestinoFinalRespuesta> {
    return this.http.get<DestinoFinalRespuesta>(`${this.apiUrl}destino-final.json`)
      .pipe(map((res) => res));
  }

  /**
   * @method getProveedores
   * @description Fetches the list of "Proveedor" entities from a JSON file.
   * @returns {Observable<ProveedorRespuesta>} Observable emitting the response containing "Proveedor" data.
   */
  getProveedores(): Observable<ProveedorRespuesta> {
    return this.http.get<ProveedorRespuesta>(`${this.apiUrl}proveedor.json`)
      .pipe(map((res) => res));
  }
}