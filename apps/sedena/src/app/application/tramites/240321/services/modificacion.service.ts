/**
 * @fileoverview This file defines the `ModificacionService`, which provides methods to fetch data 
 * related to "DestinoFinal" and "Proveedor" entities from JSON files. The service uses Angular's 
 * `HttpClient` to perform HTTP requests and returns the data as observables.
 */

import { DestinoFinalRespuesta, ProveedorRespuesta } from "../models/modificacion.model";
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tramite240321State } from "../estados/tramite240321Store.store";

/**
 * @class ModificacionService
 * @description Servicio para manejar la obtención de datos de las entidades "DestinoFinal" y "Proveedor".
 * Este servicio obtiene datos de archivos JSON locales y los proporciona como observables.
 */
@Injectable({
  providedIn: 'root',
})
export class ModificacionService {
  /**
   * @private
   * @property {string} apiUrl - URL base para acceder a los archivos JSON que contienen los datos.
   */
  private apiUrl = 'assets/json/240321/';

  /**
   * @constructor
   * @param {HttpClient} http - Cliente HTTP de Angular para realizar solicitudes HTTP.
   */
  constructor(private http: HttpClient) {}

  /**
   * @method getDestinatariosFinales
   * @description Obtiene la lista de entidades "DestinoFinal" desde un archivo JSON.
   * @returns {Observable<DestinoFinalRespuesta>} Observable que emite la respuesta con los datos de "DestinoFinal".
   */
  getDestinatariosFinales(): Observable<DestinoFinalRespuesta> {
    return this.http.get<DestinoFinalRespuesta>(`${this.apiUrl}destino-final.json`)
      .pipe(map((res) => res));
  }

  /**
   * @method getProveedores
   * @description Obtiene la lista de entidades "Proveedor" desde un archivo JSON.
   * @returns {Observable<ProveedorRespuesta>} Observable que emite la respuesta con los datos de "Proveedor".
   */
  getProveedores(): Observable<ProveedorRespuesta> {
    return this.http.get<ProveedorRespuesta>(`${this.apiUrl}proveedor.json`)
      .pipe(map((res) => res));
  }
  /**
   * @method getProveedores
   * @description Obtiene la lista de entidades "Proveedor" desde un archivo JSON.
   * @returns {Observable<ProveedorRespuesta>} Observable que emite la respuesta con los datos de "Proveedor".
   */
  getTrimateState240321(): Observable<Tramite240321State> {
    return this.http.get<Tramite240321State>(`${this.apiUrl}tramateState240321.json`)
      .pipe(map((res) => res));
  }
}