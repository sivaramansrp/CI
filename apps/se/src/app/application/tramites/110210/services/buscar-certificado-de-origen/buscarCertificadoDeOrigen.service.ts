/**
 *  Este servicio proporciona métodos para buscar certificados de origen.
 */

import { Catalogo, HttpCoreService } from '@libs/shared/data-access-user/src';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BuscarCertificadoDeOrigenService {

  /**
   * @constructor
   * {HttpCoreService} http - Servicio HTTP para realizar solicitudes.
   */
  constructor(private http: HttpCoreService) { }
  
  /**
   * @method getPaisBloque
   *  Obtiene los datos de la entidad federativa desde un archivo JSON.
   * @returns {Observable<Catalogo[]>} Un observable que emite los datos obtenidos.
   */
  getPaisBloque(): Observable<Catalogo[]> {
    return this.http.get('./assets/json/110210/pais-bloque.json');
  }

  /**
   * @method getTratadoAcuerdo
   *  Obtiene los datos de la representación federal desde un archivo JSON.
   * @returns {Observable<Catalogo[]>} Un observable que emite los datos obtenidos.
   */
  getTratadoAcuerdo(): Observable<Catalogo[]> {
    return this.http.get('./assets/json/110210/tratado-acuerdo.json');
  }
}