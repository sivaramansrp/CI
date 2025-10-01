/**
 * @Injectable
 * @description Servicio para obtener y gestionar los datos del permiso IMMEX.
 * Proporciona métodos para consultar datos desde archivos JSON y actualizar el estado del registro IMMEX en el store.
 *
 * - Permite obtener los datos del permiso IMMEX desde archivos locales.
 * - Actualiza el estado del formulario en el store de Akita.
 * - Expone métodos para la integración con componentes y otros servicios.
 *
 * @example
 * // Inyección en un componente
 * constructor(private permisoImmexDatosService: PermisoImmexDatosService) {}
 */
import { BuscarPayload, ImmexTablaJson, PermisoImmexGridDatos, fraccionInfo, immexRegistroform } from '../../modelos/immex-registro-de-solicitud-modality.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  ImmexRegistroState,
  ImmexRegistroStore,
} from '../../estados/tramites/tramite80203.store';
import { Observable, catchError, map, throwError } from 'rxjs';
import { API_ROUTES } from '../../../../shared/servers/api-route';
import { JSONResponse } from '@libs/shared/data-access-user/src';


@Injectable({
  providedIn: 'root'
})

/**
 * Servicio para obtener y gestionar los datos del permiso IMMEX.
 * Permite consultar datos desde archivos JSON y actualizar el estado del registro IMMEX en el store.
 */
export class PermisoImmexDatosService {
  /**
   * Ruta al archivo JSON con los datos de la tabla IMMEX.
   * @type {string}
   */
  private jsonUrl = '/assets/json/80203/immex-table.json';

  /**
   * @constructor
   * @description Constructor que inicializa el cliente HTTP y el store para el registro IMMEX.
   * @param {HttpClient} httpClient - Cliente HTTP para realizar solicitudes.
   * @param {ImmexRegistroStore} tramite80203Store - Store para manejar el estado del registro IMMEX.
   */
  constructor(private httpClient: HttpClient, private readonly tramite80203Store: ImmexRegistroStore) {}

    /**
   * Obtiene los datos de la tabla IMMEX desde un archivo JSON local.
   * @returns {Observable<ImmexTablaJson[]>} Observable con los datos filtrados de la tabla IMMEX.
   */
  getDatos(permisoImmexDatos: string): Observable<ImmexTablaJson[]> {
    return this.httpClient.get<ImmexTablaJson[]>(this.jsonUrl).pipe(
      map(response => response.filter(item => item.permisoImmex === permisoImmexDatos))
    );
  }

    /**
   * Obtiene los datos del registro de toma de muestras y mercancías desde un archivo JSON local.
   * @returns {Observable<ImmexRegistroState>} Observable con el estado del registro IMMEX.
   */
  getRegistroTomaMuestrasMercanciasData(): Observable<ImmexRegistroState> {
    return this.httpClient.get<ImmexRegistroState>('assets/json/80203/immexRegistro.json');
  }

    /**
   * Actualiza el estado del formulario en el store de Akita con los datos proporcionados.
   * @param {immexRegistroform} DATOS - Datos del formulario de registro IMMEX.
   * @returns {void}
   */
  actualizarEstadoFormulario(DATOS: immexRegistroform): void {
    this.tramite80203Store.setImmexRegistro(DATOS);
  }
   getPermisoImmex(body: BuscarPayload): Observable<JSONResponse> {
      return this.httpClient.post<JSONResponse>(API_ROUTES('/sat-t80203','80203').buscarPermisoImmex, body).pipe(
        map((response) => response),
        catchError(() => {
          const ERROR = new Error(`Error al obtener la lista de plantas en ${API_ROUTES('/sat-t80203','80203').buscarPermisoImmex}`);
          return throwError(() => ERROR);
        })
      );
    }

    // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-explicit-any
    mapApiResponseToPermisoImmexGridDatos(apiResponse: any[]): PermisoImmexGridDatos[] {
      // eslint-disable-next-line complexity
     return apiResponse.map((item, index) => {
        return {
          consecutivo: (index + 1).toString().padStart(3, '0'),
          numeroPrograma: item.numeroPrograma,
          fraccion: item.fraccion,
          descripcion: item.descripcion,
          umt: item.umt,
          cantidadAutorizada: item.cantidadAutorizada?.toString(),
          fechaInicio: item.fechaInicio,
          fechaFin: item.fechaFin,
          estatus: item.testado !== 'true'
        };
      });
    }
    // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-explicit-any
mapApiResponseToFraccionExportacion(apiResponse: any[]): fraccionInfo[] {
  // eslint-disable-next-line complexity
    return apiResponse.map((item, index) => {
      const FRACCION_ARANCELARIA = item.fraccionArancelaria || {};
      
      return {
        idFraccion: (index + 1).toString(),
        clave: FRACCION_ARANCELARIA.cveFraccion || item.cveFraccion ,
        fraccionPadre: item.fraccionPadre || FRACCION_ARANCELARIA.fraccionPadre,
        umt: FRACCION_ARANCELARIA.umt || item.umt,
        descripcion: FRACCION_ARANCELARIA.descripcion || item.descripcion,
        descripcionUsuario: FRACCION_ARANCELARIA.descripcionUsuario || item.descripcionUsuario,
        solicitaBaja: item.testado,
        estatus: item.estatus !== undefined ? item.estatus : ''
      };
    });
  }
}
