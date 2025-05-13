import { Store, StoreConfig } from '@datorama/akita';
import { TransporteAereo, TransporteCarretero, TransporteFerroviario, TransporteMaritimo, TransporteOtro, TransportePeatonal } from '@ng-mf/data-access-user';
import {
  Pedimento,
  ResponsablesDespacho,
} from '../../models/5701/tramite5701.model';

import { Injectable } from '@angular/core';
import { Patente } from '../../models/5701/Patente.model';


/**
 * Creacion del estado inicial para la interfaz de tramite 5701
 * @returns Solicitud5701
 */
export interface Solicitud5701State {
  idSolicitud: string;
  tipoSolicitud: string;

  RFCImportadorExportador: string;
  rfcGenerico: boolean;
  nombre: string;
  descripcionNumeroRegistro: string;

  programa: boolean;
  descripcionProgramaFomento: string;
  blnProgramaFomento: boolean;


  /**
   * @description IMMEX: Industria Manufacturera, Maquiladora y de Servicios de Exportación
   */
  checkIMMEX: boolean;
  descripcionImmex: string;
  blnImmex: boolean;

  industriaAutomotriz: boolean;
  descripcionIndustrialAutomotriz: string;
  blnIndustriaAutomotriz: boolean;

  tipoEmpresaCertificada: string;
  idSocioComercial: string;
  socioComercial: boolean;
  blnSocioComercial: boolean;
  certificacionOEA: boolean;
  revision: boolean;
  blnRevisionOrigen: boolean;
  blnCertificacionA: string;
  blnCertificacionAA: string;
  blnCertificacionAAA: string;
  blnOEA: boolean;

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
  patente: Patente;
  patenteApoderado: Patente[];
  relacionSociedad: boolean;
  encargoConferido: boolean;
  domicilioDespacho: string;

  paisOrigen: number;
  paisProcedencia: number;
  descripcionGenerica: string;
  justificacion: string;

  pedimentos: Pedimento[]

  personasResponsablesDespacho: ResponsablesDespacho[];

  tipoTransporte: string;
  transporte: TransporteAereo[] | TransporteCarretero[] | TransporteFerroviario[] | TransporteMaritimo[] | TransporteOtro[] | TransportePeatonal[];

  tipoTransporteArriboSalida: string;
  transporteArriboDatos: TransporteAereo[] | TransporteCarretero[] | TransporteFerroviario[] | TransporteMaritimo[] | TransporteOtro[] | TransportePeatonal[];

  montoPagar: string;
  lineaCaptura: string;
  monto: string;
  isMontoAceptable: boolean;
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
    rfcGenerico: false,
    nombre: '',
    descripcionNumeroRegistro: '',
    programa: false,
    descripcionProgramaFomento: '',
    blnProgramaFomento: false,
    checkIMMEX: false,
    descripcionImmex: '',
    industriaAutomotriz: false,
    descripcionIndustrialAutomotriz: '',
    blnIndustriaAutomotriz: false,
    tipoEmpresaCertificada: '',
    idSocioComercial: '',
    socioComercial: false,
    blnImmex: false,
    blnSocioComercial: false,
    certificacionOEA: false,
    revision: false,
    blnRevisionOrigen: false,
    blnCertificacionA: '',
    blnCertificacionAA: '',
    blnCertificacionAAA: '',
    blnOEA: false,
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
    patente: {} as Patente,
    patenteApoderado: [],
    relacionSociedad: false,
    encargoConferido: false,
    domicilioDespacho: '',
    paisOrigen: 0,
    paisProcedencia: 0,
    descripcionGenerica: '',
    justificacion: '',
    pedimentos: [],
    personasResponsablesDespacho: [],
    tipoTransporte: '',
    transporte: [],
    tipoTransporteArriboSalida: '',
    transporteArriboDatos: [],
    montoPagar: '',
    lineaCaptura: '',
    monto: '',
    isMontoAceptable: false,
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

  public setBlnImmex(blnImmex: boolean): void {
    this.update((state) => ({
      ...state,
      blnImmex,
    }));
  }

  public setRfcGenerico(rfcGenerico: boolean): void {
    this.update((state) => ({
      ...state,
      rfcGenerico,
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

  public setBlnProgramaFomento(blnProgramaFomento: boolean): void {
    this.update((state) => ({
      ...state,
      blnProgramaFomento,
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

  public setBlnIndustriaAutomotriz(blnIndustriaAutomotriz: boolean): void {
    this.update((state) => ({
      ...state,
      blnIndustriaAutomotriz,
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

  public setBlnSocioComercial(blnSocioComercial: boolean): void {
    this.update((state) => ({
      ...state,
      blnSocioComercial,
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

  public setBlnRevisionOrigen(blnRevisionOrigen: boolean): void {
    this.update((state) => ({
      ...state,
      blnRevisionOrigen,
    }));
  }
  public setBlnCertificacionA(blnCertificacionA: string): void {
    this.update((state) => ({
      ...state,
      blnCertificacionA,
    }));
  }
  public setBlnCertificacionAA(blnCertificacionAA: string): void {
    this.update((state) => ({
      ...state,
      blnCertificacionAA,
    }));
  }
  public setBlnCertificacionAAA(blnCertificacionAAA: string): void {
    this.update((state) => ({
      ...state,
      blnCertificacionAAA,
    }));
  }
  public setBlnOEA(blnOEA: boolean): void {
    this.update((state) => ({
      ...state,
      blnOEA,
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

  public setPatente(patente: Patente): void {
    this.update((state) => ({
      ...state,
      patente,
    }));
  }

  public setPatenteApoderado(patenteApoderado: Patente[]): void {
    this.update((state) => ({
      ...state,
      patenteApoderado,
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

  public setPedimentos(pedimentos: Pedimento[]): void {
    this.update((state) => ({
      ...state,
      pedimentos,
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

  public setIsMontoAceptable(isMontoAceptable: boolean): void {
    this.update((state) => ({
      ...state,
      isMontoAceptable,
    }));
  }

  /**
   * Limpia los datos de la solicitud
   */
  public limpiarSolicitud(): void {
    this.reset();
  }
}
