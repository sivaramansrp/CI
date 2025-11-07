/**
 * Identificador del tramite
 */
export const TRAMITE_ID = '231002';

/**
 * Valor que indica que es la primera vez que se realiza el aviso de retorno.
 */
export const ES_PRIMERA_VEZ = 'primera_vez';

/**
 * Valor que indica que se requiere la información de la empresa de reciclaje.
 */
export const REQUIERE_EMPRESA_RECICLAJE = 'si';

/**
 * Lista de pasos del proceso de solicitud.
 * Cada paso contiene su índice, título, y el estado actual (activo y completado).
 */
export const PASOS = [
  {
    indice: 1,
    titulo: 'Capturar solicitud',
    /** Indica si el paso está activo actualmente */
    activo: true,
    /** Indica si el paso ya fue completado */
    completado: true,
  },
  {
    indice: 2,
    titulo: 'Firmar solicitud',
    /** Indica que el paso aún no está activo */
    activo: false,
    /** Indica que el paso no ha sido completado */
    completado: false,
  },
];
