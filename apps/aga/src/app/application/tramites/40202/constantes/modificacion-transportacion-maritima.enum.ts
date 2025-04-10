import { CAATRegistradoEmpresaForm, CandidatoModificarCaatForm } from "../models/modificacion-transportacion-maritima.model";
import { ConfiguracionColumna } from "@libs/shared/data-access-user/src"

/**
 * Enum para los pasos del trámite de transporte marítimo
 * @enum {Array<{indice: number, titulo: string, activo: boolean, completado: boolean}>}
 */
export const MODIFICACION_TRANSPORTACION_MARITIMA_PASO = [
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

/**
 * Enum para los configuración de la tabla de CAAT registrado empresa
 * @enum {Array<{encabezado: string, clave: (fila: CAATRegistradoEmpresaForm) => string, orden: number}>}
 */
export const CAAT_REGISTRADO_EMPRESA_ENCABEZADO_DE_TABLA: ConfiguracionColumna<CAATRegistradoEmpresaForm>[] = [
    { encabezado: 'RFC/NSS', clave: (fila) => fila.rfc, orden: 1 },
    { encabezado: 'Nombre/Denominación/Razón social', clave: (fila) => fila.nombreDenominacionRazonSocial, orden: 2 },
    { encabezado: '# CAAT', clave: (fila) => fila.caat, orden: 3 },
    { encabezado: 'Inicio de vigencia', clave: (fila) => fila.inicioVigencia, orden: 4 },
    { encabezado: 'Fin de vigencia', clave: (fila) => fila.finVigencia, orden: 5 },
    { encabezado: 'País', clave: (fila) => fila.pais, orden: 6 }
]

/**
 * Enum para los configuración de la tabla de candidato a modificar CAAT
 * @enum {Array<{encabezado: string, clave: (fila: CandidatoModificarCaatForm) => string, orden: number}>}
 */
export const CAAT_CANDIDATO_MODIFICAR_ENCABEZADO_DE_TABLA: ConfiguracionColumna<CandidatoModificarCaatForm>[] = [
    { encabezado: 'RFC/NSS', clave: (fila) => fila.rfc, orden: 1 },
    { encabezado: 'Nombre/Denominación/Razón Social', clave: (fila) => fila.nombreDenominacionRazonSocial, orden: 2 },
    { encabezado: 'Correo electrónico', clave: (fila) => fila.correoElectronico, orden: 3 },
    { encabezado: 'Domicilio', clave: (fila) => fila.domicilio, orden: 4 },
    { encabezado: 'Nombre del Director General', clave: (fila) => fila.nombreDG, orden: 5 },
]

/**
 * Enum para los textos de la búsqueda de persona física
 * @enum {string}
 */
export const TEXTOS = {
    RFC_TITULO_TOOLTIP: 'Registro Federal de Contribuyente',
    CAAT_TITULO_TOOLTIP: 'Código alfanumérico armonizado del transportista',
    CORREO_TITULO_TOOLTIP: 'ejemplo@dominio.com'
};

/**
 * Opciones para el botón de radio de tipo de empresa
 * @enum {Array<{label: string, value: string}>}
 */
export const OPCIONES_DE_BOTON_DE_RADIO = [
    {
        label: 'Nacional',
        value: '1',
    },
    {
        label: 'Extranjera',
        value: '2',
    }
];