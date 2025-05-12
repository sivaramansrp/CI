/**
 * Tramite130104Store
 * Este módulo define el `Store` de Akita para gestionar el estado del trámite con ID 130104.
 * Proporciona métodos para actualizar diferentes partes del estado del trámite, como la fracción arancelaria,
 * la solicitud, la información del producto, los valores de las partidas de la mercancía, y otros datos relevantes.
 */

import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { PartidasDeLaMercanciaModelo } from '../../shared/models/partidas-de-la-mercancia.model';


export interface Tramite130104State {
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
 * createInitialState
 * Función que define y retorna el estado inicial para el `Tramite130104State`.
 * Inicializa todas las propiedades del estado con valores por defecto, como arrays vacíos para las filas seleccionadas,
 * `false` para mostrar la tabla, y cadenas vacías o cero para los demás campos.
 *
 * El estado inicial del trámite 130104.
 */
export function createInitialState(): Tramite130104State {
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
 * Clase que representa el `Store` de Akita para el trámite 130104.
 * Contiene el estado actual del trámite y proporciona métodos para actualizar porciones específicas de este estado.
 * Está decorado con `@Injectable({ providedIn: 'root' })`, lo que significa que Angular lo proveerá como un singleton
 * en toda la aplicación.
 *
 * Inicializa el `Store` llamando al constructor de la clase padre `Store` con el estado inicial definido por `createInitialState()`.
 *
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tramite130104' })
export class Tramite130104Store extends Store<Tramite130104State> {
  constructor() {
    super(createInitialState());
  }

    /**
   * Actualiza la fracción arancelaria en el estado.
   * fraccion Fracción arancelaria seleccionada.
   */
    public setFraccion(fraccion: string): void {
      this.update((state) => ({
        ...state,
        fraccion,
      }));
    }
  
    /**
     * Actualiza la solicitud en el estado.
     * solicitud Solicitud seleccionada.
     */
    public updateSolicitud(solicitud: string): void {
      this.update((state) => ({
        ...state,
        solicitud,
      }));
    }
  
    /**
     * Actualiza el valor por defecto de la solicitud en el estado.
     * defaultSelect Valor por defecto para la solicitud.
     */
    public updateDefaultSelect(defaultSelect: string): void {
      this.update((state) => ({
        ...state,
        defaultSelect,
      }));
    }
  
    /**
     * Actualiza múltiples propiedades del estado.
     * updates Objeto parcial con las propiedades a actualizar.
     */
    public updateState(updates: Partial<Tramite130104State>): void {
      this.update(updates);
    }
  
    /**
     * Actualiza el producto seleccionado en el estado.
     * producto Producto seleccionado.
     */
    public setProducto(producto: string): void {
      this.update({ producto });
    }
  
    /**
     * Actualiza la descripción del producto en el estado.
     * descripcion Descripción del producto.
     */
    public setDescripcion(descripcion: string): void {
      this.update({ descripcion });
    }
  
    /**
     * Actualiza la cantidad del producto en el estado.
     * cantidad Cantidad del producto.
     */
    public setCantidad(cantidad: string): void {
      this.update({ cantidad });
    }
  
    /**
     * Actualiza el valor en USD de la partida en el estado.
     * valorPartidaUSD Valor en USD de la partida.
     */
    public setValorPartidaUSD(valorPartidaUSD: number): void {
      this.update({ valorPartidaUSD });
    }
  
    /**
     * Actualiza la unidad de medida en el estado.
     * unidadMedida Unidad de medida seleccionada.
     */
    public setUnidadMedida(unidadMedida: string): void {
      this.update({ unidadMedida });
    }
  
    /**
     * Actualiza el valor por defecto del producto en el estado.
     * defaultProducto Valor por defecto del producto.
     */
    public updateDefaultProducto(defaultProducto: string): void {
      this.update({ defaultProducto });
    }
  
    /**
     * Actualiza el régimen seleccionado en el estado.
     * regimen Régimen seleccionado.
     */
    public setregimen(regimen: string): void {
      this.update({ regimen });
    }
  
    /**
     * Actualiza la clasificación del régimen en el estado.
     * clasificacion Clasificación del régimen.
     */
    public setclasificacion(clasificacion: string): void {
      this.update({ clasificacion });
    }
  
    /**
     * Actualiza si la tabla dinámica debe mostrarse en el estado.
     * mostrar Indica si la tabla debe mostrarse.
     */
    public setMostrarTabla(mostrar: boolean): void {
      this.update({ mostrarTabla: mostrar });
    }
  
    /**
     * Actualiza el valor de la factura en USD en el estado.
     * valorFacturaUSD Valor de la factura en USD.
     */
    public setValorFacturaUSD(valorFacturaUSD: string): void {
      this.update((state) => ({
        ...state,
        valorFacturaUSD,
      }));
    }
  
    /**
     * Actualiza la descripción de las partidas de la mercancía en el estado.
     * descripcionPartidasDeLaMercancia Descripción de las partidas.
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
     * cantidadPartidasDeLaMercancia Cantidad de partidas.
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
     * Actualiza el valor en USD de la partida en el estado.
     * valorPartidaUSD Valor en USD de la partida.
     */
    public setvalorPartidaUSD(valorPartidaUSD: number): void {
      this.update((state) => ({
        ...state,
        valorPartidaUSD,
      }));
    }
  
    /**
     * Actualiza el valor en USD de las partidas de la mercancía en el estado.
     * valorPartidaUSDPartidasDeLaMercancia Valor en USD de las partidas.
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
     * Actualiza el bloque seleccionado en el estado.
     * bloque Bloque seleccionado.
     */
    public setBloque(bloque: string): void {
      this.update({ bloque });
    }
  
    /**
     * Actualiza el uso específico seleccionado en el estado.
     * usoEspecifico Uso específico seleccionado.
     */
    public setUsoEspecifico(usoEspecifico: string): void {
      this.update({ usoEspecifico });
    }
  
    /**
     * Actualiza la justificación para la importación/exportación en el estado.
     * justificacionImportacionExportacion Justificación ingresada.
     */
    public setJustificacionImportacionExportacion(
      justificacionImportacionExportacion: string
    ): void {
      this.update({ justificacionImportacionExportacion });
    }
  
    /**
     * Actualiza las observaciones ingresadas en el estado.
     * observaciones Observaciones ingresadas.
     */
    public setObservaciones(observaciones: string): void {
      this.update({ observaciones });
    }
  
    /**
     * Actualiza la entidad seleccionada en el estado.
     * entidad Entidad seleccionada.
     */
    public setEntidad(entidad: string): void {
      this.update({ entidad });
    }
  
    /**
     * Actualiza la representación seleccionada en el estado.
     * representacion Representación seleccionada.
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