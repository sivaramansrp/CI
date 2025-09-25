import {
  InfoRegistro,
  PlantasDireccionModelo,
  SubfabricanteDireccionModelo,
  Tramite80207State,
} from '../modelos/subfabricante.model';

import { Observable, catchError, map, throwError } from 'rxjs';
import { BaseResponse } from '@libs/shared/data-access-user/src/core/models/shared/base-response.model';
import { CadenaOriginalRequest } from '../../130118/model/request/cadena-original-request.model';
import { FirmarRequest } from '@libs/shared/data-access-user/src/core/models/shared/firma-electronica/request/firmar-request.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PROC_80207 } from '../servers/api-route';
import { RespuestaCatalogos } from '@ng-mf/data-access-user';
import { Tramites80207Store } from '../estados/tramite80207.store';

/**
 * Decorador que marca una clase como un servicio que puede ser inyectado en otros componentes o servicios.
 * Este servicio está registrado en el inyector raíz.
 * @export
 * @class Injectable
 */
@Injectable({
  providedIn: 'root',
})
/**
 * @fileoverview Servicio para la gestión de datos de submanufactureras.
 * Este servicio maneja la obtención de datos relacionados con las submanufactureras,
 * incluyendo la lista de estados, subfabricantes disponibles y seleccionados.
 * @module serviciosSubfabricanteService --80207
 */
export class SubfabricanteService {
  constructor(private readonly http: HttpClient,
    private tramites80207Store: Tramites80207Store

  ) {
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
        .pipe(map((res) => res)));
   
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
        .pipe(map((res) => res)));
  }
  /**
   * Obtiene la lista de plantas disponibles.
   * @method getPlantasDisponibles
   * @returns {Observable<PlantasDireccionModelo[]>} Observable con la lista de plantas disponibles.
   * */

  getPlantasDisponibles(): Observable<PlantasDireccionModelo[]> {
    return this.http.get<PlantasDireccionModelo[]>(
      'assets/json/80207/plantas-disponibles.json'
    ).pipe(
      map((res) => res)
    );
  }

  /**
   * Actualiza el estado del formulario con los datos proporcionados.
   * @method actualizarEstadoFormulario
   * @param {Tramite80207State} DATOS - Datos del trámite 80207.
   */

  actualizarEstadoFormulario(DATOS: Tramite80207State): void{
    this.tramites80207Store.setInfoRegistro(DATOS.infoRegistro);
    this.tramites80207Store.setDatosContr(DATOS.datosSubcontratista);
    this.tramites80207Store.setPlantasBuscadas(DATOS.plantasBuscadas);
    this.tramites80207Store.setPlantas(DATOS.plantas);
    this.tramites80207Store.setFormValida(DATOS.formaValida);
  }

  /**
   * Obtiene los datos de servicios de submanufactureras.
   * @method getServiciosData
   * @returns {Observable<Tramite80207State>} Observable con los datos de servicios.
   */
  getServiciosData(): Observable<Tramite80207State> {
    return this.http.get<Tramite80207State>('assets/json/80207/datos-submanufactureras.json');
  }

   /**
       * Envía una solicitud de firma electrónica.
       * @param idSolicitud - ID de la solicitud a firmar.
       * @param body - Cuerpo de la solicitud de firma.
       * @returns Observable con la respuesta del servidor.
       */
    enviarFirma<T>(idSolicitud: string | number, body: FirmarRequest): Observable<BaseResponse<T>> {
      return this.http.post<BaseResponse<T>>(PROC_80207.API_POST_FIRMA(String(idSolicitud)), body).pipe(
        map(response => response),
        catchError(() => {
          const ERROR = new Error(`Error al firmar solicitud con ID ${idSolicitud}`);
          return throwError(() => ERROR);
        })
      );
    }

     /**
       * Obtiene la cadena original del trámite 130118.
       * @param body Objeto que contiene los datos necesarios para generar la cadena original.
       * @returns Un observable que emite la respuesta del servidor con la cadena original.
       */
      obtenerCadenaOriginal<T>(idSolicitud: string, body: CadenaOriginalRequest): Observable<BaseResponse<T>> {
        return this.http.post<BaseResponse<T>>(PROC_80207.API_POST_CADENA_ORIGINAL(idSolicitud), body).pipe(
          map((response) => response),
          catchError(() => {
            const ERROR = new Error(`Error al obtener la cadena original en ${PROC_80207.API_POST_CADENA_ORIGINAL(idSolicitud)}`);
            return throwError(() => ERROR);
          })
        );
      }

  
}
