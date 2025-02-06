import {
  DatosDespacho,
  DatosImportadorExportador,
  DatosMercancia,
  DatosPago,
  DatosPedimento,
  DatosServicio,
  Personas,
  ResponsablesDespacho,
} from '../../core/models/5701/servicios-extraordinarios.model';
import { ID, Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite 5701
 * @returns Solicitud5701
 */
export interface Solicitud5701State {
  id: ID;
  idSolicitud: string;
  tipoSolicitud: string;
  datosImportadorExportador: DatosImportadorExportador;
  datosServicio: DatosServicio;
  despacho: DatosDespacho;
  mercancia: DatosMercancia;
  pedimento: DatosPedimento;
  personasResponsablesDespacho: ResponsablesDespacho[];
  transporte: any;
  pagoCaptura: DatosPago;
  tercerosRelacionados: Personas[];
}

export function createInitialState(): Solicitud5701State {
  return {
    id: null,
    idSolicitud: null,
    tipoSolicitud: null,
    datosImportadorExportador: null,
    datosServicio: null,
    despacho: null,
    mercancia: null,
    pedimento: null,
    personasResponsablesDespacho: [],
    transporte: null,
    pagoCaptura: null,
    tercerosRelacionados: null,
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite5701', resettable: true })
export class Tramite5701Store extends Store<Solicitud5701State> {
  constructor() {
    super(createInitialState());
  }

  /**
   * Guarda el tipo de solicitud en el estado.
   *
   * @param tipoSolicitud - El tipo de solicitud que se va a guardar.
   */
  public guardaTipoSolicitud(tipoSolicitud: string) {
    this.update((state) => ({
      ...state,
      tipoSolicitud,
    }));
  }

  /**
   * Guarda la información de la DatosImportadorExportador
   *
   */
  public guadarDatosImportadorExportador(
    datosImportadorExportador: DatosImportadorExportador
  ) {
    this.update((state) => ({
      ...state,
      datosImportadorExportador,
    }));
  }

  /**
   * Guarda los datos del servicio en el estado de la tienda.
   *
   * @param datosServicio - Los datos del servicio que se van a guardar.
   */
  public guardaDatosServicio(datosServicio: DatosServicio) {
    this.update((state) => ({
      ...state,
      datosServicio,
    }));
  }

  public guardarDatosDespacho(despacho: DatosDespacho) {
    this.update((state) => ({
      ...state,
      despacho,
    }));
  }

  public guardarDatosMercancia(mercancia: DatosMercancia) {
    this.update((state) => ({
      ...state,
      mercancia,
    }));
  }

  public guardarDatosPedimento(pedimento: DatosPedimento) {
    this.update((state) => ({
      ...state,
      pedimento,
    }));
  }

  public guardarPersonasResponsablesDespacho(
    personasResponsablesDespacho: ResponsablesDespacho[]
  ) {
    this.update((state) => ({
      ...state,
      personasResponsablesDespacho,
    }));
  }

  public guardarDatosTransportes(transporte: any) {
    this.update((state) => ({
      ...state,
      transporte,
    }));
  }

  public guardarDatosPago(pagoCaptura: DatosPago) {
    this.update((state) => ({
      ...state,
      pagoCaptura,
    }));
  }

  /**
   * Limpia los datos de la solicitud
   */
  public limpiarSolicitud() {
    this.reset();
  }
}
