import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';
import { FusionEscision } from '../models/aviso-modificacion.model';
/**
 * Estado de la solicitud 30901.
 * Contiene los datos necesarios para gestionar la solicitud.
 */
export interface Solicitud30505State {
  numeroDeOficio: string,
  fechaFinVigencia: string,
  avisoDeMod: boolean
  avisoDeFusion: boolean
  avisoDeCal: boolean,
  avisoDenom: boolean,
  selectedCheckbox: string[],

  descClobGenerica: string;
  fechaInicioVigencia: string;

  rfcVucem: string;
  razonSocialVucem: string;
  rfcIdc: string;
  razonSocialIdc: string;
  folioAcuse: string;

  cantidadBienes: string;
  capacidadAlmacenamiento2: string;
  numeroTotalCarros: string;
  fechaInspeccion: string;
  descripcionClobGenerica2: string;
  razonSocial: string;
  razonSocialSC: string;
  numFolioTramite: string;
  fechafinVigencia2: string;
  tipoSolicitudPexim: string;
  capacidadAlmacenamiento: string;
  tipoCaat: string;
  tipoProgFomExp: string;
  tipoTransito: string;
  numeroEstablecimiento: string;
  medioTransporte: string;
  nombreBanco: string;
  nomOficialAutorizado: string;
  empresaControladora: string;
  observaciones: string;
  descripcionLugarEmbarque: string;
  actividadProductiva: string;

       certificacionModal: string,
        rfcBusquedaModal: string,
        razonSocialFusionante: string,
        folioVucemFusionante: string,
        fechaInicioVigenciaFusionante:string,
        fechaFinVigenciaFusionante: string,
        rfcBusquedaModalSC: string,
        razonSocialFusionanteSC: string,
        fusionEscisionData: FusionEscision[]
}

/**
 * Función para crear el estado inicial de la solicitud.
 * Devuelve un objeto con los valores predeterminados.
 */
export function createInitialSolicitudState(): Solicitud30505State {
  return {
    numeroDeOficio: '2500300300202599100000000000',
    fechaFinVigencia: '02-04-2025',
    avisoDeMod: false,
    avisoDeFusion: false,
    avisoDeCal: false,
    avisoDenom: false,
    selectedCheckbox: [],
    descClobGenerica: '',
    fechaInicioVigencia: '',
    fechafinVigencia2: '',
    rfcVucem: 'AAL0409235E6',
    razonSocialVucem: 'INTEGRADORA DE URBANIZACIONES SIGNUM S DE RL DE CV',
    rfcIdc: 'AAL0409235E6',
    razonSocialIdc: 'INTEGRADORA DE URBANIZACIONES SIGNUM S DE RL DE CV',
    folioAcuse: '',
    capacidadAlmacenamiento2: '',
    cantidadBienes: '',
    numeroTotalCarros: '',
    fechaInspeccion: '',
    descripcionClobGenerica2: '',
    razonSocial: '',
    razonSocialSC: '',
    numFolioTramite: '',
    tipoSolicitudPexim: '',
    capacidadAlmacenamiento: '',
    tipoCaat: '',
    tipoProgFomExp: '',
    tipoTransito: '',
    numeroEstablecimiento: '',
    medioTransporte: '',
    nombreBanco: '',
    nomOficialAutorizado: '',
    empresaControladora: '',
    observaciones: '',
    descripcionLugarEmbarque: '',
    actividadProductiva: '',
    certificacionModal: '',
        rfcBusquedaModal: '',
        razonSocialFusionante: '',
        folioVucemFusionante: '',
        fechaInicioVigenciaFusionante:'',
        fechaFinVigenciaFusionante: '',
        rfcBusquedaModalSC: '',
        razonSocialFusionanteSC: '',
        fusionEscisionData: []
  };
}

