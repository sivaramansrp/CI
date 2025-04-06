import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Interfaz que representa el estado para el trámite 130121.
 *
 * @interface Tramite130121State
 */
export interface Tramite130121State {
  /**
   * Plazo del trámite.
   */
  plazo: string;
  /**
   * Descripción del trámite.
   */
  descripcion: string;
  /**
   * Fracción arancelaria.
   */
  fraccion: string;
  /**
   * Unidad de medida (UMT).
   */
  umt: string;
  /**
   * Código NICo.
   */
  nico: string;
  /**
   * Cantidad del trámite.
   */
  cantidad: string;
  /**
   * Valor de la partida en dólares estadounidenses.
   */
  valorPartidaUSD: number;
  /**
   * Unidad de medida.
   */
  unidadMedida: string;
  /**
   * Solicitud del trámite.
   */
  solicitud: string;
  /**
   * Valor por defecto del select.
   */
  defaultSelect: string;
  /**
   * Plazo por defecto.
   */
  defaultPlazo: string;
  /**
   * Régimen del trámite.
   */
  regimen: string;
  /**
   * Clasificación del trámite.
   */
  clasificacion: string;
  /**
   * Fila seleccionada en la tabla (puede ser nula).
   */
  filaSeleccionada: null;
  /**
   * Cantidad de partidas de la mercancía.
   */
  cantidadPartidasDeLaMercancia: string;
  /**
   * Valor de la partida en USD para partidas de la mercancía.
   */
  valorPartidaUSDPartidasDeLaMercancia: number;
  /**
   * Descripción de las partidas de la mercancía.
   */
  descripcionPartidasDeLaMercancia: string;
  /**
   * Valor de la factura en USD.
   */
  valorFacturaUSD: string;
  /**
   * Bloque del trámite.
   */
  bloque: string;
  /**
   * Uso específico del trámite.
   */
  usoEspecifico: string;
  /**
   * Justificación para importación o exportación.
   */
  justificacionImportacionExportacion: string;
  /**
   * Observaciones adicionales.
   */
  observaciones: string;
  /**
   * Entidad relacionada.
   */
  entidad: string;
  /**
   * Representación asociada.
   */
  representacion: string;
  /**
   * Indica si se muestra la tabla.
   */
  mostrarTabla: boolean;
}

/**
 * Crea el estado inicial para el trámite 130121.
 *
 * @returns {Tramite130121State} Estado inicial del trámite.
 */
export function createInitialState(): Tramite130121State {
  return {
    filaSeleccionada: null,
    mostrarTabla: false,
    solicitud: '',
    fraccion: '',
    umt: '',
    nico: '',
    defaultSelect: 'Inicial',
    plazo: '',
    descripcion: '',
    cantidad: '',
    valorPartidaUSD: 0,
    unidadMedida: '',
    defaultPlazo: 'Largo plazo (5 años)',
    regimen: '',
    clasificacion: '',
    cantidadPartidasDeLaMercancia: '',
    valorPartidaUSDPartidasDeLaMercancia: 0,
    descripcionPartidasDeLaMercancia: '',
    valorFacturaUSD: '',
    bloque: '',
    usoEspecifico: '',
    justificacionImportacionExportacion: '',
    observaciones: '',
    entidad: '',
    representacion: '',
  };
}

