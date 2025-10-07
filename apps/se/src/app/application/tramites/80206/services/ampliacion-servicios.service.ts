/**
 * @fileoverview
 * El `AmpliacionServiciosService` es un servicio de Angular diseñado para gestionar las operaciones relacionadas con la ampliación de servicios.
 * Proporciona métodos para obtener datos desde archivos JSON y gestionar la visibilidad de ciertos elementos en la interfaz de usuario.
 * 
 * @module AmpliacionServiciosService
 * @description
 * Este servicio utiliza el cliente HTTP de Angular para realizar solicitudes a archivos JSON locales y expone observables para manejar datos y eventos.
 */

import { Arancelaria, BuscarPayload, DatosResponse, FraccionArancelariaApiResponse } from '../models/datos-info.model';
import { JSONResponse, RespuestaCatalogos } from '@ng-mf/data-access-user';
import { Observable, Subject, catchError, map, throwError } from 'rxjs';
import { API_ROUTES } from '../../../shared/servers/api-route';
import { AmpliacionServiciosState } from '../estados/tramite80206.store';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Tramite80206Store } from '../estados/tramite80206.store';

@Injectable({
  providedIn: 'root',
})
export class AmpliacionServiciosService {
  /**
   * Constructor del servicio.
   * @constructor
   * @param {HttpClient} http - Cliente HTTP de Angular para realizar solicitudes.
   * @param {Tramite80206Store} tramiteStore - Store para gestionar el estado del trámite de ampliación de servicios.
   */
  constructor(private readonly http: HttpClient, private tramiteStore: Tramite80206Store) {
    // No se necesita lógica de inicialización adicional.
  }

  /**
   * Subject para gestionar la visibilidad de ciertos elementos en la interfaz.
   * @property {Subject<boolean>} deberiaMostrar
   */
  private deberiaMostrar = new Subject<boolean>();

  /**
   * Observable que expone el estado de visibilidad de ciertos elementos.
   * @property {Observable<boolean>} deberiaMostrar$
   */
  deberiaMostrar$ = this.deberiaMostrar.asObservable();

  /**
   * Envía el estado de visibilidad a los suscriptores.
   * @method enviarDeberiaMostrar
   * @param {boolean} mostrar - Estado de visibilidad.
   */
  enviarDeberiaMostrar(mostrar: boolean): void {
    this.deberiaMostrar.next(mostrar);
  }

  /**
   * Obtiene los datos de ampliación de servicios desde un archivo JSON.
   * @method getDatos
   * @returns {Observable<DatosResponse[]>} - Observable con los datos obtenidos.
   */
  getDatos(): Observable<DatosResponse[]> {
    return this.http
      .get<DatosResponse[]>("assets/json/80206/ampliacion-anexo.json")
      .pipe(map((res) => res));
  }

  /**
   * Obtiene la lista de selección de reglas desde un archivo JSON.
   * @method obtenerReglaSelectList
   * @returns {Observable<RespuestaCatalogos>} - Observable con los datos obtenidos.
   */
  obtenerReglaSelectList(): Observable<RespuestaCatalogos> {
    return this.http
      .get<RespuestaCatalogos>("assets/json/80206/seleccionar-regla-dropdown.json")
      .pipe(map((res) => res));
  }

  /**
   * Obtiene la lista de selección de sectores desde un archivo JSON.
   * @method obtenerSectorSelectList
   * @returns {Observable<RespuestaCatalogos>} - Observable con los datos obtenidos.
   */
  obtenerSectorSelectList(): Observable<RespuestaCatalogos> {
    return this.http
      .get<RespuestaCatalogos>("assets/json/80206/sector-dropdown.json")
      .pipe(map((res) => res));
  }
  /**
   * Actualiza el estado del formulario con los datos proporcionados.
   * @method actualizarEstadoFormulario
   * @param {AmpliacionServiciosState} DATOS - Datos de ampliación de servicios.
   */
  actualizarEstadoFormulario(DATOS:AmpliacionServiciosState): void {
    this.tramiteStore.setInfoRegistro(DATOS.infoRegistro);
    this.tramiteStore.setRfcEmpresa(DATOS.fraccion);
    this.tramiteStore.setImportacion(DATOS.importacion);
    this.tramiteStore.setCantidad(DATOS.cantidad);
    this.tramiteStore.setFraccionArancelaria(DATOS.fraccionArancelaria);
    this.tramiteStore.setSeleccionaLaModalidad(DATOS.seleccionaLaModalidad);
    this.tramiteStore.setSeleccionarRegla(DATOS.seleccionarRegla);
    this.tramiteStore.setSector(DATOS.sector);
    this.tramiteStore.setDatosSector(DATOS.datosSector);
    this.tramiteStore.setIsSelectedRegla(DATOS.isSelectedRegla);
    this.tramiteStore.setValor(DATOS.valor);
    this.tramiteStore.setDatosImmex(DATOS.datosImmex);
    this.tramiteStore.setDatosImportacion(DATOS.datosImportacion);
  }

  /**
   * Obtiene los datos de ampliación de servicios desde un archivo JSON.
   * @returns {Observable<AmpliacionServiciosState>} - Observable con el estado de ampliación de servicios.
   */
  getServiciosData(): Observable<AmpliacionServiciosState> {
    return this.http.get<AmpliacionServiciosState>('assets/json/80206/datos-previos.json')}

    /*
    * Realiza una solicitud para obtener información de fracciones arancelarias.
    * @param {BuscarPayload} body - Cuerpo de la solicitud con los parámetros necesarios.
    * @returns {Observable<JSONResponse>} - Observable con la respuesta de la API.
    */
 obtenerInformacionFraccion(body: BuscarPayload): Observable<JSONResponse> {
      return this.http.post<JSONResponse>(API_ROUTES('/sat-t80206','80206').buscarfraccionArancelaria, body).pipe(
        map((response) => response),
        catchError(() => {
          const ERROR = new Error(`Error al obtener la lista de plantas en ${API_ROUTES('/sat-t80206','80206').buscarfraccionArancelaria}`);
          return throwError(() => ERROR);
        })
      );
    }

  /**
 * Maps API response data to Arancelaria interface
 * @method mapApiResponseToFraccionArancelaria
 * @param {FraccionArancelariaApiResponse[]} dato - Array of API response data
 * @param {number} startIndex - Starting index for fraccion numbering
 * @returns {Arancelaria[]} - Mapped array of Arancelaria objects
 */
// eslint-disable-next-line class-methods-use-this
mapApiResponseToFraccionArancelaria(
    dato: FraccionArancelariaApiResponse[], 
    startIndex: number = 0
  ): Arancelaria[] {
    return dato.map((item, index) => ({
      fraccion: (startIndex + index + 1).toString(),
      fraccionArancelaria: item.cveFraccion || '',
      descripcionComercial: item.descripcion || item.descripcionUsuario || '',
      anexoII: item.tipoFraccion || '',
      tipo: item.tipoOperacion || '',
      umt: item.unidadMedida || item.umt || '',
      categoria: item.descripcionCategoria || item.claveCategoria || '',
      valorMensual: item.valorMonedaMensual?.toString() || '',
      valorAnual: item.valorMonedaAnual?.toString() || '',
      volumenrMensual: item.valorProduccionMensual?.toString() || '',
      volumenAnual: item.valorProduccionAnual?.toString() || '',
    }));
  }
}