import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { PartidasDeLaMercanciaModelo } from '../../../../shared/models/partidas-de-la-mercancia.model';


/**
 * @descripcion
 * Interfaz que define el estado del store `Tramite130113State`.
 * Este estado almacena toda la información relacionada con el trámite 130113.
 */
export interface Tramite130113State {
  producto: string;
  descripcion: string;
  fraccion: string;
  cantidad: string;
  valorPartidaUSD: number;
  unidadMedida: string;
  solicitud: string;
  defaultSelect: string;
  defaultProducto: string;
  regimen: string;
  clasificacion: string;
  filaSeleccionada: PartidasDeLaMercanciaModelo[];
  cantidadPartidasDeLaMercancia: string;
  fraccionTigiePartidasDeLaMercancia: string;
  fraccionDescripcionPartidasDeLaMercancia: string;
  valorPartidaUSDPartidasDeLaMercancia: number;
  descripcionPartidasDeLaMercancia: string;
  valorFacturaUSD: string;
  bloque: string;
  usoEspecifico: string;
  justificacionImportacionExportacion: string;
  observaciones: string;
  entidad: string;
  representacion: string;
  mostrarTabla: boolean;
}

/**
 * @descripcion
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
 * @descripcion
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
   * @descripcion
   * Constructor del store `Tramite130113Store`.
   * Inicializa el estado con los valores predeterminados.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * @descripcion
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
   * @descripcion
   * Actualiza la solicitud en el estado.
   * @param {string} solicitud - Nueva solicitud.
   */
  public updateSolicitud(solicitud: string): void {
    this.update((state) => ({
      ...state,
      solicitud,
    }));
  }

  /**
   * @descripcion
   * Actualiza el valor predeterminado del selector en el estado.
   * @param {string} defaultSelect - Nuevo valor predeterminado.
   */
  public updateDefaultSelect(defaultSelect: string): void {
    this.update((state) => ({
      ...state,
      defaultSelect,
    }));
  }

  /**
   * @descripcion
   * Actualiza múltiples valores en el estado.
   * @param {Partial<Tramite130113State>} updates - Valores a actualizar.
   */
  public updateState(updates: Partial<Tramite130113State>): void {
    this.update(updates);
  }

  /**
   * @descripcion
   * Actualiza el producto en el estado.
   * @param {string} producto - Nuevo producto.
   */
  public setProducto(producto: string): void {
    this.update({ producto });
  }

  /**
   * @descripcion
   * Actualiza la descripción en el estado.
   * @param {string} descripcion - Nueva descripción.
   */
  public setDescripcion(descripcion: string): void {
    this.update({ descripcion });
  }

  /**
   * @descripcion
   * Actualiza la cantidad en el estado.
   * @param {string} cantidad - Nueva cantidad.
   */
  public setCantidad(cantidad: string): void {
    this.update({ cantidad });
  }

  /**
   * @descripcion
   * Actualiza el valor de la partida en USD en el estado.
   * @param {number} valorPartidaUSD - Nuevo valor de la partida en USD.
   */
  public setValorPartidaUSD(valorPartidaUSD: number): void {
    this.update({ valorPartidaUSD });
  }

  /**
   * @descripcion
   * Actualiza la unidad de medida en el estado.
   * @param {string} unidadMedida - Nueva unidad de medida.
   */
  public setUnidadMedida(unidadMedida: string): void {
    this.update({ unidadMedida });
  }

  /**
   * @descripcion
   * Actualiza el valor predeterminado del producto en el estado.
   * @param {string} defaultProducto - Nuevo valor predeterminado del producto.
   */
  public updateDefaultProducto(defaultProducto: string): void {
    this.update({ defaultProducto });
  }

  /**
   * @descripcion
   * Actualiza el régimen en el estado.
   * @param {string} regimen - Nuevo régimen.
   */
  public setRegimen(regimen: string): void {
    this.update({ regimen });
  }

  /**
   * @descripcion
   * Actualiza la clasificación en el estado.
   * @param {string} clasificacion - Nueva clasificación.
   */
  public setClasificacion(clasificacion: string): void {
    this.update({ clasificacion });
  }

  /**
   * @descripcion
   * Actualiza si se debe mostrar la tabla en el estado.
   * @param {boolean} mostrar - Indica si se debe mostrar la tabla.
   */
  public setMostrarTabla(mostrar: boolean): void {
    this.update({ mostrarTabla: mostrar });
  }

  /**
   * @descripcion
   * Actualiza el valor de factura en USD en el estado.
   * @param {string} valorFacturaUSD - Nuevo valor de factura en USD.
   */
  public setValorFacturaUSD(valorFacturaUSD: string): void {
    this.update((state) => ({
      ...state,
      valorFacturaUSD,
    }));
  }

  /**
 * @descripcion
 * Actualiza la descripción de las partidas de la mercancía en el estado.
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
   * @descripcion
   * Actualiza la cantidad de las partidas de la mercancía en el estado.
   * @param {string} cantidadPartidasDeLaMercancia - Nueva cantidad de las partidas de la mercancía.
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
   * @descripcion
   * Actualiza la fracción TIGIE de las partidas de la mercancía en el estado.
   * @param {string} fraccionTigiePartidasDeLaMercancia - Nueva fracción TIGIE de las partidas de la mercancía.
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
   * @descripcion
   * Actualiza la descripción de la fracción de las partidas de la mercancía en el estado.
   * @param {string} fraccionDescripcionPartidasDeLaMercancia - Nueva descripción de la fracción de las partidas de la mercancía.
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
   * @descripcion
   * Actualiza el valor de la partida en USD en el estado.
   * @param {number} valorPartidaUSD - Nuevo valor de la partida en USD.
   */
  public setvalorPartidaUSD(valorPartidaUSD: number): void {
    this.update((state) => ({
      ...state,
      valorPartidaUSD,
    }));
  }

  /**
   * @descripcion
   * Actualiza el valor de la partida en USD de las partidas de la mercancía en el estado.
   * @param {number} valorPartidaUSDPartidasDeLaMercancia - Nuevo valor de la partida en USD de las partidas de la mercancía.
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
   * @descripcion
   * Actualiza el bloque en el estado.
   * @param {string} bloque - Nuevo bloque.
   */
  public setBloque(bloque: string): void {
    this.update({ bloque });
  }

  /**
   * @descripcion
   * Actualiza el uso específico en el estado.
   * @param {string} usoEspecifico - Nuevo uso específico.
   */
  public setUsoEspecifico(usoEspecifico: string): void {
    this.update({ usoEspecifico });
  }

  /**
   * @descripcion
   * Actualiza la justificación de importación/exportación en el estado.
   * @param {string} justificacionImportacionExportacion - Nueva justificación de importación/exportación.
   */
  public setJustificacionImportacionExportacion(
    justificacionImportacionExportacion: string
  ): void {
    this.update({ justificacionImportacionExportacion });
  }

  /**
   * @descripcion
   * Actualiza las observaciones en el estado.
   * @param {string} observaciones - Nuevas observaciones.
   */
  public setObservaciones(observaciones: string): void {
    this.update({ observaciones });
  }

  /**
   * @descripcion
   * Actualiza la entidad en el estado.
   * @param {string} entidad - Nueva entidad.
   */
  public setEntidad(entidad: string): void {
    this.update({ entidad });
  }

  /**
   * @descripcion
   * Actualiza la representación en el estado.
   * @param {string} representacion - Nueva representación.
   */
  public setRepresentacion(representacion: string): void {
    this.update({ representacion });
  }

  /**
   * @descripcion
   * Almacena los valores de la fila seleccionada en el estado.
   * @param {null} fila - Fila seleccionada.
   */
  public storeTableValues(fila: PartidasDeLaMercanciaModelo[]): void {
    this.update({
      filaSeleccionada: fila,
    });
  }
}
