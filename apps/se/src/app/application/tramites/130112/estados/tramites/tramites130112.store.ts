import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { PartidasDeLaMercanciaModelo } from '../../../../shared/models/partidas-de-la-mercancia.model';

/**
 * @descripcion
 * Interfaz que define el estado del store `Tramite130112State`.
 * Este estado almacena toda la información relacionada con el trámite 130112.
 */
export interface Tramite130112State {
  /**
   * Producto seleccionado en el formulario.
   */
  producto: string;

  /**
   * Descripción del producto ingresada en el formulario.
   */
  descripcion: string;

  /**
   * Fracción arancelaria seleccionada en el formulario.
   */
  fraccion: string;

  /**
   * Cantidad del producto ingresada en el formulario.
   */
  cantidad: string;

  /**
   * Valor en USD de la partida ingresada en el formulario.
   */
  valorPartidaUSD: number;

  /**
   * Unidad de medida seleccionada en el formulario.
   */
  unidadMedida: string;

  /**
   * Solicitud seleccionada en el formulario.
   */
  solicitud: string;

  /**
   * Valor por defecto para el campo de selección de solicitud.
   */
  defaultSelect: string;

  /**
   * Valor por defecto para el campo de selección de producto.
   */
  defaultProducto: string;

  /**
   * Régimen seleccionado en el formulario.
   */
  regimen: string;

  /**
   * Clasificación del régimen seleccionada en el formulario.
   */
  clasificacion: string;

  /**
   * Lista de filas seleccionadas en la tabla dinámica.
   */
  filaSeleccionada: PartidasDeLaMercanciaModelo[];

  /**
   * Cantidad de partidas de la mercancía ingresada en el formulario.
   */
  cantidadPartidasDeLaMercancia: string;

  /**
   * Fracción TIGIE de las partidas de la mercancía ingresada en el formulario.
   */
  fraccionTigiePartidasDeLaMercancia: string;

  /**
   * Descripción de la fracción de las partidas de la mercancía ingresada en el formulario.
   * */
  fraccionDescripcionPartidasDeLaMercancia: string;

  /**
   * Valor en USD de las partidas de la mercancía ingresado en el formulario.
   */
  valorPartidaUSDPartidasDeLaMercancia: number;

  /**
   * Descripción de las partidas de la mercancía ingresada en el formulario.
   */
  descripcionPartidasDeLaMercancia: string;

  /**
   * Valor de la factura en USD ingresado en el formulario.
   */
  valorFacturaUSD: string;

  /**
   * Bloque seleccionado en el formulario.
   */
  bloque: string;

  /**
   * Uso específico seleccionado en el formulario.
   */
  usoEspecifico: string;

  /**
   * Justificación para la importación/exportación ingresada en el formulario.
   */
  justificacionImportacionExportacion: string;

  /**
   * Observaciones ingresadas en el formulario.
   */
  observaciones: string;

  /**
   * Entidad seleccionada en el formulario.
   */
  entidad: string;

  /**
   * Representación seleccionada en el formulario.
   */
  representacion: string;

  /**
   * Indica si la tabla dinámica debe mostrarse.
   */
  mostrarTabla: boolean;
}

/**
 * @descripcion
 * Función que crea el estado inicial del store `Tramite130112Store`.
 * @returns {Tramite130112State} Estado inicial del store.
 */
export function createInitialState(): Tramite130112State {
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
 * Servicio que implementa el store `Tramite130112Store` para gestionar el estado
 * relacionado con el trámite 130112.
 *
 * @decorador @Injectable
 * @decorador @StoreConfig
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tramite130112' })
export class Tramite130112Store extends Store<Tramite130112State> {
  /**
   * @descripcion
   * Constructor del store `Tramite130112Store`.
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
   * @param {Partial<Tramite130112State>} updates - Valores a actualizar.
   */
  public updateState(updates: Partial<Tramite130112State>): void {
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
   * Almacena las filas seleccionadas en la tabla dinámica en el estado.
   * fila Lista de filas seleccionadas.
   */
  public storeTableValues(fila: PartidasDeLaMercanciaModelo[]): void {
    this.update({
      filaSeleccionada: fila,
    });
  }
}
