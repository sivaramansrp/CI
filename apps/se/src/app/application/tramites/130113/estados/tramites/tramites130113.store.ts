import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { PartidasDeLaMercanciaModelo } from '../../../../shared/models/partidas-de-la-mercancia.model';


/**
 * 
 * Interfaz que define el estado del store `Tramite130113State`.
 * Este estado almacena toda la información relacionada con el trámite 130113.
 */
export interface Tramite130113State {
  /** Producto seleccionado en el trámite. */
  producto: string;

  /** Descripción del producto o mercancía. */
  descripcion: string;

  /** Fracción arancelaria asociada al producto. */
  fraccion: string;

  /** Cantidad de producto o mercancía. */
  cantidad: string;

  /** Valor de la partida en USD. */
  valorPartidaUSD: number;

  /** Unidad de medida del producto o mercancía. */
  unidadMedida: string;

  /** Solicitud asociada al trámite. */
  solicitud: string;

  /** Valor predeterminado del selector en el formulario. */
  defaultSelect: string;

  /** Valor predeterminado del producto en el formulario. */
  defaultProducto: string;

  /** Régimen seleccionado en el trámite. */
  regimen: string;

  /** Clasificación del régimen seleccionado. */
  clasificacion: string;

  /** Fila seleccionada en la tabla de partidas de mercancía. */
  filaSeleccionada: PartidasDeLaMercanciaModelo[];

  /** Cantidad de partidas de la mercancía. */
  cantidadPartidasDeLaMercancia: string;

  /** Fracción TIGIE asociada a las partidas de la mercancía. */
  fraccionTigiePartidasDeLaMercancia: string;

  /** Descripción de la fracción asociada a las partidas de la mercancía. */
  fraccionDescripcionPartidasDeLaMercancia: string;

  /** Valor de la partida en USD para las partidas de la mercancía. */
  valorPartidaUSDPartidasDeLaMercancia: number;

  /** Descripción de las partidas de la mercancía. */
  descripcionPartidasDeLaMercancia: string;

  /** Valor de la factura en USD. */
  valorFacturaUSD: string;

  /** Bloque asociado al trámite. */
  bloque: string;

  /** Uso específico del producto o mercancía. */
  usoEspecifico: string;

  /** Justificación para la importación o exportación. */
  justificacionImportacionExportacion: string;

  /** Observaciones adicionales relacionadas con el trámite. */
  observaciones: string;

  /** Entidad federativa seleccionada en el trámite. */
  entidad: string;

  /** Representación federal seleccionada en el trámite. */
  representacion: string;

  /** Indica si se debe mostrar la tabla de partidas de mercancía. */
  mostrarTabla: boolean;
}

/**
 * 
 * Función que crea el estado inicial del store `Tramite130113Store`.
 * @returns {Tramite130113State} Estado inicial del store.
 */
