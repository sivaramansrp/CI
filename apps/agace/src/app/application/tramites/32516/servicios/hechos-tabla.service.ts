/**
 * @Injectable
 * @description Servicio para obtener los datos de la tabla de hechos.
 * Este servicio realiza solicitudes HTTP para cargar los datos desde un archivo JSON.
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HechosTablaServicios {
  /**
   * URL del archivo JSON que contiene los datos de la tabla de hechos.
   * @type {string}
   * @private
   */
  private jsonUrl = '/assets/json/32516/hechos-tabla-datos.json';
  
  /**
   * Constructor del servicio.
   * Inicializa el cliente HTTP para realizar solicitudes.
   * @param {HttpClient} http - Cliente HTTP para realizar solicitudes.
   */
  constructor(private http: HttpClient) {
    // Se puede agregar aquí la lógica del constructor si es necesario
  }

  /**
   * Obtiene los datos de la tabla de hechos desde el archivo JSON.
   * @method obtenerDatos
   * @returns {Observable<any[]>} Observable con los datos de la tabla de hechos.
   * @description Realiza una solicitud HTTP GET para cargar los datos.
   */
  /* eslint-disable @typescript-eslint/no-explicit-any */
  obtenerDatos(): Observable<any> {
    return this.http.get<any[]>(this.jsonUrl).pipe(
      // Aquí se pueden agregar operadores de RxJS si es necesario
    );
  } 

  
   
}