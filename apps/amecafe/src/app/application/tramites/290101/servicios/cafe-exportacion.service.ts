/**
 * @@Injectable
 * @description Servicio para obtener los datos del cafe exportacion.
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CafeExportacionService {
  /**
   * @property {string} jsonUrl - URL del archivo JSON que contiene los datos del cafe exportacion.
   */
  private jsonUrl = '/assets/json/290101/';
  /**
   * @constructor
   * @param {HttpClient} httpClient - Cliente HTTP para realizar solicitudes.
   */
  constructor(private http: HttpClient) {
 // Se puede agregar aquí la lógica del constructor si es necesario
  }

  /**
   * @method getDatos
   * @description Obtiene los datos del cafe exportacion desde el archivo JSON.
   * @returns {Observable<any[]>} Observable con los datos del cafe exportacion.
   */
/* eslint-disable @typescript-eslint/no-explicit-any */

  getDatos(): Observable<any> {
    return this.http.get<any[]>(this.jsonUrl).pipe(
    );
  } 
  
}