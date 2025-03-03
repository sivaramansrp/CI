import { Observable, map } from 'rxjs';
import {
  SubManufacturerDatos,
  SubfacrintaTablaModelo,
} from '../modelos/submanufacturer-extension';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaCatalogos } from '@ng-mf/data-access-user';

@Injectable()
/**
 * @fileoverview Servicio para la gestión de datos de submanufactureras.
 * Este servicio maneja la obtención de datos relacionados con las submanufactureras,
 * incluyendo la lista de estados, subfabricantes disponibles y seleccionados.
 * @module serviciosSubmanufacturerService --80207
 */
export class SubManufacturerService {
  constructor(private readonly http: HttpClient) {
    //El constructor está intencionadamente vacío ya que solo inyecta el servicio HttpClient.
  }

  /**
   * Obtiene los datos de registro y subcontratista.
   * @method getDatos
   * @returns {Observable<any>} Observable con los datos de registro y subcontratista.
   */
  getDatos(): Observable<SubManufacturerDatos> {
    return this.http
      .get<SubManufacturerDatos>('assets/json/80207/submanufacturer-datos.json')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .pipe(map((response: any) => response.data));
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
  getSubfabricantesDisponibles(): Observable<SubfacrintaTablaModelo[]> {
    return this.http
      .get<SubfacrintaTablaModelo[]>(
        'assets/json/80207/submanufactureras-disponibles-datos.json'
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .pipe(map((response: any) => response.data));
  }
}
