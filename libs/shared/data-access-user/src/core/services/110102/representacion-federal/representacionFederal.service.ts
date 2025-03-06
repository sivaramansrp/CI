/**
 *  Este servicio proporciona métodos para obtener datos relacionados con la representación federal.
 */

import { Injectable } from '@angular/core';
import { HttpCoreService } from '../../shared/http/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RepresentacionfederalService {

  /**
   * @constructor
   * {HttpCoreService} http - Servicio HTTP para realizar solicitudes.
   */
  constructor(private http: HttpCoreService) { }
  
  /**
   * @method getEntidadFederativa
   *  Obtiene los datos de la entidad federativa desde un archivo JSON.
   * @returns {Observable<any>} Un observable que emite los datos obtenidos.
   */
  getEntidadFederativa(): Observable<any> {
    return this.http.get('./assets/json/110102/entidadfederativa.json');
  }

  /**
   * @method getRepresentacionfederal
   *  Obtiene los datos de la representación federal desde un archivo JSON.
   * @param {string} entidadFederativa - La entidad federativa para la cual se obtienen los datos.
   * @returns {Observable<any>} Un observable que emite los datos obtenidos.
   */
  getRepresentacionfederal(entidadFederativa: string): Observable<any> {
    return this.http.get('./assets/json/110102/representacionfederal.json');
  }
}