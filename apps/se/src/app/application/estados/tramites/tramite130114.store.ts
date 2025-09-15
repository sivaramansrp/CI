import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { PartidasDeLaMercanciaModelo } from '../../shared/models/partidas-de-la-mercancia.model';

/**
 * Estado inicial y configuración del store para el trámite 130202.
 */
export interface Tramite130114State {
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
  valorPartidaUSDPartidasDeLaMercancia: string;
  descripcionPartidasDeLaMercancia: string;
  valorFacturaUSD: string;
  bloque: string;
  usoEspecifico: string;
  justificacionImportacionExportacion: string;
  observaciones: string;
  entidad: string;
  representacion: string;
  mostrarTabla: boolean;
  /**
   * Datos del cuerpo de la tabla dinámica.
   */
  tableBodyData: PartidasDeLaMercanciaModelo[];
  /**
   * Cantidad total de partidas de la mercancía.
   */
  cantidadTotal: string;
  /*
  Valor total en USD de las partidas de la mercancía.
  */
  valorTotalUSD: string;
}
/**
 * Crea el estado inicial del store.
 */
export function createInitialState(): Tramite130114State {
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
    defaultProducto: '',
    regimen: '',
    clasificacion: '',
    cantidadPartidasDeLaMercancia: '',
    valorPartidaUSDPartidasDeLaMercancia: '',
    descripcionPartidasDeLaMercancia: '',
    valorFacturaUSD: '',
    bloque: '',
    usoEspecifico: '',
    justificacionImportacionExportacion: '',
    observaciones: '',
    entidad: '',
    representacion: '',
    tableBodyData: [],
    cantidadTotal: '',
    valorTotalUSD: ''
  };
}
/**
 * Store para manejar el estado del trámite 130202.
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tramite130114' })
export class Tramite130114Store extends Store<Tramite130114State> {
  constructor() {
    super(createInitialState());
  }

  /**
   * Actualiza el estado del store con los valores proporcionados.
   * Valores a actualizar en el estado.
   */
  public actualizarEstado(valores: Partial<Tramite130114State>): void {
    this.update((state) => ({
      ...state,
      ...valores,
    }));
  }

}
