/**
 * Enum `MENSAJES_DOCUMENTOS` que define los mensajes relacionados con la gestión de documentos.
 */
export enum MENSAJES_DOCUMENTOS {
  /**
   * Mensaje que indica que solo se aceptan archivos en formato PDF.
   */
  ONLYPDF = 'Solo se aceptan archivos pdf',

  /**
   * Mensaje que indica que el tamaño del documento excede el límite permitido.
   */
  MAXSIZE = 'El tamaño del documento que intenta cargar excede el tamaño permitido',

  /**
   * Mensaje que indica que ocurrió un error al intentar subir el documento.
   */
  ERRORUPLOAD = 'Error al subir el documento',

  /**
   * Mensaje que indica que el documento se ha subido exitosamente.
   */
  UPLOAD = 'Documento subido'
}