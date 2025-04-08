import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * @interface Tramite130104State
 * Representa el estado inicial del trámite 130104.
 * Contiene todas las propiedades necesarias para manejar el estado del trámite.
 */
export interface Tramite130104State {
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
  filaSeleccionada: null;
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
 * @function createInitialState
 * Crea el estado inicial del trámite 130104.
 * Devuelve un objeto con valores predeterminados para todas las propiedades del estado.
 * @returns Tramite130104State - El estado inicial del trámite.
 */
export function createInitialState(): Tramite130104State {
  return {
    filaSeleccionada: null,
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
 * @class Tramite130104Store
 * Extiende la clase Store de Akita para manejar el estado del trámite 130104.
 * Proporciona métodos para actualizar propiedades específicas del estado.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite130104', resettable: true })
export class Tramite130104Store extends Store<Tramite130104State> {
  constructor() {
    super(createInitialState()); // Inicializa el estado con valores predeterminados.
  }

  /**
   * Actualiza la propiedad `fraccion` en el estado.
   * @param fraccion - Nueva fracción arancelaria.
   */
  public setFraccion(fraccion: string): void {
    this.update((state) => ({
      ...state,
      fraccion,
    }));
  }

  /**
   * Actualiza la propiedad `solicitud` en el estado.
   * @param solicitud - Nueva solicitud.
   */
  public updateSolicitud(solicitud: string): void {
    this.update((state) => ({
      ...state,
      solicitud,
    }));
  }

  /**
   * Actualiza la propiedad `defaultSelect` en el estado.
   * @param defaultSelect - Nuevo valor predeterminado.
   */
  public updateDefaultSelect(defaultSelect: string): void {
    this.update((state) => ({
      ...state,
      defaultSelect,
    }));
  }

  /**
   * Actualiza múltiples propiedades del estado.
   * @param updates - Objeto con las propiedades a actualizar.
   */
  public updateState(updates: Partial<Tramite130104State>): void {
    this.update(updates);
  }

  /**
   * Actualiza la propiedad `producto` en el estado.
   * @param producto - Nuevo producto.
   */
  public setProducto(producto: string): void {
    this.update({ producto });
  }

  /**
   * Actualiza la propiedad `descripcion` en el estado.
   * @param descripcion - Nueva descripción.
   */
  public setDescripcion(descripcion: string): void {
    this.update({ descripcion });
  }

  /**
   * Actualiza la propiedad `cantidad` en el estado.
   * @param cantidad - Nueva cantidad.
   */
  public setCantidad(cantidad: string): void {
    this.update({ cantidad });
  }

  /**
   * Actualiza la propiedad `valorPartidaUSD` en el estado.
   * @param valorPartidaUSD - Nuevo valor en USD.
   */
  public setValorPartidaUSD(valorPartidaUSD: number): void {
    this.update({ valorPartidaUSD });
  }

  /**
   * Actualiza la propiedad `unidadMedida` en el estado.
   * @param unidadMedida - Nueva unidad de medida.
   */
  public setUnidadMedida(unidadMedida: string): void {
    this.update({ unidadMedida });
  }

  /**
   * Actualiza la propiedad `defaultProducto` en el estado.
   * @param defaultProducto - Nuevo producto predeterminado.
   */
  public updateDefaultProducto(defaultProducto: string): void {
    this.update({ defaultProducto });
  }

  /**
   * Actualiza la propiedad `regimen` en el estado.
   * @param regimen - Nuevo régimen.
   */
  public setregimen(regimen: string): void {
    this.update({ regimen });
  }

  /**
   * Actualiza la propiedad `clasificacion` en el estado.
   * @param clasificacion - Nueva clasificación.
   */
  public setclasificacion(clasificacion: string): void {
    this.update({ clasificacion });
  }

  /**
   * Actualiza la propiedad `mostrarTabla` en el estado.
   * @param mostrar - Nuevo valor para mostrar la tabla.
   */
  public setMostrarTabla(mostrar: boolean): void {
    this.update({ mostrarTabla: mostrar });
  }

  /**
   * Actualiza la propiedad `valorFacturaUSD` en el estado.
   * @param valorFacturaUSD - Nuevo valor de la factura en USD.
   */
  public setValorFacturaUSD(valorFacturaUSD: string): void {
    this.update((state) => ({
      ...state,
      valorFacturaUSD,
    }));
  }

  /**
   * Actualiza la propiedad `descripcionPartidasDeLaMercancia` en el estado.
   * @param descripcionPartidasDeLaMercancia - Nueva descripción de las partidas.
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
   * Actualiza la propiedad `cantidadPartidasDeLaMercancia` en el estado.
   * @param cantidadPartidasDeLaMercancia - Nueva cantidad de partidas.
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
   * Actualiza la propiedad `valorPartidaUSDPartidasDeLaMercancia` en el estado.
   * @param valorPartidaUSDPartidasDeLaMercancia - Nuevo valor en USD de las partidas.
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
   * Actualiza la propiedad `bloque` en el estado.
   * @param bloque - Nuevo bloque.
   */
  public setBloque(bloque: string): void {
    this.update({ bloque });
  }

  /**
   * Actualiza la propiedad `usoEspecifico` en el estado.
   * @param usoEspecifico - Nuevo uso específico.
   */
  public setUsoEspecifico(usoEspecifico: string): void {
    this.update({ usoEspecifico });
  }

  /**
   * Actualiza la propiedad `justificacionImportacionExportacion` en el estado.
   * @param justificacionImportacionExportacion - Nueva justificación.
   */
  public setJustificacionImportacionExportacion(
    justificacionImportacionExportacion: string
  ): void {
    this.update({ justificacionImportacionExportacion });
  }

  /**
   * Actualiza la propiedad `observaciones` en el estado.
   * @param observaciones - Nuevas observaciones.
   */
  public setObservaciones(observaciones: string): void {
    this.update({ observaciones });
  }

  /**
   * Actualiza la propiedad `entidad` en el estado.
   * @param entidad - Nueva entidad.
   */
  public setEntidad(entidad: string): void {
    this.update({ entidad });
  }

  /**
   * Actualiza la propiedad `representacion` en el estado.
   * @param representacion - Nueva representación.
   */
  public setRepresentacion(representacion: string): void {
    this.update({ representacion });
  }

  /**
   * Almacena los valores de la fila seleccionada en el estado.
   * @param fila - Fila seleccionada.
   */
  public storeTableValues(fila: null): void {
    this.update({
      filaSeleccionada: fila,
    });
  }
}