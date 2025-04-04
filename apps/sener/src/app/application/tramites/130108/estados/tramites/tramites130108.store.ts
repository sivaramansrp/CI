import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Interfaz que define el estado del trámite 130108.
 * @interface
 */
export interface Tramite130108State {
  /** Plazo del trámite */
  plazo: string;
  /** Descripción del trámite */
  descripcion: string;
  /** Fracción del trámite */
  fraccion: string;
  /** Unidad de medida del trámite */
  umt: string;
  /** NICO del trámite */
  nico: string;
  /** Cantidad asociada al trámite */
  cantidad: string;
  /** Valor de la partida en USD */
  valorPartidaUSD: number;
  /** Unidad de medida */
  unidadMedida: string;
  /** Solicitud del trámite */
  solicitud: string;
  /** Valor por defecto para el campo de selección */
  defaultSelect: string;
  /** Plazo por defecto */
  defaultPlazo: string;
  /** Régimen del trámite */
  regimen: string;
  /** Clasificación del trámite */
  clasificacion: string;
  /** Fila seleccionada para mostrar */
  filaSeleccionada: null;
  /** Cantidad de partidas de la mercancía */
  cantidadPartidasDeLaMercancia: string;
  /** Valor de la partida en USD para las partidas de la mercancía */
  valorPartidaUSDPartidasDeLaMercancia: number;
  /** Descripción de las partidas de la mercancía */
  descripcionPartidasDeLaMercancia: string;
  /** Valor de la factura en USD */
  valorFacturaUSD: string;
  /** Bloque relacionado con el trámite */
  bloque: string;
  /** Uso específico del trámite */
  usoEspecifico: string;
  /** Justificación de importación o exportación */
  justificacionImportacionExportacion: string;
  /** Observaciones relacionadas al trámite */
  observaciones: string;
  /** Entidad responsable del trámite */
  entidad: string;
  /** Representación del trámite */
  representacion: string;
  /** Bandera para mostrar u ocultar la tabla */
  mostrarTabla: boolean;
}

/**
 * Función que devuelve el estado inicial para el trámite 130108.
 * @returns {Tramite130108State} Estado inicial con valores predeterminados.
 */
