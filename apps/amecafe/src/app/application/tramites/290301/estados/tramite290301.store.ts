import { BeneficiosData, BodegasData, CafeExportadoresData, RegionesData } from '../models/filadata.model';
import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/** Interfaz que define el estado de la solicitud 290301 */
export interface Solicitud290301State {

    /** Justificación de la solicitud */
    justificacion: string,

    /** Nombre del productor de café */
    productorDeCafe: string,

    /** Clave del padrón del productor */
    claveDelPadron: string,

    /** Observaciones adicionales de la solicitud */
    observaciones: string,

    /** Indica si se requiere inspección inmediata */
    requiereInspeccionInmediata: boolean,

    /** Indica si la información es confidencial */
    informacionConfidencial: boolean,

    /** Lista de datos de las regiones */
    regionesTabla: RegionesData[],

    /** Lista de datos de los beneficios */
    beneficiosTabla: BeneficiosData[],

    /** Lista de datos de las bodegas */
    bodegasTabla: BodegasData[],

    /** Lista de datos de los exportadores de café */
    cafeExportadoresTabla: CafeExportadoresData[]
}

/**
 * Función para crear el estado inicial de la solicitud 290301
 * @returns Estado inicial de la solicitud
 */
export function createInitialSolicitudState(): Solicitud290301State {
    return {
        /** Justificación de la solicitud */
        justificacion: '',
    
        /** Nombre del productor de café */
        productorDeCafe: '',
    
        /** Clave del padrón del productor */
        claveDelPadron: '',
    
        /** Observaciones adicionales de la solicitud */
        observaciones: '',
    
        /** Indica si se requiere inspección inmediata */
        requiereInspeccionInmediata: false,
    
        /** Indica si la información es confidencial */
        informacionConfidencial: false,
    
        /** Lista de datos de las regiones */
        regionesTabla: [],
    
        /** Lista de datos de los beneficios */
        beneficiosTabla: [],
    
        /** Lista de datos de las bodegas */
        bodegasTabla: [],
    
        /** Lista de datos de los exportadores de café */
        cafeExportadoresTabla: []
    };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'Solicitud290301State', resettable: true })
/** Clase que representa la tienda de estado para la solicitud 290301 */
export class Solicitud290301Store extends Store<Solicitud290301State> {
  constructor() {
    super(createInitialSolicitudState());
  }

  /**
   * Establece la justificación de la solicitud
   * @param justificacion - Justificación de la solicitud
   */
  public setJustificacion(justificacion: string): void {
    this.update((state) => ({
      ...state,
      justificacion,
    }));
  }

  /**
   * Establece el nombre del productor de café
   * @param productorDeCafe - Nombre del productor de café
   */
  public setProductorDeCafe(productorDeCafe: string): void {
    this.update((state) => ({
      ...state,
      productorDeCafe,
    }));
  }

  /**
   * Establece la clave del padrón del productor
   * @param claveDelPadron - Clave del padrón
   */
  public setClaveDelPadron(claveDelPadron: string): void {
    this.update((state) => ({
      ...state,
      claveDelPadron,
    }));
  }

  /**
   * Establece las observaciones de la solicitud
   * @param observaciones - Observaciones de la solicitud
   */
  public setObservaciones(observaciones: string): void {
    this.update((state) => ({
      ...state,
      observaciones,
    }));
  }

  /**
   * Establece si se requiere inspección inmediata
   * @param requiereInspeccionInmediata - Valor booleano
   */
  public setRequiereInspeccionInmediata(requiereInspeccionInmediata: boolean): void {
    this.update((state) => ({
      ...state,
      requiereInspeccionInmediata,
    }));
  }

  /**
   * Establece si la información es confidencial
   * @param informacionConfidencial - Valor booleano
   */
  public setInformacionConfidencial(informacionConfidencial: boolean): void {
    this.update((state) => ({
      ...state,
      informacionConfidencial,
    }));
  }

  /**
   * Establece la tabla de beneficios
   * @param beneficiosTabla - Lista de datos de beneficios
   */
  public setBeneficiosTabla(beneficiosTabla: BeneficiosData[]): void {
    this.update((state) => ({
      ...state,
      beneficiosTabla,
    }));
  }

  /**
   * Establece la tabla de bodegas
   * @param bodegasTabla - Lista de datos de bodegas
   */
  public setBodegasTabla(bodegasTabla: BodegasData[]): void {
    this.update((state) => ({
      ...state,
      bodegasTabla,
    }));
  }

  /**
   * Establece la tabla de exportadores de café
   * @param cafeExportadoresTabla - Lista de datos de exportadores de café
   */
  public setCafeExportadoresTabla(cafeExportadoresTabla: CafeExportadoresData[]): void {
    this.update((state) => ({
      ...state,
      cafeExportadoresTabla,
    }));
  }
}
