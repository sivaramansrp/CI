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
   * Actualiza el atributo `fraccion` en el estado.
   * @param fraccion El nuevo valor para `fraccion`.
   */
  public setFraccion(fraccion: string): void {
    this.update((state) => ({
      ...state,
      fraccion,
    }));
  }

  /**
   * Actualiza el atributo `solicitud` en el estado.
   * @param solicitud El nuevo valor para `solicitud`.
   */
  public updateSolicitud(solicitud: string): void {
    this.update((state) => ({
      ...state,
      solicitud,
    }));
  }

  /**
   * Actualiza el atributo `defaultSelect` en el estado.
   * @param defaultSelect El nuevo valor para `defaultSelect`.
   */
  public updateDefaultSelect(defaultSelect: string): void {
    this.update((state) => ({
      ...state,
      defaultSelect,
    }));
  }

  /**
   * Actualiza múltiples atributos en el estado.
   * @param updates Objeto parcial del estado con las actualizaciones.
   */
  public updateState(updates: Partial<Tramite130217State>): void {
    this.update(updates);
  }

  /**
   * Actualiza el atributo `producto` en el estado.
   * @param producto El nuevo valor para `producto`.
   */
  public setProducto(producto: string): void {
    this.update({ producto });
  }

  /**
   * Actualiza el atributo `descripcion` en el estado.
   * @param descripcion El nuevo valor para `descripcion`.
   */
  public setDescripcion(descripcion: string): void {
    this.update({ descripcion });
  }

  /**
   * Actualiza el atributo `cantidad` en el estado.
   * @param cantidad El nuevo valor para `cantidad`.
   */
  public setCantidad(cantidad: string): void {
    this.update({ cantidad });
  }

  /**
   * Actualiza el atributo `valorPartidaUSD` en el estado.
   * @param valorPartidaUSD El nuevo valor para `valorPartidaUSD`.
   */
  public setValorPartidaUSD(valorPartidaUSD: number): void {
    this.update({ valorPartidaUSD });
  }

  /**
   * Actualiza el atributo `unidadMedida` en el estado.
   * @param unidadMedida El nuevo valor para `unidadMedida`.
   */
  public setUnidadMedida(unidadMedida: string): void {
    this.update({ unidadMedida });
  }

  /**
   * Actualiza el atributo `defaultProducto` en el estado.
   * @param defaultProducto El nuevo valor para `defaultProducto`.
   */
  public updateDefaultProducto(defaultProducto: string): void {
    this.update({ defaultProducto });
  }

  /**
   * Actualiza el atributo `regimen` en el estado.
   * @param regimen El nuevo valor para `regimen`.
   */
  public setregimen(regimen: string): void {
    this.update({ regimen });
  }

  /**
   * Actualiza el atributo `clasificacion` en el estado.
   * @param clasificacion El nuevo valor para `clasificacion`.
   */
  public setclasificacion(clasificacion: string): void {
    this.update({ clasificacion });
  }

  /**
   * Actualiza el atributo `mostrarTabla` en el estado.
   * @param mostrar El nuevo valor para `mostrarTabla`.
   */
  public setMostrarTabla(mostrar: boolean): void {
    this.update({ mostrarTabla: mostrar });
  }

  /**
   * Actualiza el atributo `valorFacturaUSD` en el estado.
   * @param valorFacturaUSD El nuevo valor para `valorFacturaUSD`.
   */
  public setValorFacturaUSD(valorFacturaUSD: string): void {
    this.update((state) => ({
      ...state,
      valorFacturaUSD,
    }));
  }

  /**
   * Actualiza el atributo `descripcionPartidasDeLaMercancia` en el estado.
   * @param descripcionPartidasDeLaMercancia El nuevo valor para `descripcionPartidasDeLaMercancia`.
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
   * Actualiza el atributo `cantidadPartidasDeLaMercancia` en el estado.
   * @param cantidadPartidasDeLaMercancia El nuevo valor para `cantidadPartidasDeLaMercancia`.
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
   * Actualiza el atributo `valorPartidaUSDPartidasDeLaMercancia` en el estado.
   * @param valorPartidaUSDPartidasDeLaMercancia El nuevo valor para `valorPartidaUSDPartidasDeLaMercancia`.
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
   * Actualiza el atributo `bloque` en el estado.
   * @param bloque El nuevo valor para `bloque`.
   */
  public setBloque(bloque: string): void {
    this.update({ bloque });
  }

  /**
   * Actualiza el atributo `usoEspecifico` en el estado.
   * @param usoEspecifico El nuevo valor para `usoEspecifico`.
   */
  public setUsoEspecifico(usoEspecifico: string): void {
    this.update({ usoEspecifico });
  }

  /**
   * Actualiza el atributo `justificacionImportacionExportacion` en el estado.
   * @param justificacionImportacionExportacion El nuevo valor para `justificacionImportacionExportacion`.
   */
  public setJustificacionImportacionExportacion(
    justificacionImportacionExportacion: string
  ): void {
    this.update({ justificacionImportacionExportacion });
  }

  /**
   * Actualiza el atributo `observaciones` en el estado.
   * @param observaciones El nuevo valor para `observaciones`.
   */
  public setObservaciones(observaciones: string): void {
    this.update({ observaciones });
  }

  /**
   * Actualiza el atributo `entidad` en el estado.
   * @param entidad El nuevo valor para `entidad`.
   */
  public setEntidad(entidad: string): void {
    this.update({ entidad });
  }

  /**
   * Actualiza el atributo `representacion` en el estado.
   * @param representacion El nuevo valor para `representacion`.
   */
  public setRepresentacion(representacion: string): void {
    this.update({ representacion });
  }

  /**
   * Almacena la fila seleccionada en la tabla.
   * @param fila La fila seleccionada.
   */
  public storeTableValues(fila: PartidasDeLaMercanciaModelo[]): void {
    this.update({
      filaSeleccionada: fila,
    });
  }
}