export function createInitialState(): Tramite130113State {
  return {
    filaSeleccionada: [],
    mostrarTabla: false,
    solicitud: '',
    fraccion: '',
    defaultSelect: 'Inicial',
    producto: '',
    descripcion: '',
    cantidad: '',
    valorPartidaUSD: 0,
    unidadMedida: '',
    defaultProducto: 'Nuevo',
    regimen: '',
    clasificacion: '',
    cantidadPartidasDeLaMercancia: '',
    fraccionTigiePartidasDeLaMercancia: '',
    fraccionDescripcionPartidasDeLaMercancia: '',
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
 * 
 * Servicio que implementa el store `Tramite130113Store` para gestionar el estado
 * relacionado con el trámite 130113.
 *
 * @decorador @Injectable
 * @decorador @StoreConfig
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tramite130113' })
export class Tramite130113Store extends Store<Tramite130113State> {
  /**
   * 
   * Constructor del store `Tramite130113Store`.
   * Inicializa el estado con los valores predeterminados.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * 
   * Actualiza la fracción en el estado.
   * {string} fraccion - Nueva fracción.
   */
  public setFraccion(fraccion: string): void {
    this.update((state) => ({
      ...state,
      fraccion,
    }));
  }

  /**
   * 
   * Actualiza la solicitud en el estado.
   * {string} solicitud - Nueva solicitud.
   */
  public updateSolicitud(solicitud: string): void {
    this.update((state) => ({
      ...state,
      solicitud,
    }));
  }

  /**
   * 
   * Actualiza el valor predeterminado del selector en el estado.
   * {string} defaultSelect - Nuevo valor predeterminado.
   */
  public updateDefaultSelect(defaultSelect: string): void {
    this.update((state) => ({
      ...state,
      defaultSelect,
    }));
  }

  /**
   * 
   * Actualiza múltiples valores en el estado.
   * {Partial<Tramite130113State>} updates - Valores a actualizar.
   */
  public updateState(updates: Partial<Tramite130113State>): void {
    this.update(updates);
  }

  /**
   *
   * Actualiza el producto en el estado.
   * {string} producto - Nuevo producto.
   */
  public setProducto(producto: string): void {
    this.update({ producto });
  }

  /**
   *
   * Actualiza la descripción en el estado.
   * {string} descripcion - Nueva descripción.
   */
  public setDescripcion(descripcion: string): void {
    this.update({ descripcion });
  }

  /**
   *
   * Actualiza la cantidad en el estado.
   * {string} cantidad - Nueva cantidad.
   */
  public setCantidad(cantidad: string): void {
    this.update({ cantidad });
  }

  /**
   *
   * Actualiza el valor de la partida en USD en el estado.
   * {number} valorPartidaUSD - Nuevo valor de la partida en USD.
   */
  public setValorPartidaUSD(valorPartidaUSD: number): void {
    this.update({ valorPartidaUSD });
  }

  /**
   *
   * Actualiza la unidad de medida en el estado.
   * {string} unidadMedida - Nueva unidad de medida.
   */
  public setUnidadMedida(unidadMedida: string): void {
    this.update({ unidadMedida });
  }

  /**
   *
   * Actualiza el valor predeterminado del producto en el estado.
   * {string} defaultProducto - Nuevo valor predeterminado del producto.
   */
  public updateDefaultProducto(defaultProducto: string): void {
    this.update({ defaultProducto });
  }

  /**
   *
   * Actualiza el régimen en el estado.
   * {string} regimen - Nuevo régimen.
   */
  public setRegimen(regimen: string): void {
    this.update({ regimen });
  }

  /**
   *
   * Actualiza la clasificación en el estado.
   * {string} clasificacion - Nueva clasificación.
   */
  public setClasificacion(clasificacion: string): void {
    this.update({ clasificacion });
  }

  /**
   *
   * Actualiza si se debe mostrar la tabla en el estado.
   * {boolean} mostrar - Indica si se debe mostrar la tabla.
   */
  public setMostrarTabla(mostrar: boolean): void {
    this.update({ mostrarTabla: mostrar });
  }

  /**
   *
   * Actualiza el valor de factura en USD en el estado.
   * {string} valorFacturaUSD - Nuevo valor de factura en USD.
   */
  public setValorFacturaUSD(valorFacturaUSD: string): void {
    this.update((state) => ({
      ...state,
      valorFacturaUSD,
    }));
  }

  /**
   *
   * Actualiza la descripción de las partidas de la mercancía en el estado.
   * {string} descripcionPartidasDeLaMercancia - Nueva descripción de las partidas de la mercancía.
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
   *
   * Actualiza la cantidad de las partidas de la mercancía en el estado.
   * {string} cantidadPartidasDeLaMercancia - Nueva cantidad de las partidas de la mercancía.
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
   *
   * Actualiza la fracción TIGIE de las partidas de la mercancía en el estado.
   * {string} fraccionTigiePartidasDeLaMercancia - Nueva fracción TIGIE de las partidas de la mercancía.
   */
  public setFraccionTigiePartidasDeLaMercancia(
    fraccionTigiePartidasDeLaMercancia: string
  ): void {
    this.update((state) => ({
      ...state,
      fraccionTigiePartidasDeLaMercancia,
    }));
  }

  /**
   *
   * Actualiza la descripción de la fracción de las partidas de la mercancía en el estado.
   * {string} fraccionDescripcionPartidasDeLaMercancia - Nueva descripción de la fracción de las partidas de la mercancía.
   */
  public setFraccionDescripcionPartidasDeLaMercancia(
    fraccionDescripcionPartidasDeLaMercancia: string
  ): void {
    this.update((state) => ({
      ...state,
      fraccionDescripcionPartidasDeLaMercancia,
    }));
  }

  /**
   *
   * Actualiza el valor de la partida en USD en el estado.
   * {number} valorPartidaUSD - Nuevo valor de la partida en USD.
   */
  public setvalorPartidaUSD(valorPartidaUSD: number): void {
    this.update((state) => ({
      ...state,
      valorPartidaUSD,
    }));
  }

  /**
   *
   * Actualiza el valor de la partida en USD de las partidas de la mercancía en el estado.
   * {number} valorPartidaUSDPartidasDeLaMercancia - Nuevo valor de la partida en USD de las partidas de la mercancía.
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
   * 
   * Actualiza el bloque en el estado.
   * {string} bloque - Nuevo bloque.
   */
  public setBloque(bloque: string): void {
    this.update({ bloque });
  }

  /**
   * 
   * Actualiza el uso específico en el estado.
   * {string} usoEspecifico - Nuevo uso específico.
   */
  public setUsoEspecifico(usoEspecifico: string): void {
    this.update({ usoEspecifico });
  }

  /**
   * 
   * Actualiza la justificación de importación/exportación en el estado.
   * {string} justificacionImportacionExportacion - Nueva justificación de importación/exportación.
   */
  public setJustificacionImportacionExportacion(
    justificacionImportacionExportacion: string
  ): void {
    this.update({ justificacionImportacionExportacion });
  }

  /**
   * 
   * Actualiza las observaciones en el estado.
   * {string} observaciones - Nuevas observaciones.
   */
  public setObservaciones(observaciones: string): void {
    this.update({ observaciones });
  }

  /**
   * 
   * Actualiza la entidad en el estado.
   * {string} entidad - Nueva entidad.
   */
  public setEntidad(entidad: string): void {
    this.update({ entidad });
  }

  /**
   * 
   * Actualiza la representación en el estado.
   * {string} representacion - Nueva representación.
   */
  public setRepresentacion(representacion: string): void {
    this.update({ representacion });
  }

  /**
   * 
   * Almacena los valores de la fila seleccionada en el estado.
   * {PartidasDeLaMercanciaModelo[]} fila - Fila seleccionada.
   */
  public storeTableValues(fila: PartidasDeLaMercanciaModelo[]): void {
    this.update({
      filaSeleccionada: fila,
    });
  }
}
