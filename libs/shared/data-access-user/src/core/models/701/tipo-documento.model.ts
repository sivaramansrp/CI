import { Catalogo } from '../shared/catalogos.model';

/**
 * Interfaz que representa un tipo de documento.
 */
export interface TipoDocumento {
  descripcion: string;
  /**
   * Indica si el documento está seleccionado.
   */
  selected?: boolean;

  /**
   * Información del tipo de documento.
   */
  tipoDocumento?: Catalogo;

  /**
   * RFC para consulta.
   */
  rfcParaConsulta?: string;

  /**
   * Nombre o razón social del documento.
   */
  nombre?: string;
}
