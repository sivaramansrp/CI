import {
  Personas,
  ResponsablesDespacho,
} from '../../models/5701/tramite5701.model';

import { Store, StoreConfig } from '@datorama/akita';

import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite 5701
 * @returns Solicitud5701
 */
export interface Solicitud5701State {
  idSolicitud: string;
  tipoSolicitud: string;

  rfcImportExport: string;
  nombreImportExport: string;
  nroRegistro: string;
  programaFomento: string;
  immex: string;
  immexValue: string;
  industriaAutomotriz: string;
  tipoEmpresaCertificada: string;
  idSocioComercial: string;
  socioComercial: boolean;
  opEconomicoAut: boolean;
  revisionOrigen: boolean;

  fechaInicio: string;
  horaInicio: string;
  fechaFinal: string;
  horaFinal: string;
  colapsable: boolean;
  fechasSeleccionadas: string[];

  despacho: string;
  rfcAutorizacion: string;
  ddexAutorizacion: string;
  idAduana: string;
  descripcionAduana: string;
  idSeccionAduanera: string;
  seccionAduanera: string;
  nombreRecinto: string;
  tipoDespacho: string;
  tipoOperacion: string;
  patente: string;
  relacionSociedad: boolean;
  encargoConferido: boolean;
  domicilio: string;

  paisOrigen: number;
  paisProcedencia: number;
  descripcion: string;
  justificacion: string;

  idPedimento: number;
  patentePedimento: number;
  pedimento: string;
  aduana: number;
  tipoPedimento: string;
  numero: number;
  comprobanteValor: string;
  pedimentoValidado: boolean;

  personasResponsablesDespacho: ResponsablesDespacho[];

  transporte: string[];

  montoPagar: string;
  lineaCaptura: string;
  montoModal: string;

  tercerosRelacionados: Personas[];
}

