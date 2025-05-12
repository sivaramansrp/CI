/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty-function */
/**
 * @@Injectable
 * @description Servicio para obtener los datos del permiso IMMEX.
 */
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { fraccionInfo } from '../../modelos/immex-registro-de-solicitud-modality.model';
import { immexInfo } from '../../modelos/immex-registro-de-solicitud-modality.model';
import { nicoInfo } from '../../modelos/immex-registro-de-solicitud-modality.model';

@Injectable({
  providedIn: 'root'
})
export class PermisoImmexDatosService {
  /**
   * @property {string} jsonUrl - URL del archivo JSON que contiene los datos del permiso IMMEX.
   */
  private jsonUrl = '/assets/json/80203/immex-table.json';
  /**
   * @constructor
   * @param {HttpClient} httpClient - Cliente HTTP para realizar solicitudes.
   */
  constructor(private httpClient: HttpClient) {}

  /**
   * @method getDatos
   * @description Obtiene los datos del permiso IMMEX desde el archivo JSON.
   * @returns {Observable<any[]>} Observable con los datos del permiso IMMEX.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getDatos(): Observable<any> {
    return this.httpClient.get<any[]>(this.jsonUrl).pipe(
    );
  }  
}