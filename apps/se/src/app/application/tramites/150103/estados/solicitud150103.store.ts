import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

/**
 * @description Interfaz que define el estado de la solicitud.
 * Contiene propiedades relacionadas con los datos de reporte anual.
 */
export interface Solicitud150103State {
  /** Fecha de inicio del reporte */
  inicio: string;
  /** Fecha de fin del reporte */
  fin: string;
  /** Folio del programa asociado a la solicitud */
  folioPrograma: string;
  /** Modalidad del programa */
  modalidad: string;
  /** Tipo de programa */
  tipoPrograma: string;
  /** Estatus del programa */
  estatus: string;
  /** Ventas totales */
  ventasTotales: string;
  /** Total de exportaciones */
  totalExportaciones: string;
  /** Total de importaciones */
  totalImportaciones: string;
  /** Saldo calculado */
  saldo: string;
  /** Porcentaje de exportación calculado */
  porcentajeExportacion: string;
  /** Lista de bienes producidos */
  /**
   * @description Arreglo que contiene los datos de los bienes producidos.
   * Cada elemento del arreglo es de tipo `BienesProducidos` y representa
   * un bien con sus respectivas características y detalles.
   */
}

/**
 * @description Función que crea el estado inicial de la solicitud.
 * @returns El estado inicial de la solicitud con valores predeterminados.
 * @function createInitialState
 * @returns {Solicitud150103State} Estado inicial de la solicitud.
 * 
 */
export function createInitialState(): Solicitud150103State {
  return {
    /**
 * Fecha de inicio del reporte.
 */
inicio: '',

/**
 * Fecha de fin del reporte.
 */
fin: '',

/**
 * Folio del programa asociado a la solicitud.
 */
folioPrograma: '',

/**
 * Modalidad del programa.
 */
modalidad: '',

/**
 * Tipo de programa.
 */
tipoPrograma: '',

/**
 * Estatus del programa.
 */
estatus: '',

/**
 * Ventas totales.
 */
ventasTotales: '',

/**
 * Total de exportaciones.
 */
totalExportaciones: '',

/**
 * Total de importaciones.
 */
totalImportaciones: '0',

/**
 * Saldo calculado.
 */
saldo: '0',

/**
 * Porcentaje de exportación calculado.
 */
porcentajeExportacion: '0',
  };
}

/**
 * @description Servicio que gestiona el estado de la solicitud utilizando Akita.
 * Proporciona métodos para actualizar distintas propiedades del estado.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'solicitud150103Store', resettable: true })
/**
 * @description Servicio que gestiona el estado de la solicitud utilizando Akita.
 * Proporciona métodos para actualizar distintas propiedades del estado.
 * @class Solicitud150103Store
 */
export class Solicitud150103Store extends Store<Solicitud150103State> {
  /**
   * @description Constructor que inicializa el store con el estado inicial.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * @description Actualiza la fecha de fin del reporte.
   * @param fin Fecha de fin como una cadena.
   */
  actualizarFin(fin: string): void {
    this.update((state) => ({
      ...state,
      fin,
    }));
  }

  /**
   * @description Actualiza el folio del programa.
   * @param folioPrograma Folio del programa como una cadena.
   */
  actualizarFolioPrograma(folioPrograma: string): void {
    this.update((state) => ({
      ...state,
      folioPrograma,
    }));
  }

  /**
   * @description Actualiza la modalidad del programa.
   * @param modalidad Modalidad del programa como una cadena.
   */
  actualizarModalidad(modalidad: string): void {
    this.update((state) => ({
      ...state,
      modalidad,
    }));
  }

  /**
   * @description Actualiza el tipo de programa.
   * @param tipoPrograma Tipo de programa como una cadena.
   */
  actualizarTipoPrograma(tipoPrograma: string): void {
    this.update((state) => ({
      ...state,
      tipoPrograma,
    }));
  }

  /**
   * @description Actualiza el estatus del programa.
   * @param estatus Estatus del programa como una cadena.
   */
  actualizarEstatus(estatus: string): void {
    this.update((state) => ({
      ...state,
      estatus,
    }));
  }

  /**
   * @description Actualiza la fecha de inicio del reporte.
   * @param inicio Fecha de inicio como una cadena.
   */
  actualizarInicio(inicio: string): void {
    this.update((state) => ({
      ...state,
      inicio,
    }));
  }

  /**
   * @description Actualiza las ventas totales.
   * @param ventasTotales Ventas totales como una cadena.
   */
  actualizarVentasTotales(ventasTotales: string): void {
    this.update((state) => ({
      ...state,
      ventasTotales,
    }));
  }

  /**
   * @description Actualiza el total de exportaciones.
   * @param totalExportaciones Total de exportaciones como una cadena.
   */
  actualizarTotalExportaciones(totalExportaciones: string): void {
    this.update((state) => ({
      ...state,
      totalExportaciones,
    }));
  }

  /**
   * @description Actualiza el total de importaciones.
   * @param totalImportaciones Total de importaciones como una cadena.
   */
  actualizarTotalImportaciones(totalImportaciones: string): void {
    this.update((state) => ({
      ...state,
      totalImportaciones,
    }));
  }

  /**
   * @description Actualiza el saldo calculado.
   * @param saldo Saldo como una cadena.
   */
  actualizarSaldo(saldo: string): void {
    this.update((state) => ({
      ...state,
      saldo,
    }));
  }

  /**
   * @description Actualiza el porcentaje de exportación calculado.
   * @param porcentajeExportacion Porcentaje de exportación como una cadena.
   */
  actualizarPorcentajeExportacion(porcentajeExportacion: string): void {
    this.update((state) => ({
      ...state,
      porcentajeExportacion,
    }));
  }


  /**
   * Restablece el estado de la tienda a su estado inicial.
   */
  resetStore(): void {
    this.reset();
  }
}
