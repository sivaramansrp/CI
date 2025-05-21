import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { PartidasDeLaMercanciaModelo } from '../../shared/models/partidas-de-la-mercancia.model';

/**
 * @description
 * Interfaz que define la estructura del estado para Tramite130217.
 */
export interface Tramite130217State {
  /** Nombre del producto */
  producto: string;
  /** Descripción del producto */
  descripcion: string;
  /** Fracción o clasificación del producto */
  fraccion: string;
  /** Cantidad del producto */
  cantidad: string;
  /** Valor del producto en USD */
  valorPartidaUSD: number;
  /** Unidad de medida del producto */
  unidadMedida: string;
  /** Tipo de solicitud */
  solicitud: string;
  /** Selección predeterminada para los desplegables */
  defaultSelect: string;
  /** Tipo de producto predeterminado */
  defaultProducto: string;
  /** Tipo de régimen */
  regimen: string;
  /** Clasificación */
  clasificacion: string;
  /** Fila seleccionada en la tabla */
  filaSeleccionada: PartidasDeLaMercanciaModelo[];
  /** Cantidad de partidas de la mercancía */
  cantidadPartidasDeLaMercancia: string;
  /** Valor en USD de las partidas de la mercancía */
  valorPartidaUSDPartidasDeLaMercancia: number;
  /** Descripción de las partidas de la mercancía */
  descripcionPartidasDeLaMercancia: string;
  /** Valor de la factura en USD */
  valorFacturaUSD: string;
  /** Bloque o región */
  bloque: string;
  /** Uso específico del producto */
  usoEspecifico: string;
  /** Justificación para la importación/exportación */
  justificacionImportacionExportacion: string;
  /** Observaciones adicionales */
  observaciones: string;
  /** Información de la entidad */
  entidad: string;
  /** Información de la representación */
  representacion: string;
  /** Indicador para mostrar u ocultar la tabla */
  mostrarTabla: boolean;
}

/**
 * @description
 * Crea el estado inicial para Tramite130217.
 * @returns El objeto con el estado inicial.
 */
export function createInitialState(): Tramite130217State {
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
 * @description
 * Clase Store para gestionar el estado de Tramite130217 utilizando Akita.
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tramite130217' })
export class Tramite130217Store extends Store<Tramite130217State> {
  constructor() {
    super(createInitialState());
  }

  
  /**
   * Actualiza el estado del store con los valores proporcionados.
   * Valores a actualizar en el estado.
   */
  public actualizarEstado(valores: Partial<Tramite130217State>): void {
    this.update((state) => ({
      ...state,
      ...valores,
    }));
  }

  /**
   * Establece el valor de `mostrarTabla` en el estado.
   * Valor booleano para mostrar u ocultar la tabla.
   */
  public setMostrarTabla(mostrar: boolean): void {
    this.update({ mostrarTabla: mostrar });
  }

  /**
   * Almacena los valores de las filas seleccionadas en el estado.
   * Lista de filas seleccionadas.
   */
  public storeTableValues(fila: PartidasDeLaMercanciaModelo[]): void {
    this.update({
      filaSeleccionada: fila,
    });
  }
}