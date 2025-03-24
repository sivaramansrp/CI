/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty-function */
/**
 * @@Injectable
 * @description Servicio para obtener los datos del permiso IMMEX.
 */
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoTablaServicios {
  /**
   * @property {string} jsonUrl - URL del archivo JSON que contiene los datos del permiso IMMEX.
   */
  private jsonUrl = '/assets/json/290101/producto-tabla-datos.json';
  /**
   * @constructor
   * @param {HttpClient} httpClient - Cliente HTTP para realizar solicitudes.
   */
  constructor(private http: HttpClient) {}

  /**
   * @method getDatos
   * @description Obtiene los datos del permiso IMMEX desde el archivo JSON.
   * @returns {Observable<any[]>} Observable con los datos del permiso IMMEX.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obtenerDatos(): Observable<any> {
    return this.http.get<any[]>(this.jsonUrl).pipe(
    );
  } 

  
   
}