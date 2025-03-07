import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Interfaz que define el estado de la solicitud 130102.
 * Contiene todas las propiedades necesarias para gestionar la información de la solicitud.
 */
export interface Solicitud130102State {
  
  /** Código que identifica la fracción arancelaria específica del producto. */
  fraccion: string;

  /** Descripción detallada de la fracción arancelaria para mayor claridad. */
  descripcion: string;

  /** Código de la fracción arancelaria asignado según normativas vigentes. */
  fraccionArancelaria: string;

  /** Unidad de medida utilizada para cuantificar la mercancía (ej. kg, litros, piezas). */
  unidadMedida: string;

  /** Cantidad total de productos declarados en la solicitud. */
  cantidad: number;

  /** Valor total de la factura en dólares estadounidenses (USD). */
  valorFacturaUSD: string;

  /** Número total de partidas arancelarias incluidas en la solicitud. */
  cantidadPartidas: number;

  /** Código de la fracción arancelaria de acuerdo con la Tarifa de la Ley de los Impuestos Generales de Importación y Exportación (TIGIE). */
  fraccionArancelariaTIGIE: string;

  /** Versión específica del código TIGIE con formato especial o complementario. */
  fraccionArancelariaTIGIE_TIGIE: string;

  /** Descripción detallada de las partidas incluidas en la solicitud. */
  descripcionPartidas: string;

  /** Valor monetario en USD asignado a cada partida dentro de la solicitud. */
  valorPartidaUSD: number;

  /** Alternativa de código para la fracción arancelaria (puede ser de otra normativa o formato). */
  fracciónarancelaria: string;

  /** Tipo de trámite solicitado relacionado con la mercancía (importación, exportación, etc.). */
  solicitudMercancia: string;

  /** Nombre de la entidad gubernamental o empresa responsable de la solicitud. */
  entidad: string;

  /** Identificación de la representación legal o administrativa involucrada en la solicitud. */
  representacion: string;

  /** Código o descripción del bloque de autorización dentro del proceso administrativo. */
  bloque: string;

  /** Justificación proporcionada para respaldar la solicitud de mercancía. */
  descripcionJustificacion: string;

  /** Comentarios o notas adicionales relevantes para la solicitud. */
  observaciones: string;

  /** Lista detallada de los productos incluidos en la solicitud, separados por un delimitador si es necesario. */
  productos: string;
}
/**
 * Crea y devuelve el estado inicial de la solicitud.
 * @returns Solicitud130102State - Objeto con valores por defecto.
 */
export function createInitialState(): Solicitud130102State {
  return {
    fraccion: '', // Valor inicial vacío.
    descripcion: '', // Descripción vacía por defecto.
    fraccionArancelaria: '', // Sin fracción arancelaria inicial.
    unidadMedida: '', // Unidad de medida no especificada.
    cantidad: 0, // Cantidad inicial en cero.
    valorFacturaUSD: '', // Valor de factura no definido.
    cantidadPartidas: 0, // Cantidad de partidas en cero.
    fraccionArancelariaTIGIE: '', // Sin fracción TIGIE asignada.
    fraccionArancelariaTIGIE_TIGIE: '', // Valor inicial vacío.
    descripcionPartidas: '', // Sin descripción inicial.
    valorPartidaUSD: 0, // Valor de partida inicial en cero.
    fracciónarancelaria: '', // Sin fracción arancelaria inicial.
    solicitudMercancia: '', // Sin solicitud asignada.
    entidad: '', // Entidad no definida.
    representacion: '', // Representación vacía.
    bloque: '', // Sin bloque definido.
    descripcionJustificacion: '', // Justificación vacía.
    observaciones: '', // Sin observaciones iniciales.
    productos: '', // Sin productos asignados.
  };
}

/**
 * Servicio encargado de manejar el estado del trámite 130102 usando Akita Store.
 * Permite actualizar y resetear los valores de la solicitud.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite130102', resettable: true })
export class Tramite130102Store extends Store<Solicitud130102State> {
  constructor() {
    super(createInitialState()); // Inicializa el estado con los valores por defecto.
  }

  /**
   * Actualiza el valor de la fracción arancelaria.
   * @param fraccion - Nueva fracción arancelaria.
   */
  public setFraccion(fraccion: string) {
    this.update((state) => ({ ...state, fraccion }));
  }

  /**
   * Actualiza la descripción de la fracción.
   * @param descripcion - Nueva descripción.
   */
  public setDescripcion(descripcion: string) {
    this.update((state) => ({ ...state, descripcion }));
  }

  /**
   * Actualiza el código de fracción arancelaria.
   * @param fraccionArancelaria - Nuevo código de fracción arancelaria.
   */
  public setFraccionArancelaria(fraccionArancelaria: string) {
    this.update((state) => ({ ...state, fraccionArancelaria }));
  }

  /**
   * Limpia todos los datos de la solicitud, restaurándolos a su estado inicial.
   */
  public limpiarSolicitud() {
    this.reset();
  }
}
