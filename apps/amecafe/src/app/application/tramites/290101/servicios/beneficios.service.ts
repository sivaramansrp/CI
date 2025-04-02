/**
 * @@Injectable
 * @description Servicio para obtener los datos del beneficios.
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeneficiosService {
  /**
   * @property {string} jsonUrl - URL del archivo JSON que contiene los datos del beneficios.
   */
  private jsonUrl = '/assets/json/220701/beneficios.json';
  /**
   * @constructor
   * @param {HttpClient} httpClient - Cliente HTTP para realizar solicitudes.
   */
  constructor(private httpClient: HttpClient) {
     // Se puede agregar aquí la lógica del constructor si es necesario
  }

  /**
   * @method getDatos
   * @description Obtiene los datos del beneficios desde el archivo JSON.
   * @returns {Observable<any[]>} Observable con los datos de las beneficios.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  /* eslint-disable @typescript-eslint/no-explicit-any */
  getDatos(): Observable<any> {
    return this.httpClient.get<any[]>(this.jsonUrl).pipe(
      // Se pueden agregar operadores adicionales si es necesario
    );
  }  
}