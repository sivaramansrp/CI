/**
 * @fileoverview Constantes de texto para los requisitos del proceso.
 * Este archivo define los textos que se utilizan en los requisitos del proceso,
 * incluyendo instrucciones y mensajes para adjuntar documentos.
 * @module textoEnum --80208
 */

/**
 * @const TEXTOS_REQUISITOS
 * @description Textos específicos relacionados con los requisitos del trámite IMMEX.
 *
 * @property {string} INSTRUCCIONES - Instrucciones específicas para los requisitos.
 * @property {string} ADJUNTAR - Mensaje para adjuntar nuevos documentos.
 */
export const TEXTOS_REQUISITOS = {
    /**
     * @constant {string} INSTRUCCIONES
     * @description Instrucciones para los requisitos.
     */
    INSTRUCCIONES: `<h6>Instrucciones</h6>
      <p>- De acuerdo al caso particular, algunos dcumentos podrían ser obligatorios</p>
      <p>- En caso de que no requieras algún documento, seleccionalo y elíminalo</p>
      <p>- Si necesitas anexar más de un documento del mismo tipo selecciónalo de la lista y presiona "Agregar nuevo".</p>`,
    /**
     * @constant {string} ADJUNTAR
     * @description Mensaje para adjuntar nuevos documentos.
     */
    ADJUNTAR: `<p>Si deseas adjuntar un nuevo documento, selecciona la opción --Adjuntar nuevo documento-- y presiona el botón "Adjuntar dcumentos"</p>`,
  };
  