/**
 * Servicio de almacenamiento y gestión del estado de la solicitud 30901.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'solicitud30505', resettable: true })
export class Solicitud30505Store extends Store<Solicitud30505State> {
  constructor() {
    super(createInitialSolicitudState());
  }
  /** Actualiza la descripción genérica del producto. */
  public setDescClobGenerica(descClobGenerica: string): void {
    this.update((state) => ({
      ...state,
      descClobGenerica,
    }));
  }

  /** Actualiza la fecha de inicio de vigencia de la solicitud. */
  public setFechaInicioVigencia(fechaInicioVigencia: string): void {
    this.update((state) => ({
      ...state,
      fechaInicioVigencia,
    }));
  }

  /** Actualiza la fecha de finalización de vigencia de la solicitud. */
  public setFechaFinVigencia(fechaFinVigencia: string): void {
    this.update((state) => ({
      ...state,
      fechaFinVigencia,
    }));
  }

  public setAviso(aviso: boolean, field: string): void {
    this.update((state) => ({
      ...state,
      [field]: aviso,
    }));
  }

  public setCheckboxDatos(datos: string[]): void {
    this.update((state) => ({
      ...state,
      selectedCheckbox: datos,
    }));
  }

  public setFolioAcuse(folio: string): void {
    this.update((state) => ({
      ...state,
      folioAcuse: folio,
    }));
  }

  public setAvisoDatos(aviso: string, field: string): void {
    this.update((state) => ({
      ...state,
      [field]: aviso,
    }));
  }
  /** aviso-calculo comenzar*/

  public setTipoSolicitudPexim(tipoSolicitudPexim: string): void {
    this.update((state) => ({
      ...state,
      tipoSolicitudPexim,
    }));
  }

  public setCapacidadAlmacenamiento(capacidadAlmacenamiento: string): void {
    this.update((state) => ({ 
      ...state,
      capacidadAlmacenamiento,
    }));
  }

  public setTipoCaat(tipoCaat: string): void {
    this.update((state) => ({   
      ...state,
      tipoCaat,
    }));
  }

public setTipoProgFomExp(tipoProgFomExp: string): void {
    this.update((state) => ({
      ...state,
      tipoProgFomExp,
    }));
  }

public setTipoTransito(tipoTransito: string): void {
    this.update((state) => ({
      ...state,
      tipoTransito,
    }));
  }

public setNumeroEstablecimiento(numeroEstablecimiento: string): void {
    this.update((state) => ({
      ...state,
      numeroEstablecimiento,
    }));
  }

public setMedioTransporte(medioTransporte: string): void {
    this.update((state) => ({
      ...state,
      medioTransporte,
    }));
  }

public setNombreBanco(nombreBanco: string): void {
    this.update((state) => ({
      ...state,
      nombreBanco,
    }));
  }

public setNomOficialAutorizado(nomOficialAutorizado: string): void {
    this.update((state) => ({
      ...state,
      nomOficialAutorizado,
    }));
  }

public setEmpresaControladora(empresaControladora: string): void {
    this.update((state) => ({
      ...state,
      empresaControladora,
    }));
  }

  public setObservaciones(observaciones: string): void {
    this.update((state) => ({
      ...state,
      observaciones,
    }));
  }

  public setDescripcionLugarEmbarque(descripcionLugarEmbarque: string): void {
    this.update((state) => ({
      ...state,
      descripcionLugarEmbarque,
    }));
  }

  public setActividadProductiva(actividadProductiva: string): void {
    this.update((state) => ({
      ...state,
      actividadProductiva,
    }));
  }

   public removeDestinatarioDato(fusionToRemove: FusionEscision): void {
    this.update((state) => ({
      ...state,
      fusionEscisionData: state.fusionEscisionData.filter(
        (fusionDatos) => fusionDatos.rfcBusquedaModal !== fusionToRemove.rfcBusquedaModal
      ),
    }));
  }

  /**
   * Agrega un nuevo destinatario al estado.
   * @param newDestinatario - Objeto que representa el nuevo destinatario.
   */
  public updateFusionDatos(newFusion: FusionEscision[]): void {
    this.update((state) => ({
      ...state,
      fusionEscisionData: [...state.fusionEscisionData,...newFusion],
    }));
  }


}
