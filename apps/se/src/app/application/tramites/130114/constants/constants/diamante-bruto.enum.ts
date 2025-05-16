/**
 * PASOS_EXPORTACION:
 * Este arreglo representa los pasos necesarios para completar el proceso de exportación.
 * Cada paso contiene las siguientes propiedades:
 * 
 * - indice: Número que indica el orden del paso en el proceso.
 * - titulo: Descripción breve del paso.
 * - activo: Indica si el paso está habilitado para ser realizado.
 * - completado: Indica si el paso ya ha sido completado.
 */
export const PASOS_EXPORTACION = [
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
    }
];