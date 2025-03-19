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

  RFCImpExp: string;
  nombre: string;
  desNumeroRegistro: string;

  programa: boolean;
  desProgramaFomento: string;


  checkIMMEX: boolean;
  desImmex: string;

  industriaAutomotriz: boolean;
  desIndustrialAutomotriz: string;

  tipoEmpresaCertificada: string;
  idSocioComercial: string;
  socioComercial: boolean;
  certificacionOEA: boolean;
  revision: boolean;

  fechaInicio: string;
  horaInicio: string;
  fechaFinal: string;
  horaFinal: string;
  fechasSeleccionadas: string[];

  despacho: string;
  lda: boolean;
  autorizacionLDA: string;
  dd: boolean;
  autorizacionDDEX: string;
  
  ddexAutorizacion: string;
  idAduanaDespacho: string;
  aduanaDespacho: string;
  idSeccionDespacho: string;
  seccionAduanera: string;
  nombreRecinto: string;
  tipoDespacho: string;
  tipoOperacion: string;
  patente: string;
  relacionSociedad: boolean;
  encargoConferido: boolean;
  domicilioDespacho: string;

  paisOrigen: number;
  paisProcedencia: number;
  descripcionGenerica: string;
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

  tipoTransporte: string;
  transporte: string[];

  montoPagar: string;
  lineaCaptura: string;
  monto: string;

  tercerosRelacionados: Personas[];
}

export interface Tercero5701State {
  nombreTercero: string;
  correoTercero: string;
}
export interface Terceros5701State {
  terceros: Tercero5701State[];
}

export function createInitialState(): Solicitud5701State {
  return {
    idSolicitud: '',
    tipoSolicitud: '',
    RFCImpExp: '',
    nombre: '',
    desNumeroRegistro: '',
    programa: false,
    desProgramaFomento: '',
    checkIMMEX: false,
    desImmex: '',
    industriaAutomotriz: false,
    desIndustrialAutomotriz: '',
    tipoEmpresaCertificada: '',
    idSocioComercial: '',
    socioComercial: false,
    certificacionOEA: false,
    revision: false,
    fechaInicio: '',
    horaInicio: '',
    fechaFinal: '',
    horaFinal: '',
    fechasSeleccionadas: [],
    despacho: '',
    lda: false,
    autorizacionLDA: '',
    dd: false,
    autorizacionDDEX: '',
    ddexAutorizacion: '',
    idAduanaDespacho: '',
    aduanaDespacho: '',
    idSeccionDespacho: '',
    seccionAduanera: '',
    nombreRecinto: '',
    tipoDespacho: '',
    tipoOperacion: '',
    patente: '',
    relacionSociedad: false,
    encargoConferido: false,
    domicilioDespacho: '',
    paisOrigen: 0,
    paisProcedencia: 0,
    descripcionGenerica: '',
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
    tipoTransporte: '',
    transporte: [],
    montoPagar: '',
    lineaCaptura: '',
    monto: '',
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

  public setRFCImpExp(RFCImpExp: string): void {
    this.update((state) => ({
      ...state,
      RFCImpExp,
    }));
  }

  public setNombre(nombre: string): void {
    this.update((state) => ({
      ...state,
      nombre,
    }));
  }

  public setdesNumeroRegistro(desNumeroRegistro: string): void {
    this.update((state) => ({
      ...state,
      desNumeroRegistro,
    }));
  }

  public setPrograma(programa: boolean): void {
    this.update((state) => ({
      ...state,
      programa,
    }));
  }
  
  public setDesProgramaFomento(desProgramaFomento: string): void {
    this.update((state) => ({
      ...state,
      desProgramaFomento,
    }));
  }

  public setCheckIMMEX(checkIMMEX: boolean): void {
    this.update((state) => ({
      ...state,
      checkIMMEX,
    }));
  }

  public setDesImmex(desImmex: string): void {
    this.update((state) => ({
      ...state,
      desImmex,
    }));
  }

  public setIndustriaAutomotriz(industriaAutomotriz: boolean): void {
    this.update((state) => ({
      ...state,
      industriaAutomotriz,
    }));
  }

  public setDesIndustriaAutomotriz(desIndustrialAutomotriz: string): void {
    this.update((state) => ({
      ...state,
      desIndustrialAutomotriz,
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

  public setCertificacionOEA(certificacionOEA: boolean): void {
    this.update((state) => ({
      ...state,
      certificacionOEA,
    }));
  }

  public setRevision(revision: boolean): void {
    this.update((state) => ({
      ...state,
      revision,
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

  public setLDA(lda: boolean): void {
    this.update((state) => ({
      ...state,
      lda,
    }));
  }

  public setAutorizacionLDA(autorizacionLDA: string): void {
    this.update((state) => ({
      ...state,
      autorizacionLDA,
    }));
  }

  public setDD(dd: boolean): void {
    this.update((state) => ({
      ...state,
      dd,
    }));
  }

  public setAutorizacionDDEX(autorizacionDDEX: string): void {
    this.update((state) => ({
      ...state,
      autorizacionDDEX,
    }));
  }

  public setDdexAutorizacion(ddexAutorizacion: string): void {
    this.update((state) => ({
      ...state,
      ddexAutorizacion,
    }));
  }

  public setIdAduanaDespacho(idAduanaDespacho: string): void {
    this.update((state) => ({
      ...state,
      idAduanaDespacho,
    }));
  }

  public setAduanaDespacho(aduanaDespacho: string): void {
    this.update((state) => ({
      ...state,
      aduanaDespacho,
    }));
  }

  public setIdSeccionDespacho(idSeccionDespacho: string): void {
    this.update((state) => ({
      ...state,
      idSeccionDespacho,
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

  public setDomicilioDespacho(domicilioDespacho: string): void {
    this.update((state) => ({
      ...state,
      domicilioDespacho,
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

  public setDescripcionGenerica(descripcionGenerica: string): void {
    this.update((state) => ({
      ...state,
      descripcionGenerica,
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

  public setTipoTransporte(tipoTransporte: string): void {
    this.update((state) => ({
      ...state,
      tipoTransporte,
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

  public setMonto(monto: string): void {
    this.update((state) => ({
      ...state,
      monto,
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
