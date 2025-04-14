/**
 * Un array de pasos (`PASOS`) que representa el proceso de importación de máquinas.
 * Cada paso es un objeto que contiene las siguientes propiedades:
 * 
 * @property {number} indice - El índice del paso en el proceso.
 * @property {string} titulo - El título o descripción del paso.
 * @property {boolean} activo - Indica si el paso está actualmente activo.
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
        titulo: 'Anexar requistios',
        activo: false,
        completado: false,
    },
    {
        indice: 3,
        titulo: 'Firmar solicitud',
        activo: false,
        completado: false,
    }

];

export const FECHA = {
    labelNombre:'Fecha de expedición de factura',
    required: true,
    habilitado: true,
  }