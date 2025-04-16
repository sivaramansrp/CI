/**
 * @fileoverview Este archivo define el estado y las operaciones relacionadas con el trámite 260904.
 * Proporciona un store para gestionar el estado de los datos del trámite, incluyendo métodos
 * para actualizar propiedades específicas.
 */
import { Injectable } from '@angular/core';

import { Store, StoreConfig } from '@datorama/akita';
import { Catalogo } from '@libs/shared/data-access-user/src';

/**
 * @interface Tramite630104State
 * @description Define la estructura del estado para el trámite 260904.
 */
export interface Tramite630104State {
  /** Indica si el solicitante es representante legal o no */
  esConsultaRep: string | null;
  /** Indica si el solicitante es extranjero o no */
  esExtranjero: string | null;

  /** Nombre del solicitante */
  nombre: string;
  /** Apellido paterno del solicitante */
  apellidoPaterno: string;
  /** Apellido materno del solicitante */
  apellidoMaterno: string;
  /** Calle del solicitante */
  calle: string;
  /** Número exterior del solicitante */  
  numeroExterior: string;
  /** Número interior del solicitante */
  numeroInterior: string;
  /** País del solicitante */
  pais: string;
  /** Estado o localidad del solicitante */
  estadoLocalidad: string;
  /** Correo electrónico del solicitante */
  correoElectronico: string;
  /** Teléfono del solicitante */
  telefono: string;
  /** Código postal del solicitante */
  codigoPostal: string;

 
}

/**
 * @function createInitialState
 * @description Crea el estado inicial para el trámite 260904.
 * @returns {Tramite630104State} Estado inicial con valores predeterminados.
 */
export function createInitialState(): Tramite630104State {
  return {
    esConsultaRep: null,
    esExtranjero: null,
    nombre:'',
    apellidoPaterno:'',
    apellidoMaterno:'',
    calle: '',
    numeroExterior:'',
    numeroInterior:'',
    pais:'',
    estadoLocalidad: '',
    correoElectronico:'',
    telefono: '',
    codigoPostal: '',
  };
}

/**
 * @class Tramite630104Store
 * @description Clase que extiende la funcionalidad de Akita Store para gestionar el estado
 * del trámite 260904. Proporciona métodos para actualizar propiedades específicas del estado.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite630104', resettable: true })
export class Tramite630104Store extends Store<Tramite630104State> {
  constructor() {
    super(createInitialState());
  }
  esExtranjero: string | null = null; 
  esConsultaRep: string | null = null;
  public establecerDatos(values: Partial<Tramite630104State>): void {
    this.update((state) => ({
      ...state,
      ...values,
    }));
  }
}
