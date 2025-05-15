import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';
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
  capacidadAlmacenamiento: string;
  numeroTotalCarros: string;
  fechaInspeccion: string;
  descripcionClobGenerica2: string;
  razonSocial: string;
  razonSocialSC: string;
  numFolioTramite: string;
  fechafinVigencia2: string;
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
    capacidadAlmacenamiento: '',
    cantidadBienes: '',
    numeroTotalCarros: '',
    fechaInspeccion: '',
    descripcionClobGenerica2: '',
    razonSocial: '',
    razonSocialSC: '',
    numFolioTramite: ''
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
}