export function createInitialState(): Solicitud5701State {
  return {
    idSolicitud: '',
    tipoSolicitud: '',
    rfcImportExport: '',
    nombreImportExport: '',
    nroRegistro: '',
    programaFomento: '',
    immex: '',
    immexValue: '',
    industriaAutomotriz: '',
    tipoEmpresaCertificada: '',
    idSocioComercial: '',
    socioComercial: false,
    opEconomicoAut: false,
    revisionOrigen: false,
    fechaInicio: '',
    horaInicio: '',
    fechaFinal: '',
    horaFinal: '',
    colapsable: false,
    fechasSeleccionadas: [],
    despacho: '',
    rfcAutorizacion: '',
    ddexAutorizacion: '',
    idAduana: '',
    descripcionAduana: '',
    idSeccionAduanera: '',
    seccionAduanera: '',
    nombreRecinto: '',
    tipoDespacho: '',
    tipoOperacion: '',
    patente: '',
    relacionSociedad: false,
    encargoConferido: false,
    domicilio: '',
    paisOrigen: 0,
    paisProcedencia: 0,
    descripcion: '',
    justificacion: '',
    idPedimento: 0,
    patentePedimento: 0,
    pedimento: '',
    aduana: 0,
    tipoPedimento: '',
    numero: 0,
    comprobanteValor: '',
    pedimentoValidado: false,
    personasResponsablesDespacho: [],
    transporte: [],
    montoPagar: '',
    lineaCaptura: '',
    montoModal: '',
    tercerosRelacionados: [],
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
  public setTipoSolicitud(tipoSolicitud: string): void {
    this.update((state) => ({
      ...state,
      tipoSolicitud,
    }));
  }

  public setRfcImportExport(rfcImportExport: string): void {
    this.update((state) => ({
      ...state,
      rfcImportExport,
    }));
  }

  public setNombreImportExport(nombreImportExport: string): void {
    this.update((state) => ({
      ...state,
      nombreImportExport,
    }));
  }

  public setNroRegistro(nroRegistro: string): void {
    this.update((state) => ({
      ...state,
      nroRegistro,
    }));
  }

  public setProgramaFomento(programaFomento: string): void {
    this.update((state) => ({
      ...state,
      programaFomento,
    }));
  }

  public setImmex(immex: string): void {
    this.update((state) => ({
      ...state,
      immex,
    }));
  }

  public setImmexValue(immexValue: string): void {
    this.update((state) => ({
      ...state,
      immexValue,
    }));
  }

  public setIndustriaAutomotriz(industriaAutomotriz: string): void {
    this.update((state) => ({
      ...state,
      industriaAutomotriz,
    }));
  }

  public setTipoEmpresaCertificada(tipoEmpresaCertificada: string): void {
    this.update((state) => ({
      ...state,
      tipoEmpresaCertificada,
    }));
  }

  public setIdSocioComercial(idSocioComercial: string): void {
    this.update((state) => ({
      ...state,
      idSocioComercial,
    }));
  }

  public setSocioComercial(socioComercial: boolean): void {
    this.update((state) => ({
      ...state,
      socioComercial,
    }));
  }

  public setOpEconomicoAut(opEconomicoAut: boolean): void {
    this.update((state) => ({
      ...state,
      opEconomicoAut,
    }));
  }

  public setRevisionOrigen(revisionOrigen: boolean): void {
    this.update((state) => ({
      ...state,
      revisionOrigen,
    }));
  }

  public setFechaInicio(fechaInicio: string): void {
    this.update((state) => ({
      ...state,
      fechaInicio,
    }));
  }

  public setHoraInicio(horaInicio: string): void {
    this.update((state) => ({
      ...state,
      horaInicio,
    }));
  }

  public setFechaFinal(fechaFinal: string): void {
    this.update((state) => ({
      ...state,
      fechaFinal,
    }));
  }

  public setHoraFinal(horaFinal: string): void {
    this.update((state) => ({
      ...state,
      horaFinal,
    }));
  }

  public setColapsable(colapsable: boolean): void {
    this.update((state) => ({
      ...state,
      colapsable,
    }));
  }

  public setFechasSeleccionadas(fechasSeleccionadas: string[]): void {
    this.update((state) => ({
      ...state,
      fechasSeleccionadas,
    }));
  }

  public setDespacho(despacho: string): void {
    this.update((state) => ({
      ...state,
      despacho,
    }));
  }

  public setRfcAutorizacion(rfcAutorizacion: string): void {
    this.update((state) => ({
      ...state,
      rfcAutorizacion,
    }));
  }

  public setDdexAutorizacion(ddexAutorizacion: string): void {
    this.update((state) => ({
      ...state,
      ddexAutorizacion,
    }));
  }

  public setIdAduana(idAduana: string): void {
    this.update((state) => ({
      ...state,
      idAduana,
    }));
  }

  public setDescripcionAduana(descripcionAduana: string): void {
    this.update((state) => ({
      ...state,
      descripcionAduana,
    }));
  }

  public setIdSeccionAduanera(idSeccionAduanera: string): void {
    this.update((state) => ({
      ...state,
      idSeccionAduanera,
    }));
  }

  public setSeccionAduanera(seccionAduanera: string): void {
    this.update((state) => ({
      ...state,
      seccionAduanera,
    }));
  }

  public setNombreRecinto(nombreRecinto: string): void {
    this.update((state) => ({
      ...state,
      nombreRecinto,
    }));
  }

  public setTipoDespacho(tipoDespacho: string): void {
    this.update((state) => ({
      ...state,
      tipoDespacho,
    }));
  }

  public setTipoOperacion(tipoOperacion: string): void {
    this.update((state) => ({
      ...state,
      tipoOperacion,
    }));
  }

  public setPatente(patente: string): void {
    this.update((state) => ({
      ...state,
      patente,
    }));
  }

  public setRelacionSociedad(relacionSociedad: boolean): void {
    this.update((state) => ({
      ...state,
      relacionSociedad,
    }));
  }

  public setEncargoConferido(encargoConferido: boolean): void {
    this.update((state) => ({
      ...state,
      encargoConferido,
    }));
  }

  public setDomicilio(domicilio: string): void {
    this.update((state) => ({
      ...state,
      domicilio,
    }));
  }

  public setPaisOrigen(paisOrigen: number): void {
    this.update((state) => ({
      ...state,
      paisOrigen,
    }));
  }

  public setPaisProcedencia(paisProcedencia: number): void {
    this.update((state) => ({
      ...state,
      paisProcedencia,
    }));
  }

  public setDescripcion(descripcion: string): void {
    this.update((state) => ({
      ...state,
      descripcion,
    }));
  }

  public setJustificacion(justificacion: string): void {
    this.update((state) => ({
      ...state,
      justificacion,
    }));
  }

  public setidPedimento(idPedimento: number): void {
    this.update((state) => ({
      ...state,
      idPedimento,
    }));
  }

  public setPatentePedimento(patentePedimento: number): void {
    this.update((state) => ({
      ...state,
      patentePedimento,
    }));
  }

  public setPedimento(pedimento: string): void {
    this.update((state) => ({
      ...state,
      pedimento,
    }));
  }

  public setAduana(aduana: number): void {
    this.update((state) => ({
      ...state,
      aduana,
    }));
  }

  public setTipoPedimento(tipoPedimento: string): void {
    this.update((state) => ({
      ...state,
      tipoPedimento,
    }));
  }

  public setNumero(numero: number): void {
    this.update((state) => ({
      ...state,
      numero,
    }));
  }

  public setComprobanteValor(comprobanteValor: string): void {
    this.update((state) => ({
      ...state,
      comprobanteValor,
    }));
  }

  public setPedimentoValidado(pedimentoValidado: boolean): void {
    this.update((state) => ({
      ...state,
      pedimentoValidado,
    }));
  }

  public setPersonasResponsablesDespacho(
    personasResponsablesDespacho: ResponsablesDespacho[]
  ): void {
    this.update((state) => ({
      ...state,
      personasResponsablesDespacho,
    }));
  }

  public setTransporte(transporte: string[]): void {
    this.update((state) => ({
      ...state,
      transporte,
    }));
  }

  public setMontoPagar(montoPagar: string): void {
    this.update((state) => ({
      ...state,
      montoPagar,
    }));
  }

  public setLineaCaptura(lineaCaptura: string): void {
    this.update((state) => ({
      ...state,
      lineaCaptura,
    }));
  }

  public setMonto(montoModal: string): void {
    this.update((state) => ({
      ...state,
      montoModal,
    }));
  }

  public setTercerosRelacionados(tercerosRelacionados: Personas[]): void {
    this.update((state) => ({
      ...state,
      tercerosRelacionados,
    }));
  }

  /**
   * Limpia los datos de la solicitud
   */
  public limpiarSolicitud(): void {
    this.reset();
  }
}
