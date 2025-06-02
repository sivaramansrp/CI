/**
 * @Injectable
 * @description Servicio para obtener los datos del permiso IMMEX.
 */
import { HttpClient } from '@angular/common/http';
import { ImmexRegistroState } from '../../estados/tramites/tramite80203.store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermisoImmexDatosService {
  /**
   * @property {string} jsonUrl
   * @description URL del archivo JSON que contiene los datos del permiso IMMEX.
   */
  private jsonUrl = '/assets/json/80203/immex-table.json';

  /**
   * @constructor
   * @description Constructor que inicializa el cliente HTTP para realizar solicitudes.
   * @param {HttpClient} httpClient - Cliente HTTP para realizar solicitudes.
   */
  constructor(private httpClient: HttpClient) {}

  /**
   * @method getDatos
   * @description Obtiene los datos del permiso IMMEX desde el archivo JSON.
   * @returns {Observable<any[]>} Observable que emite los datos del permiso IMMEX.
   */
  getDatos(): Observable<any> {
    return this.httpClient.get<any[]>(this.jsonUrl).pipe(
    );
  }  
  getRegistroTomaMuestrasMercanciasData(): Observable<ImmexRegistroState> {
    return this.httpClient.get<ImmexRegistroState>('assets/json/80203/immexRegistro.json');
  }
}