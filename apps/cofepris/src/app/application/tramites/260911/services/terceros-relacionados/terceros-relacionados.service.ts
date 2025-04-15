/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * @service
 * @name TercerosRelacionadosService
 * @description Service to handle operations related to "terceros relacionados" (related third parties), 
 * including fetching data for manufacturers and recipients.
 */

import { catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * @description Injectable service for managing operations related to "terceros relacionados".
 */
@Injectable({
  providedIn: 'root'
})
export class TercerosRelacionadosService {
  /**
   * @property {string} dataTableLink - Path to the JSON file containing manufacturer table data.
   */
  dataTableLink = 'assets/json/260911/datos-de-tabla.json'; // Updated path

  /**
   * @property {string} destinatarioTableLink - Path to the JSON file containing recipient table data.
   */
  destinatarioTableLink = 'assets/json/260911/destinatario-de-tabla.json'; // Updated path

  /**
   * @constructor
   * @param {HttpClient} http - Angular's HttpClient for making HTTP requests.
   */
  constructor(private http: HttpClient) {
    //
  }

  /**
   * @method obtenerInformaciónDeTablaDeFabricantes
   * @description Fetches data for the manufacturer table from the specified JSON file.
   * @returns {Observable<any>} An observable containing the manufacturer table data or an empty array in case of an error.
   */
  obtenerInformaciónDeTablaDeFabricantes(): Observable<any> {
    return this.http.get(this.dataTableLink).pipe(
      catchError((_error: any) => {
        // Log the error and return an empty array as a fallback
        return of([]); // Return an empty array or a default value
      })
    );
  }

  /**
   * @method obtenerInformaciónDeTablaDeDestinatraios
   * @description Fetches data for the recipient table from the specified JSON file.
   * @returns {Observable<any>} An observable containing the recipient table data or an empty array in case of an error.
   */
  obtenerInformaciónDeTablaDeDestinatraios(): Observable<any> {
    return this.http.get(this.destinatarioTableLink).pipe(
      catchError((_error: any) => {
        // Log the error and return an empty array as a fallback
        return of([]); // Return an empty array or a default value
      })
    );
  }
}