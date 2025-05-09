/**
 * Representa un documento que se cargará en el sistema.
 * 
 * @interface DocumentosParaCargar
 * 
 * @property {string} name - Nombre del documento.
 * @property {number} id - Identificador único del documento.
 * @property {File} [archivo] - Archivo asociado al documento (opcional).
 * @property {string} ruta - Ruta donde se almacenará el documento.
 * @property {boolean} cargado - Indica si el documento ha sido cargado exitosamente.
 * @property {string} tipo - Tipo o categoría del documento.
 * @property {string} mensaje - Mensaje relacionado con el estado del documento.
 * @property {string} estatus - Estado actual del documento (por ejemplo, "pendiente", "completado").
 */
export interface DocumentosParaCargar {
  name: string;
  id: number;
  archivo?: File;
  ruta: string;
  cargado: boolean;
  tipo: string;
  mensaje: string;
  estatus: string;
}