/**
 * Lista de pasos que representan el flujo del trámite.
 * Cada paso contiene un índice, un título descriptivo, 
 * y banderas que indican si está activo y si ha sido completado.
 * 
 * @constant
 * @type {Array<{indice: number, titulo: string, activo: boolean, completado: boolean}>}
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
 * Título principal del mensaje que describe el tipo de trámite.
 *
 * @constant
 * @type {string}
 */
export const TITULO_MENSAJE =
  'Permiso sanitario de importación de materias primas';

/**
 * Texto informativo que se muestra tras registrar una solicitud.
 * Indica que el número asignado es temporal y carece de validez legal.
 *
 * @constant
 * @type {string}
 */
export const TEXTOS_REQUISITOS =
  'La solicitud ha quedado registrada con el número temporal [202767640]. Este no tiene validez legal y sirve solamente para efectos de identificar tu Solicitud. Un folio oficial le será asignado a la solicitud al momento en que esta sea firmada.';

/**
 * Identificador del procedimiento administrativo correspondiente al trámite.
 *
 * @constant
 * @type {number}
 */
export const ID_PROCEDIMIENTO = 260202;

/**
 * @constant ERROR_FORMA_ALERT
 * @description
 * Mensaje HTML que se muestra como alerta cuando faltan campos por capturar en el formulario.
 * Se utiliza para informar al usuario que debe completar todos los campos requeridos antes de continuar.
 */
export const ERROR_FORMA_ALERT =
  `
<div class="d-flex justify-content-center text-center">
  <div>
    <div class="col-md-12">
      Faltan campos por capturar.
    </div>
  </div>
</div>
`