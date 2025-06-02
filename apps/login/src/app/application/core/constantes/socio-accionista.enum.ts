import { ConsultaSocioAccionista } from "../models/consulta-socio-accionista.model";
/**
 * Configuración de los encabezados para la tabla de socios accionistas.
 * Cada objeto define el nombre del encabezado, la clave para extraer el valor del modelo
 */
export const CONFIGURACION_ENCABEZADO_SOCIO = [
    { encabezado: 'RFC', clave: (item: ConsultaSocioAccionista) => item.rfc, orden: 1 },
    { encabezado: 'RAZÓN SOCIAL', clave: (item: ConsultaSocioAccionista) => item.razonSocial, orden: 2 },
    { encabezado: 'FNOMBRE', clave: (item: ConsultaSocioAccionista) => item.nombre, orden: 3 },
    { encabezado: 'APELLIDO PATERNO', clave: (item: ConsultaSocioAccionista) => item.apellidoPaterno, orden: 4 },
    { encabezado: 'APELLIDO MATERNO', clave: (item: ConsultaSocioAccionista) => item.apellidoMaterno, orden: 5 }
]