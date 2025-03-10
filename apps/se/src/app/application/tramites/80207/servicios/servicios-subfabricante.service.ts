import {
  InfoRegistro,
  SubfabricanteDireccionModelo,
} from '../modelos/subfabricante.model';

import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaCatalogos } from '@ng-mf/data-access-user';


@Injectable()
/**
 * @fileoverview Servicio para la gestión de datos de submanufactureras.
 * Este servicio maneja la obtención de datos relacionados con las submanufactureras,
 * incluyendo la lista de estados, subfabricantes disponibles y seleccionados.
 * @module serviciosSubfabricanteService --80207
 */
export class SubfabricanteService {
  constructor(private readonly http: HttpClient) {
    //El constructor está intencionadamente vacío ya que solo inyecta el servicio HttpClient.
  }

  /**
   * Obtiene los datos de registro y subcontratista.
   * @method getDatos
   * @returns {Observable<InfoRegistro>} Observable con los datos de registro y subcontratista.
   */
  getDatos(): Observable<InfoRegistro> {
    return (
      this.http
        .get<InfoRegistro>('assets/json/80207/submanufacturer-datos.json')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .pipe(map((response: any) => response.data.infoRegistro))
    );
  }

  /**
   * Obtiene la lista de estados.
   * @method obtenerListaEstado
   * @returns {Observable<RespuestaCatalogos>} Observable con la lista de estados.
   */
  obtenerListaEstado(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(
      'assets/json/80207/estado-datos.json'
    );
  }

  /**
   * Obtiene la lista de subfabricantes disponibles.
   * @method getSubfabricantesDisponibles
   * @returns {Observable<TableData>} Observable con la lista de subfabricantes disponibles.
   */
  getSubfabricantesDisponibles(): Observable<SubfabricanteDireccionModelo[]> {
    return (
      this.http
        .get<SubfabricanteDireccionModelo[]>(
          'assets/json/80207/submanufactureras-disponibles-datos.json'
        )
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .pipe(map((response: any) => response.data))
    );
  }
}