/**
 * Servicio de Store para gestionar el estado del trámite 130121.
 *
 * @export
 * @class Tramite130121Store
 * @extends {Store<Tramite130121State>}
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tramite130121' })
export class Tramite130121Store extends Store<Tramite130121State> {
  /**
   * Crea una instancia del Tramite130121Store.
   * Inicializa el estado utilizando createInitialState.
   *
   * @memberof Tramite130121Store
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Actualiza la fracción en el estado.
   *
   * @param {string} fraccion - La fracción arancelaria a establecer.
   * @memberof Tramite130121Store
   */
  public setFraccion(fraccion: string): void {
    this.update((state) => ({
      ...state,
      fraccion,
    }));
  }

  /**
   * Actualiza la unidad de medida UMT en el estado.
   *
   * @param {string} umt - La unidad de medida a establecer.
   * @memberof Tramite130121Store
   */
  public setUmt(umt: string): void {
    this.update((state) => ({
      ...state,
      umt,
    }));
  }

  /**
   * Actualiza el código NICo en el estado.
   *
   * @param {string} nico - El código NICo a establecer.
   * @memberof Tramite130121Store
   */
  public setNico(nico: string): void {
    this.update((state) => ({
      ...state,
      nico,
    }));
  }

  /**
   * Actualiza la solicitud en el estado.
   *
   * @param {string} solicitud - La solicitud a establecer.
   * @memberof Tramite130121Store
   */
  public updateSolicitud(solicitud: string): void {
    this.update((state) => ({
      ...state,
      solicitud,
    }));
  }

  /**
   * Actualiza el valor por defecto del select en el estado.
   *
   * @param {string} defaultSelect - El valor por defecto del select a establecer.
   * @memberof Tramite130121Store
   */
  public updateDefaultSelect(defaultSelect: string): void {
    this.update((state) => ({
      ...state,
      defaultSelect,
    }));
  }

  /**
   * Actualiza múltiples propiedades del estado.
   *
   * @param {Partial<Tramite130121State>} updates - Objeto con las propiedades a actualizar.
   * @memberof Tramite130121Store
   */
  public updateState(updates: Partial<Tramite130121State>): void {
    this.update(updates);
  }

  /**
   * Actualiza el plazo del producto en el estado.
   *
   * @param {string} plazo - El plazo a establecer.
   * @memberof Tramite130121Store
   */
  public setProducto(plazo: string): void {
    this.update({ plazo });
  }

  /**
   * Actualiza la descripción en el estado.
   *
   * @param {string} descripcion - La descripción a establecer.
   * @memberof Tramite130121Store
   */
  public setDescripcion(descripcion: string): void {
    this.update({ descripcion });
  }

  /**
   * Actualiza la cantidad en el estado.
   *
   * @param {string} cantidad - La cantidad a establecer.
   * @memberof Tramite130121Store
   */
  public setCantidad(cantidad: string): void {
    this.update({ cantidad });
  }

  /**
   * Actualiza el valor de la partida en USD en el estado.
   *
   * @param {number} valorPartidaUSD - El valor en USD a establecer.
   * @memberof Tramite130121Store
   */
  public setValorPartidaUSD(valorPartidaUSD: number): void {
    this.update({ valorPartidaUSD });
  }

  /**
   * Actualiza la unidad de medida en el estado.
   *
   * @param {string} unidadMedida - La unidad de medida a establecer.
   * @memberof Tramite130121Store
   */
  public setUnidadMedida(unidadMedida: string): void {
    this.update({ unidadMedida });
  }

  /**
   * Actualiza el plazo por defecto del producto en el estado.
   *
   * @param {string} defaultPlazo - El plazo por defecto a establecer.
   * @memberof Tramite130121Store
   */
  public updateDefaultProducto(defaultPlazo: string): void {
    this.update({ defaultPlazo });
  }

  /**
   * Actualiza el régimen en el estado.
   *
   * @param {string} regimen - El régimen a establecer.
   * @memberof Tramite130121Store
   */
  public setregimen(regimen: string): void {
    this.update({ regimen });
  }

  /**
   * Actualiza la clasificación en el estado.
   *
   * @param {string} clasificacion - La clasificación a establecer.
   * @memberof Tramite130121Store
   */
  public setclasificacion(clasificacion: string): void {
    this.update({ clasificacion });
  }

  /**
   * Actualiza el indicador que muestra la tabla en el estado.
   *
   * @param {boolean} mostrar - Valor booleano para mostrar o no la tabla.
   * @memberof Tramite130121Store
   */
  public setMostrarTabla(mostrar: boolean): void {
    this.update({ mostrarTabla: mostrar });
  }

  /**
   * Actualiza el valor de la factura en USD en el estado.
   *
   * @param {string} valorFacturaUSD - El valor de la factura a establecer en USD.
   * @memberof Tramite130121Store
   */
  public setValorFacturaUSD(valorFacturaUSD: string): void {
    this.update((state) => ({
      ...state,
      valorFacturaUSD,
    }));
  }

  /**
   * Actualiza la descripción de las partidas de la mercancía en el estado.
   *
   * @param {string} descripcionPartidasDeLaMercancia - La descripción a establecer para las partidas.
   * @memberof Tramite130121Store
   */
  public setDescripcionPartidasDeLaMercancia(
    descripcionPartidasDeLaMercancia: string
  ): void {
    this.update((state) => ({
      ...state,
      descripcionPartidasDeLaMercancia,
    }));
  }

  /**
   * Actualiza la cantidad de partidas de la mercancía en el estado.
   *
   * @param {string} cantidadPartidasDeLaMercancia - La cantidad de partidas a establecer.
   * @memberof Tramite130121Store
   */
  public setCantidadPartidasDeLaMercancia(
    cantidadPartidasDeLaMercancia: string
  ): void {
    this.update((state) => ({
      ...state,
      cantidadPartidasDeLaMercancia,
    }));
  }

  /**
   * Actualiza el valor de la partida en USD en el estado.
   * Nota: Este método es similar a setValorPartidaUSD.
   *
   * @param {number} valorPartidaUSD - El valor en USD a establecer.
   * @memberof Tramite130121Store
   */
  public setvalorPartidaUSD(valorPartidaUSD: number): void {
    this.update((state) => ({
      ...state,
      valorPartidaUSD,
    }));
  }

  /**
   * Actualiza el valor de la partida en USD para las partidas de la mercancía en el estado.
   *
   * @param {number} valorPartidaUSDPartidasDeLaMercancia - El valor en USD a establecer para las partidas.
   * @memberof Tramite130121Store
   */
  public setValorPartidaUSDPartidasDeLaMercancia(
    valorPartidaUSDPartidasDeLaMercancia: number
  ): void {
    this.update((state) => ({
      ...state,
      valorPartidaUSDPartidasDeLaMercancia,
    }));
  }

  /**
   * Actualiza el bloque en el estado.
   *
   * @param {string} bloque - El bloque a establecer.
   * @memberof Tramite130121Store
   */
  public setBloque(bloque: string): void {
    this.update({ bloque });
  }

  /**
   * Actualiza el uso específico en el estado.
   *
   * @param {string} usoEspecifico - El uso específico a establecer.
   * @memberof Tramite130121Store
   */
  public setUsoEspecifico(usoEspecifico: string): void {
    this.update({ usoEspecifico });
  }

  /**
   * Actualiza la justificación para importación o exportación en el estado.
   *
   * @param {string} justificacionImportacionExportacion - La justificación a establecer.
   * @memberof Tramite130121Store
   */
  public setJustificacionImportacionExportacion(
    justificacionImportacionExportacion: string
  ): void {
    this.update({ justificacionImportacionExportacion });
  }

  /**
   * Actualiza las observaciones en el estado.
   *
   * @param {string} observaciones - Las observaciones a establecer.
   * @memberof Tramite130121Store
   */
  public setObservaciones(observaciones: string): void {
    this.update({ observaciones });
  }

  /**
   * Actualiza la entidad en el estado.
   *
   * @param {string} entidad - La entidad a establecer.
   * @memberof Tramite130121Store
   */
  public setEntidad(entidad: string): void {
    this.update({ entidad });
  }

  /**
   * Actualiza la representación en el estado.
   *
   * @param {string} representacion - La representación a establecer.
   * @memberof Tramite130121Store
   */
  public setRepresentacion(representacion: string): void {
    this.update({ representacion });
  }

  /**
   * Almacena el valor de la fila seleccionada en la tabla en el estado.
   *
   * @param {null} fila - La fila seleccionada (valor nulo en este caso).
   * @memberof Tramite130121Store
   */
  public storeTableValues(fila: null): void {
    this.update({
      filaSeleccionada: fila,
    });
  }
}
