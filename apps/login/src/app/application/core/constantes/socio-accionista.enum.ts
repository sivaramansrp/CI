import { ConsultaSocioExtranjeroFisica, ConsultaSocioExtranjeroMoral } from "../models/consulta-socio-extranjero.model";
import { ConsultaSocioNacional } from "../models/consulta-socio-nacional.model";

/**
 * Configuración de los encabezados para la tabla de socios accionistas.
 * Cada objeto define el nombre del encabezado, la clave para extraer el valor del modelo
 */
export const CONFIGURACION_ENCABEZADO_SOCIO = [
    { encabezado: 'RFC', clave: (item: ConsultaSocioNacional) => item.rfc, orden: 1 },
    { encabezado: 'FNOMBRE', clave: (item: ConsultaSocioNacional) => item.nombre, orden: 2 },
    { encabezado: 'APELLIDO PATERNO', clave: (item: ConsultaSocioNacional) => item.apellidoPaterno, orden: 3 },
    { encabezado: 'APELLIDO MATERNO', clave: (item: ConsultaSocioNacional) => item.apellidoMaterno, orden: 4 }
]

export const CONFIGURACION_ENCABEZADO_SOCIO_EXTRANJERO = [
    { encabezado: 'RFC', clave: (item: ConsultaSocioExtranjeroFisica) => item.razonSocial, orden: 1 },
    { encabezado: 'FNOMBRE', clave: (item: ConsultaSocioExtranjeroFisica) => item.nombre, orden: 2 },
    { encabezado: 'APELLIDO PATERNO', clave: (item: ConsultaSocioExtranjeroFisica) => item.apellidoPaterno, orden: 3 },
    { encabezado: 'APELLIDO MATERNO', clave: (item: ConsultaSocioExtranjeroFisica) => item.apellidoMaterno, orden: 4 }
]