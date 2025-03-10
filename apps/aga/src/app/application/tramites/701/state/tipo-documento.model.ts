/* eslint-disable @nx/enforce-module-boundaries */
import { Catalogo } from '@libs/shared/data-access-user/src';

/**
 * Interfaz que representa un tipo de documento.
 */
export interface TipoDocumento {
  descripcion: string | null;
  /**
   * Indica si el documento está seleccionado.
   */
  selected?: boolean;

  /**
   * Información del tipo de documento.
   */
  tipoDocumento?: Catalogo | null;

  /**
   * RFC para consulta.
   */
  rfcParaConsulta?: string | null;

  /**
   * Nombre o razón social del documento.
   */
  nombre?: string[];
}
export function createInitialState(): TipoDocumento {
  return {
    descripcion: null,
    selected: false,
    tipoDocumento: null,
    rfcParaConsulta: null,
    nombre: [],
   
  };
}