export function createInitialState(): Tramite130108State {
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
 * Store para gestionar el estado del trámite 130108.
 * @class
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tramite130108' })
export class Tramite130108Store extends Store<Tramite130108State> {
  /**
   * Constructor de la clase Tramite130108Store que inicializa el estado.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Actualiza el campo 'solicitud' en el estado.
   * @param {string} solicitud - Nueva solicitud a establecer.
   */
  public updateSolicitud(solicitud: string): void {
    this.update((state) => ({
      ...state,
      solicitud,
    }));
  }

  /**
   * Actualiza el campo 'defaultSelect' en el estado.
   * @param {string} defaultSelect - Nuevo valor para el campo 'defaultSelect'.
   */
  public updateDefaultSelect(defaultSelect: string): void {
    this.update((state) => ({
      ...state,
      defaultSelect,
    }));
  }

  /**
   * Actualiza el estado con los valores parciales proporcionados.
   * @param {Partial<Tramite130108State>} updates - Nuevos valores parciales para el estado.
   */
  public updateState(updates: Partial<Tramite130108State>): void {
    this.update(updates);
  }

  /**
   * Actualiza el valor de 'plazo' en el estado.
   * @param {string} plazo - Nuevo valor para el campo 'plazo'.
   */
  public setProducto(plazo: string): void {
    this.update({ plazo });
  }

  /**
   * Actualiza la descripción en el estado.
   * @param {string} descripcion - Nueva descripción para el trámite.
   */
  public setDescripcion(descripcion: string): void {
    this.update({ descripcion });
  }

  /**
   * Actualiza la cantidad en el estado.
   * @param {string} cantidad - Nueva cantidad para el trámite.
   */
  public setCantidad(cantidad: string): void {
    this.update({ cantidad });
  }

  /**
   * Actualiza el valor de la partida en USD.
   * @param {number} valorPartidaUSD - Nuevo valor en USD para la partida.
   */
  public setValorPartidaUSD(valorPartidaUSD: number): void {
    this.update({ valorPartidaUSD });
  }

  /**
   * Actualiza la unidad de medida en el estado.
   * @param {string} unidadMedida - Nueva unidad de medida para el trámite.
   */
  public setUnidadMedida(unidadMedida: string): void {
    this.update({ unidadMedida });
  }

  /**
   * Actualiza el valor de 'defaultPlazo' en el estado.
   * @param {string} defaultPlazo - Nuevo valor para el campo 'defaultPlazo'.
   */
  public updateDefaultProducto(defaultPlazo: string): void {
    this.update({ defaultPlazo });
  }

  /**
   * Actualiza el régimen en el estado.
   * @param {string} regimen - Nuevo valor para el campo 'regimen'.
   */
  public setRegimen(regimen: string): void {
    this.update({ regimen });
  }

  /**
   * Actualiza la clasificación en el estado.
   * @param {string} clasificacion - Nueva clasificación para el trámite.
   */
  public setClasificacion(clasificacion: string): void {
    this.update({ clasificacion });
  }

  /**
   * Actualiza la bandera para mostrar u ocultar la tabla.
   * @param {boolean} mostrar - Valor que indica si la tabla debe mostrarse o no.
   */
  public setMostrarTabla(mostrar: boolean): void {
    this.update({ mostrarTabla: mostrar });
  }

  /**
   * Actualiza el valor de la factura en USD.
   * @param {string} valorFacturaUSD - Nuevo valor de la factura en USD.
   */
  public setValorFacturaUSD(valorFacturaUSD: string): void {
    this.update((state) => ({
      ...state,
      valorFacturaUSD,
    }));
  }

  /**
   * Actualiza la descripción de las partidas de la mercancía.
   * @param {string} descripcionPartidasDeLaMercancia - Nueva descripción de las partidas de la mercancía.
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
   * Actualiza la cantidad de partidas de la mercancía.
   * @param {string} cantidadPartidasDeLaMercancia - Nueva cantidad de partidas de la mercancía.
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
   * Actualiza el valor de la partida USD de las partidas de la mercancía.
   * @param {number} valorPartidaUSD - Nuevo valor de la partida en USD.
   */
  public setvalorPartidaUSD(valorPartidaUSD: number): void {
    this.update((state) => ({
      ...state,
      valorPartidaUSD,
    }));
  }

  /**
   * Actualiza el valor de la partida USD para las partidas de la mercancía.
   * @param {number} valorPartidaUSDPartidasDeLaMercancia - Nuevo valor en USD para las partidas de la mercancía.
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
   * @param {string} bloque - Nuevo valor para el campo 'bloque'.
   */
  public setBloque(bloque: string): void {
    this.update({ bloque });
  }

  /**
   * Actualiza el uso específico del trámite.
   * @param {string} usoEspecifico - Nuevo valor para el campo 'usoEspecifico'.
   */
  public setUsoEspecifico(usoEspecifico: string): void {
    this.update({ usoEspecifico });
  }

  /**
   * Actualiza la justificación de importación o exportación.
   * @param {string} justificacionImportacionExportacion - Nueva justificación.
   */
  public setJustificacionImportacionExportacion(
    justificacionImportacionExportacion: string
  ): void {
    this.update({ justificacionImportacionExportacion });
  }

  /**
   * Actualiza las observaciones del trámite.
   * @param {string} observaciones - Nuevas observaciones.
   */
  public setObservaciones(observaciones: string): void {
    this.update({ observaciones });
  }

  /**
   * Actualiza la entidad responsable del trámite.
   * @param {string} entidad - Nueva entidad.
   */
  public setEntidad(entidad: string): void {
    this.update({ entidad });
  }

  /**
   * Actualiza la representación en el estado.
   * @param {string} representacion - Nueva representación.
   */
  public setRepresentacion(representacion: string): void {
    this.update({ representacion });
  }

  /**
   * Actualiza la fila seleccionada en el estado.
   * @param {null} fila - Fila seleccionada, puede ser null.
   */
  public storeTableValues(fila: null): void {
    this.update({
      filaSeleccionada: fila,
    });
  }

  /**
   * Actualiza la fracción en el estado.
   * @param {string} fraccion - Nueva fracción.
   */
  public setFraccion(fraccion: string): void {
    this.update((state) => ({
      ...state,
      fraccion,
    }));
  }

  /**
   * Actualiza la unidad de medida del trámite.
   * @param {string} umt - Nueva unidad de medida.
   */
  public setUmt(umt: string): void {
    this.update((state) => ({
      ...state,
      umt,
    }));
  }

  /**
   * Actualiza el NICO en el estado.
   * @param {string} nico - Nuevo valor para el campo 'nico'.
   */
  public setNico(nico: string): void {
    this.update((state) => ({
      ...state,
      nico,
    }));
  }
}
