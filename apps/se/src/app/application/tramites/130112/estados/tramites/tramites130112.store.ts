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
   * Actualiza el estado del store con los valores proporcionados.
   * Valores a actualizar en el estado.
   */
  public actualizarEstado(valores: Partial<Tramite130112State>): void {
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
   * Almacena las filas seleccionadas en la tabla dinámica en el estado.
   * fila Lista de filas seleccionadas.
   */
  public storeTableValues(fila: PartidasDeLaMercanciaModelo[]): void {
    this.update({
      filaSeleccionada: fila,
    });
  }
}
