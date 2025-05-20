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
   * Actualiza el estado del store con los valores proporcionados.
   * Valores a actualizar en el estado.
   */
  public actualizarEstado(valores: Partial<Tramite130113State>): void {
    this.update((state) => ({
      ...state,
      ...valores,
    }));
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
   * Almacena los valores de la fila seleccionada en el estado.
   * {PartidasDeLaMercanciaModelo[]} fila - Fila seleccionada.
   */
  public storeTableValues(fila: PartidasDeLaMercanciaModelo[]): void {
    this.update({
      filaSeleccionada: fila,
    });
  }
}
