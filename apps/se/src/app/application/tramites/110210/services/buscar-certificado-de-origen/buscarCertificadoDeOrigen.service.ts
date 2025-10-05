/**
 *  Este servicio proporciona métodos para buscar certificados de origen.
 */

import { Catalogo, HttpCoreService } from '@libs/shared/data-access-user/src';
import { ComplimentosService } from '../../../../shared/services/complimentos.service';
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
  constructor(private http: HttpCoreService,
    private complimentosService:ComplimentosService
  ) { 
    this.setProcedure();
    this.setProcedureNo();
  }
  
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

  /**
 * Establece el procedimiento actual para la gestión de trámites industriales.
 * Asigna el identificador de procedimiento 'st_t80101' y lo configura en el servicio de cumplimientos.
 *
 * @returns {void} No retorna ningún valor.
 */
  setProcedure():void{
    const PROCEDURE='sat-t110210';
    this.complimentosService.setProcedure(PROCEDURE);
  }

  /**
 * Establece el número de procedimiento actual para la gestión de trámites industriales.
 * Asigna el número de procedimiento '80101' y lo configura en el servicio de cumplimientos.
 *
 * @returns {void} No retorna ningún valor.
 */
  setProcedureNo(): void {
    this.complimentosService.setProcedureNo('110210');
  }
}