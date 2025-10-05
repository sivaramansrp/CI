/**
 * @fileoverview
 * Store de estado para el trámite 110209 usando Akita.
 * Define la interfaz de estado, el estado inicial y el store con métodos para actualizar el estado.
 */

import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Mercancias } from '../../constantes/certificado-sgp.enum';

/**
 * Interfaz que define el estado del trámite 110209.
 * @interface
 */
export interface Tramite110209State {
  /** ID de la solicitud */
  idSolicitud: number | null;
  /** Medio de transporte utilizado */
  medioDeTransporte: string;
  /** Ruta completa del transporte */
  rutaCompleta: string;
  /** Puerto de embarque */
  puertoDeEmbarque: string;
  /** Puerto de desembarque */
  puertoDeDesembarque: string;
  /** Observaciones adicionales */
  observaciones: string;
  /** Mercancías seleccionadas */
  mercanciasSeleccionadas: Mercancias;
  /** Descripción de la mercancía */
  descripcion: string;
  /** Marca de la mercancía */
  marca: string;
  /** Valor de la mercancía */
  valorMercancia: string;
  /** Unidad de medida */
  unidadMedida: string;
  /** Número de factura */
  numeroFactura: string;
  /** Tipo de factura */
  tipoFactura: string;
  /** Nombre del destinatario o exportador */
  nombre: string;
  /** Primer apellido */
  primerApellido: string;
  /** Segundo apellido */
  segundoApellido: string;
  /** Número de registro fiscal */
  numeroDeRegistroFiscal: string;
  /** Razón social */
  razonSocial: string;
  /** Calle */
  calle: string;
  /** Número o letra de domicilio */
  numeroLetra: string;
  /** Ciudad */
  ciudad: string;
  /** Correo electrónico */
  correoElectronico: string;
  /** Fax */
  fax: number;
  /** Teléfono */
  telefono: number;
}

/**
 * Función que crea el estado inicial del trámite 110209.
 * @returns {Tramite110209State} - El estado inicial del trámite 110209.
 */
export function createInitialState(): Tramite110209State {
  return {
    idSolicitud: 0,
    medioDeTransporte: '',
    rutaCompleta: '',
    puertoDeEmbarque: '',
    puertoDeDesembarque: '',
    observaciones: '',
    mercanciasSeleccionadas: {
      numeroDeOrden: '',
      fraccionArancelaria: '',
      nombreTecnico: '',
      nombreComercial: '',
      nombreIngles: '',
      numeroDeRegistro: '',
    },
    descripcion: '',
    marca: '',
    valorMercancia: '',
    unidadMedida: '',
    numeroFactura: '',
    tipoFactura: '',
    nombre: '',
    primerApellido: '',
    segundoApellido: '',
    numeroDeRegistroFiscal: '',
    razonSocial: '',
    calle: '',
    numeroLetra: '',
    ciudad: '',
    correoElectronico: '',
    fax: 0,
    telefono: 0,
  };
}

/**
 * Store de Akita para el trámite 110209.
 * Permite gestionar y actualizar el estado de la información del trámite.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite110209', resettable: true })
export class Tramite110209Store extends Store<Tramite110209State> {
  /**
   * Constructor del store.
   * Inicializa el estado con los valores por defecto.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Guarda el ID de la solicitud en el estado.
   *
   * @param idSolicitud - El ID de la solicitud que se va a guardar.
   */
  public setIdSolicitud(idSolicitud: number): void {
    this.update((state) => ({
      ...state,
      idSolicitud,
    }));
  }

  /**
   * Actualiza el estado del store con los datos proporcionados.
   * @param {Partial<Tramite110209State>} estado - Datos parciales para actualizar el estado.
   */
  setTramite110209(estado: Partial<Tramite110209State>): void {
    this.update((state) => ({
      ...state,
      ...estado,
    }));
  }
}