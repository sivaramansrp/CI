/**
 * Enum para los pasos del trámite de transporte marítimo
 * @enum {Array<{indice: number, titulo: string, activo: boolean, completado: boolean}>}
 */
export const TRANSPORTACION_MARITIMA_PASO = [
    {
        indice: 1,
        titulo: 'Capturar solicitud',
        activo: true,
        completado: true,
    },
    {
        indice: 2,
        titulo: 'Firmar solicitud',
        activo: false,
        completado: false,
    }
]