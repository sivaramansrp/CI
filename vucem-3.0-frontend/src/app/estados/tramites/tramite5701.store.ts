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
export interface FormSateSolicitud5701 {
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

export function createInitialState(): FormSateSolicitud5701 {
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
export class Tramite5701Store extends Store<FormSateSolicitud5701> {
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

  public guardarDatosDespacho(datosDespacho: DatosDespacho) {
    this.update((state) => ({
      ...state,
      datosDespacho,
    }));
  }

  public guardarDatosMercancia(datosMercancia: DatosMercancia) {
    this.update((state) => ({
      ...state,
      datosMercancia,
    }));
  }

  public guardarDatosPedimento(datosPedimento: DatosPedimento) {
    this.update((state) => ({
      ...state,
      datosPedimento,
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

  public guardarDatosTransportes(datosTransportes: any) {
    this.update((state) => ({
      ...state,
      datosTransportes,
    }));
  }

  public guardarDatosPago(datosPago: DatosPago) {
    this.update((state) => ({
      ...state,
      datosPago,
    }));
  }

  /**
   * Limpia los datos de la solicitud
   */
  public limpiarSolicitud() {
    this.reset();
  }
}
