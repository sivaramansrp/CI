/**
 * Tramite130111Store
 * Este módulo define el `Store` de Akita para gestionar el estado del trámite con ID 130111.
 * Proporciona métodos para actualizar diferentes partes del estado del trámite, como la fracción arancelaria,
 * la solicitud, la información del producto, los valores de las partidas de la mercancía, y otros datos relevantes.
 */

import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { PartidasDeLaMercanciaModelo } from '../../shared/models/partidas-de-la-mercancia.model';

/**
 * Tramite130111State
 * Define la estructura del estado del trámite 130111. Contiene propiedades para almacenar
 * información sobre el producto, la descripción, la fracción arancelaria, la cantidad, el valor en USD,
 * la unidad de medida, la solicitud, los valores por defecto de los selectores, el régimen, la clasificación,
 * la fila seleccionada en la tabla de partidas, la cantidad y el valor de las partidas, el valor total de la factura,
 * el bloque geográfico, el uso específico, la justificación de importación/exportación, observaciones, la entidad
 * y representación federal, y un indicador para mostrar u ocultar la tabla.
 *
 * El producto asociado al trámite.
 * La descripción del producto.
 * La fracción arancelaria del producto.
 * La cantidad del producto.
 * El valor por partida en dólares estadounidenses.
 * La unidad de medida del producto.
 * El tipo de solicitud del trámite.
 * El valor por defecto del selector principal.
 * El valor por defecto del selector de producto.
 * El régimen al que se destinará la mercancía.
 * La clasificación del régimen.
 * La fila seleccionada en la tabla de partidas de la mercancía.
 * La cantidad de partidas de la mercancía.
 * El valor por partida en USD de las partidas de la mercancía.
 * La descripción de las partidas de la mercancía.
 * El valor total de la factura en dólares estadounidenses.
 * El bloque geográfico seleccionado.
 * El uso específico de la mercancía.
 * La justificación de la importación o exportación.
 * Observaciones adicionales sobre el trámite.
 * La entidad federal seleccionada.
 * La representación federal seleccionada.
 * Indica si la tabla debe ser mostrada o no.
 */
export interface Tramite130111State {
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
 * createInitialState
 * Función que define y retorna el estado inicial para el `Tramite130111State`.
 * Inicializa todas las propiedades del estado con valores por defecto, como arrays vacíos para las filas seleccionadas,
 * `false` para mostrar la tabla, y cadenas vacías o cero para los demás campos.
 *
 * El estado inicial del trámite 130111.
 */
export function createInitialState(): Tramite130111State {
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
 * Clase que representa el `Store` de Akita para el trámite 130111.
 * Contiene el estado actual del trámite y proporciona métodos para actualizar porciones específicas de este estado.
 * Está decorado con `@Injectable({ providedIn: 'root' })`, lo que significa que Angular lo proveerá como un singleton
 * en toda la aplicación.
 *
 * Inicializa el `Store` llamando al constructor de la clase padre `Store` con el estado inicial definido por `createInitialState()`.
 *
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tramite130111' })
export class Tramite130111Store extends Store<Tramite130111State> {
  constructor() {
    super(createInitialState());
  }

  public setFraccion(fraccion: string): void {
    this.update((state) => ({
      ...state,
      fraccion,
    }));
  }

  public updateSolicitud(solicitud: string): void {
    this.update((state) => ({
      ...state,
      solicitud,
    }));
  }

  public updateDefaultSelect(defaultSelect: string): void {
    this.update((state) => ({
      ...state,
      defaultSelect,
    }));
  }
  public updateState(updates: Partial<Tramite130111State>): void {
    this.update(updates);
  }

  public setProducto(producto: string): void {
    this.update({ producto });
  }

  public setDescripcion(descripcion: string): void {
    this.update({ descripcion });
  }

  public setCantidad(cantidad: string): void {
    this.update({ cantidad });
  }

  public setValorPartidaUSD(valorPartidaUSD: number): void {
    this.update({ valorPartidaUSD });
  }

  public setUnidadMedida(unidadMedida: string): void {
    this.update({ unidadMedida });
  }
  public updateDefaultProducto(defaultProducto: string): void {
    this.update({ defaultProducto });
  }
  public setregimen(regimen: string): void {
    this.update({ regimen });
  }
  public setclasificacion(clasificacion: string): void {
    this.update({ clasificacion });
  }
  public setMostrarTabla(mostrar: boolean): void {
    this.update({ mostrarTabla: mostrar });
  }
  public setValorFacturaUSD(valorFacturaUSD: string): void {
    this.update((state) => ({
      ...state,
      valorFacturaUSD,
    }));
  }
  public setDescripcionPartidasDeLaMercancia(
    descripcionPartidasDeLaMercancia: string
  ): void {
    this.update((state) => ({
      ...state,
      descripcionPartidasDeLaMercancia,
    }));
  }

  public setCantidadPartidasDeLaMercancia(
    cantidadPartidasDeLaMercancia: string
  ): void {
    this.update((state) => ({
      ...state,
      cantidadPartidasDeLaMercancia,
    }));
  }
  public setvalorPartidaUSD(valorPartidaUSD: number): void {
    this.update((state) => ({
      ...state,
      valorPartidaUSD,
    }));
  }
  public setValorPartidaUSDPartidasDeLaMercancia(
    valorPartidaUSDPartidasDeLaMercancia: number
  ): void {
    this.update((state) => ({
      ...state,
      valorPartidaUSDPartidasDeLaMercancia,
    }));
  }
  public setBloque(bloque: string): void {
    this.update({ bloque });
  }
  public setUsoEspecifico(usoEspecifico: string): void {
    this.update({ usoEspecifico });
  }
  public setJustificacionImportacionExportacion(
    justificacionImportacionExportacion: string
  ): void {
    this.update({ justificacionImportacionExportacion });
  }
  public setObservaciones(observaciones: string): void {
    this.update({ observaciones });
  }
  public setEntidad(entidad: string): void {
    this.update({ entidad });
  }
  public setRepresentacion(representacion: string): void {
    this.update({ representacion });
  }
  public storeTableValues(fila: PartidasDeLaMercanciaModelo[]): void {
    this.update({
      filaSeleccionada: fila,
    });
  }
}