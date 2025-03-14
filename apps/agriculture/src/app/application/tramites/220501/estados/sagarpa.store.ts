import { Catalogo } from '@libs/shared/data-access-user/src';
import { DatosDelaSolicitud } from '../models/datos-generales.model';
import { Injectable } from '@angular/core';
import { MedioTransporte } from '../models/medio-transporte.model';
import { Movilizacion } from '../models/datos-generales.model';
import { PagoDeDerechos } from '../models/pago-de-derechos.model';
import { SagarpaState } from '../models/sagarpa-state.models';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

/** 
 * Función que crea el estado inicial de la store.
 * @returns Estado inicial de tipo SagarpaState.
 */
export function crearEstadoInicial(): SagarpaState {
  return {
    pagoDeDerechos: {} as PagoDeDerechos,
    medioTransporte: {} as MedioTransporte,
    datosDelaSolicitud: {} as DatosDelaSolicitud,
    movilizacion: {} as Movilizacion,
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'sagarpa', resettable: true })
export class SagarpaStore extends Store<SagarpaState> {
  constructor() {
    super(crearEstadoInicial());
  }

  /** 
   * Actualiza la información del pago de derechos en el store.
   * @param datos Datos del pago de derechos.
   */
  actualizarPagoDeDerechos(datos: PagoDeDerechos): void {
    this.update((state) => ({
      ...state,
      pagoDeDerechos: { ...datos },
    }));
  }

  /** 
   * Actualiza la justificación en el pago de derechos con la descripción del catálogo seleccionado.
   * @param datos Objeto de tipo Catalogo que contiene la justificación seleccionada.
   */
  actualizarJustificacionCatalogo(datos: Catalogo): void {
    this.update((state) => ({
      ...state,
      pagoDeDerechos: {
        ...state.pagoDeDerechos,
        justificacion: datos.descripcion,
      },
    }));
  }

  /** 
   * Actualiza el banco en el pago de derechos con la descripción del catálogo seleccionado.
   * @param datos Objeto de tipo Catalogo que contiene el banco seleccionado.
   */
  actualizarBancoCatalogo(datos: Catalogo): void {
    this.update((state) => ({
      ...state,
      pagoDeDerechos: {
        ...state.pagoDeDerechos,
        banco: datos.descripcion,
      },
    }));
  }

  /** 
   * Actualiza el medio de transporte en el store.
   * @param value Valor del medio de transporte seleccionado.
   */
  actualizarMedioDetransporte(value: string): void {
    this.update((state) => ({
      ...state,
      medioTransporte: {
        ...state.medioTransporte,
        medioDeTransporte: value,
      },
    }));
  }

  /** 
   * Actualiza la identificación del transporte en el store.
   * @param value Valor de la identificación del transporte.
   */
  actualizarIdentificacionDelTransporte(value: string): void {
    this.update((state) => ({
      ...state,
      medioTransporte: {
        ...state.medioTransporte,
        identificacionTransporte: value,
      },
    }));
  }

  /** 
   * Actualiza si el ferrocarril se solicita por partes.
   * @param value Número que indica si la solicitud es parcial.
   */
  actualizarFerrocarrilPorPartes(value: number): void {
    this.update((state) => ({
      ...state,
      medioTransporte: {
        ...state.medioTransporte,
        esSolicitudFerros: value,
      },
    }));
  }

  /** 
   * Actualiza el total de guías amparadas en el medio de transporte.
   * @param value Valor del total de guías amparadas.
   */
  actualizarTotalDeGuiasAmparadas(value: string): void {
    this.update((state) => ({
      ...state,
      medioTransporte: {
        ...state.medioTransporte,
        totalGuias: value,
      },
    }));
  }

  /** 
   * Actualiza los datos de la solicitud en el store.
   * @param datos Objeto con los datos de la solicitud.
   */
  actualizarDatosDelaSolicitud(datos: DatosDelaSolicitud): void {
    this.update((state) => ({
      ...state,
      datosDelaSolicitud: { ...datos },
    }));
  }

  /** 
   * Actualiza los datos de movilización en el store.
   * @param datos Objeto con los datos de movilización.
   */
  actualizarMovilizacion(datos: Movilizacion): void {
    this.update((state) => ({
      ...state,
      movilizacion: { ...datos },
    }));
  }

  /** 
   * Actualiza la oficina de inspección en los datos de la solicitud.
   * @param value Valor de la oficina de inspección seleccionada.
   */
  actualizarOficianaInspeccion(value: string): void {
    this.update((state) => ({
      ...state,
      datosDelaSolicitud: {
        ...state.datosDelaSolicitud,
        oficinaInspeccion: value,
      },
    }));
  }

  /** 
   * Actualiza la aduana de ingreso en los datos de la solicitud.
   * @param value Valor de la aduana de ingreso seleccionada.
   */
  actualizarAduanaIngreso(value: string): void {
    this.update((state) => ({
      ...state,
      datosDelaSolicitud: {
        ...state.datosDelaSolicitud,
        aduanaIngreso: value,
      },
    }));
  }

  /** 
   * Actualiza el punto de inspección en los datos de la solicitud.
   * @param value Valor del punto de inspección seleccionado.
   */
  actualizarPuntoInspeccion(value: string): void {
    this.update((state) => ({
      ...state,
      datosDelaSolicitud: {
        ...state.datosDelaSolicitud,
        puntoInspeccion: value,
      },
    }));
  }

  /** 
   * Actualiza el punto de inspección en los datos de movilización nacional.
   * @param value Valor del punto de inspección seleccionado.
   */
  actualizarMovilizacionNacional(value: string): void {
    this.update((state) => ({
      ...state,
      movilizacion: {
        ...state.movilizacion,
        puntoInspeccion: value,
      },
    }));
  }

  /** 
   * Restablece el estado de la store a su estado inicial.
   */
  public limpiarSeccion(): void {
    this.reset();
  }
}
