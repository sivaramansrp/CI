/**
 * @fileoverview
 * Constante que define los pasos necesarios para el trámite de importación de armas y municiones.
 * Cada paso incluye un índice, un título descriptivo, y estados que indican si está activo o completado.
 * 
 * @compodoc
 * Este archivo forma parte de la aplicación SEDENA y contiene la enumeración de pasos
 * para el proceso de importación de armas y municiones.
 */

/**
 * Representa un paso en el proceso de un trámite.
 * 
 * @property {number} indice - El número de orden del paso.
 * @property {string} titulo - El título descriptivo del paso.
 * @property {boolean} activo - Indica si el paso está activo actualmente.
 * @property {boolean} completado - Indica si el paso ha sido completado.
 */
export const PASOS = [
  {
    indice: 1,
    titulo: 'Capturar solicitud',
    activo: true,
    completado: true,
  },
  {
    indice: 2,
    titulo: 'Anexar requisitos',
    activo: false,
    completado: false,
  },
  {
    indice: 3,
    titulo: 'Firmar solicitud',
    activo: false,
    completado: false,
  },
];
/**
 * @constant
 * @name TITULOMENSAJE
 * @description Título del mensaje utilizado en la solicitud de permiso ordinario para la importación de sustancias químicas.
 * @type {string}
 */

/**
 * @fileoverview
 * Constantes relacionadas con la importación de armas y municiones.
 * Este archivo contiene valores utilizados en la gestión de trámites específicos.
 * @author [Tu Nombre o Equipo]
 * @version 1.0
 */
export const TITULOMENSAJE =
  'Solicitud Permiso ordinario para la importación de sustancias químicas';
/**
 * @const TEXTOS_REQUISITOS
 * @description La constante contiene un mensaje informativo que se muestra al usuario
 * cuando su solicitud ha sido registrada con un número temporal. Este número no tiene
 * validez legal y solo sirve para identificar la solicitud hasta que se le asigne un
 * folio oficial al momento de ser firmada.
 */
export const TEXTOS_REQUISITOS =
  'La solicitud ha quedado registrada con el número temporal [202767640]. Este no tiene validez legal y sirve solamente para efectos de identificar tu Solicitud. Un folio oficial le será asignado a la solicitud al momento en que esta sea firmada.';

/**
 * @const {number} ID_PROCEDIMIENTO
 * @description Identificador único del procedimiento relacionado con la importación de armas y municiones.
 * @usage Utilizado para identificar y manejar el procedimiento específico dentro del sistema.
 */
export const ID_PROCEDIMIENTO = 240105;
