/**
 * @@Injectable
 * @description Servicio para obtener los datos del regiones compra.
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoTablaServicios {
  /**
   * @property {string} jsonUrl - URL del archivo JSON que contiene los datos del regiones compra.
   */
  private jsonUrl = '/assets/json/290101/producto-tabla-datos.json';
  /**
   * @constructor
   * @param {HttpClient} httpClient - Cliente HTTP para realizar solicitudes.
   */
  constructor(private http: HttpClient) {
    // Se puede agregar aquí la lógica del constructor si es necesario
  }

  /**
   * @method getDatos
   * @description Obtiene los datos del regiones compra desde el archivo JSON.
   * @returns {Observable<any[]>} Observable con los datos del regiones compra.
   */
  /* eslint-disable @typescript-eslint/no-explicit-any */
  obtenerDatos(): Observable<any> {
    return this.http.get<any[]>(this.jsonUrl).pipe(
    );
  } 

  
   
}