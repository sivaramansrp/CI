import { TransporteAereo, TransporteCarretero, TransporteFerroviario, TransporteMaritimo, TransporteOtro, TransportePeatonal } from '@ng-mf/data-access-user';
import {
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

  RFCImportadorExportador: string;
  nombre: string;
  descripcionNumeroRegistro: string;

  programa: boolean;
  descripcionProgramaFomento: string;


  /**
   * @description IMMEX: Industria Manufacturera, Maquiladora y de Servicios de Exportación
   */
  checkIMMEX: boolean;
  descripcionImmex: string;

  industriaAutomotriz: boolean;
  descripcionIndustrialAutomotriz: string;

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

  /**
   * @description LDA: Autrización para operar por un Ligar Distinto a la Aduana.
   */
  lda: boolean;
  autorizacionLDA: string;

  dd: boolean;
  autorizacionDDEX: string;

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
  transporte: TransporteAereo[] | TransporteCarretero[] | TransporteFerroviario[] | TransporteMaritimo[] | TransporteOtro[] | TransportePeatonal[];

  tipoTransporteArriboSalida: string;
  transporteArriboDatos: TransporteAereo[] | TransporteCarretero[] | TransporteFerroviario[] | TransporteMaritimo[] | TransporteOtro[] | TransportePeatonal[];

  montoPagar: string;
  lineaCaptura: string;
  monto: string;

  rangoFechas: boolean;
  selectRangoDias: string[];
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
    RFCImportadorExportador: '',
    nombre: '',
    descripcionNumeroRegistro: '',
    programa: false,
    descripcionProgramaFomento: '',
    checkIMMEX: false,
    descripcionImmex: '',
    industriaAutomotriz: false,
    descripcionIndustrialAutomotriz: '',
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
    tipoTransporteArriboSalida: '',
    transporteArriboDatos: [],
    montoPagar: '',
    lineaCaptura: '',
    monto: '',
    rangoFechas: false,
    selectRangoDias: [],
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

  public setRangoFechas(rangoFechas: boolean): void {
    this.update((state) => ({
      ...state,
      rangoFechas,
    }));
  }

  public setRangoDias(selectRangoDias: string[]): void {
    this.update((state) => ({
      ...state,
      selectRangoDias,
    }));
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

  public setRFCImportadorExportador(RFCImportadorExportador: string): void {
    this.update((state) => ({
      ...state,
      RFCImportadorExportador,
    }));
  }

  public setNombre(nombre: string): void {
    this.update((state) => ({
      ...state,
      nombre,
    }));
  }

  public setDescripcionNumeroRegistro(descripcionNumeroRegistro: string): void {
    this.update((state) => ({
      ...state,
      descripcionNumeroRegistro,
    }));
  }

  public setPrograma(programa: boolean): void {
    this.update((state) => ({
      ...state,
      programa,
    }));
  }

  public setDescripcionProgramaFomento(descripcionProgramaFomento: string): void {
    this.update((state) => ({
      ...state,
      descripcionProgramaFomento,
    }));
  }

  public setCheckIMMEX(checkIMMEX: boolean): void {
    this.update((state) => ({
      ...state,
      checkIMMEX,
    }));
  }

  public setDescripcionImmex(descripcionImmex: string): void {
    this.update((state) => ({
      ...state,
      descripcionImmex,
    }));
  }

  public setIndustriaAutomotriz(industriaAutomotriz: boolean): void {
    this.update((state) => ({
      ...state,
      industriaAutomotriz,
    }));
  }

  public setDescripcionIndustriaAutomotriz(descripcionIndustrialAutomotriz: string): void {
    this.update((state) => ({
      ...state,
      descripcionIndustrialAutomotriz,
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

  public setTransporte(transporte: TransporteAereo[] | TransporteCarretero[] | TransporteFerroviario[] | TransporteMaritimo[] | TransporteOtro[] | TransportePeatonal[]): void {
    this.update((state) => ({
      ...state,
      transporte: Array.isArray(transporte) ? transporte : [transporte],
    }));
  }

  public setTipoTransporteArriboSalida(tipoTransporteArriboSalida: string): void {
    this.update((state) => ({
      ...state,
      tipoTransporteArriboSalida,
    }));
  }

  public setTransporteArriboDatos(transporteArriboDatos: TransporteAereo[] | TransporteCarretero[] | TransporteFerroviario[] | TransporteMaritimo[] | TransporteOtro[] | TransportePeatonal[]): void {
    this.update((state) => ({
      ...state,
      transporteArriboDatos: Array.isArray(transporteArriboDatos) ? transporteArriboDatos : [transporteArriboDatos],
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



  /**
   * Limpia los datos de la solicitud
   */
  public limpiarSolicitud(): void {
    this.reset();
  }
}
