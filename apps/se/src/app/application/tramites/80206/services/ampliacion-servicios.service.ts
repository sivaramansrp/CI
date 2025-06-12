/**
 * @fileoverview
 * El `AmpliacionServiciosService` es un servicio de Angular diseñado para gestionar las operaciones relacionadas con la ampliación de servicios.
 * Proporciona métodos para obtener datos desde archivos JSON y gestionar la visibilidad de ciertos elementos en la interfaz de usuario.
 * 
 * @module AmpliacionServiciosService
 * @description
 * Este servicio utiliza el cliente HTTP de Angular para realizar solicitudes a archivos JSON locales y expone observables para manejar datos y eventos.
 */

import { Observable, Subject, map } from 'rxjs';
import { AmpliacionServiciosState } from '../estados/tramite80206.store';
import { DatosResponse } from '../models/datos-info.model';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RespuestaCatalogos } from '@ng-mf/data-access-user';
import { Tramite80206Store } from '../estados/tramite80206.store';

@Injectable({
  providedIn: 'root',
})
export class AmpliacionServiciosService {
  /**
   * Constructor del servicio.
   * @constructor
   * @param {HttpClient} http - Cliente HTTP de Angular para realizar solicitudes.
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
    return this.http.get<AmpliacionServiciosState>('assets/json/80206/datos-prefill.json')}
}