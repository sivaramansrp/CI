/**
 * @fileoverview
 * Archivo de constantes y configuraciones para el módulo de modificaciones del programa IMMEX.
 * Contiene todas las configuraciones de columnas para tablas, pasos del proceso y textos informativos.
 * 
 * @version 1.0.0
 * @author Sistema IMMEX
 * @since 2025
 */

import {
  Anexo,
  Bitacora,
  Complimentaria,
  DatosDelModificacion,
  DatosDelServicios,
  DatosImmex,
  DomicilioInfo,
  Federetarios,
  FracciónArancelaria,
  Operacions,
} from '../models/plantas-consulta.model';

/**
 * @constant PASOS
 * @description
 * Define los pasos del proceso de solicitud de modificación IMMEX.
 * Cada paso incluye índice, título, estado activo y estado de completado.
 * 
 * @type {Array<{indice: number, titulo: string, activo: boolean, completado: boolean}>}
 * 
 * @example
 * ```typescript
 * // Uso del array de pasos
 * PASOS.forEach(paso => {
 *   console.log(`Paso ${paso.indice}: ${paso.titulo}`);
 * });
 * ```
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
    titulo: 'Requisitos necesarios',
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
 * @constant CONFIGURACION_DOMICILIOS
 * @description
 * Configuración de columnas para la tabla de domicilios.
 * Define el encabezado, función de extracción de datos y orden de cada columna.
 * 
 * @type {Array<{encabezado: string, clave: Function, orden: number}>}
 * 
 * @example
 * ```typescript
 * // Uso en componente de tabla
 * const datos = CONFIGURACION_DOMICILIOS.map(config => ({
 *   header: config.encabezado,
 *   value: config.clave(domicilioData),
 *   order: config.orden
 * }));
 * ```
 */
export const CONFIGURACION_DOMICILIOS = [
  {
    encabezado: 'Calle',
    clave: (ele: DomicilioInfo): string | undefined => ele.calle,
    orden: 1,
  },
  {
    encabezado: 'Número Exterior',
    clave: (ele: DomicilioInfo) : string | undefined => ele.numeroExterior,
    orden: 2,
  },
  {
    encabezado: 'Número Interior',
    clave: (ele: DomicilioInfo): string | undefined => ele.numeroInterior,
    orden: 3,
  },
  {
    encabezado: 'Código Postal',
    clave: (ele: DomicilioInfo): string | undefined => ele.codigoPostal,
    orden: 4,
  },

  {
    encabezado: 'Colonia',
    clave: (ele: DomicilioInfo): string | undefined => ele.colonia,
    orden: 5,
  },
  {
    encabezado: 'Localidad',
    clave: (ele: DomicilioInfo): string | undefined => ele.localidad,
    orden: 6,
  },

  {
    encabezado: 'Municipio o alcaldía',
    clave: (ele: DomicilioInfo): string | undefined => ele.delegacionMunicipio,
    orden: 7,
  },
  {
    encabezado: 'Entidad Federativa',
    clave: (ele: DomicilioInfo): string | undefined => ele.entidadFederativa,
    orden: 8,
  },
  {
    encabezado: 'País',
    clave: (ele: DomicilioInfo): string | undefined => ele.pais,
    orden: 9,
  },
  {
    encabezado: 'RFC',
    clave: (ele: DomicilioInfo): string | undefined => ele.rfc,
    orden: 10,
  },
  
  {
    encabezado: 'Razón Social',
    clave: (ele: DomicilioInfo): string | undefined => ele.razonSocial,
    orden: 13,
  },
 
];

/**
 * @constant CONFIGURACION_ACCIONISTAS
 * @description
 * Configuración de columnas para mostrar información de accionistas.
 * Incluye RFC, nombres y apellidos de los accionistas de la empresa.
 * 
 * @type {Array<{encabezado: string, clave: (ele: Complimentaria) => string | undefined, orden: number}>}
 */
export const CONFIGURACION_ACCIONISTAS = [
  {
    encabezado: 'Registro Federal de Contribuyente(RFC)',
    clave: (ele: Complimentaria): string | undefined => ele.rfc,
    orden: 1,
  },
  {
    encabezado: 'Nombre(s)',
    clave: (ele: Complimentaria): string | undefined => ele.nombre,
    orden: 2,
  },
  {
    encabezado: 'Primer apellido',
    clave: (ele: Complimentaria): string | undefined => ele.apellidoPrimer,
    orden: 3,
  },
  {
    encabezado: 'Segundo apellido',
    clave: (ele: Complimentaria): string | undefined => ele.apellidoSegundo,
    orden: 4,
  },
];

/**
 * @constant CONFIGURACION_FEDERETARIOS
 * @description
 * Configuración para mostrar datos de federatarios (representantes legales).
 * Incluye información personal y datos del acta notarial.
 * 
 * @type {Array<{encabezado: string, clave: (ele: Federetarios) => string | undefined, orden: number}>}
 * 
 * @note Contiene error tipográfico en "Fetcha acta" que debería ser "Fecha acta"
 */
export const CONFIGURACION_FEDERETARIOS = [
  {
    encabezado: 'Nombre',
    clave: (ele: Federetarios): string | undefined => ele.nombre,
    orden: 1,
  },
  {
    encabezado: 'Primer apellido',
    clave: (ele: Federetarios): string | undefined => ele.apellidoPrimer,
    orden: 2,
  },
  {
    encabezado: 'Segundo apellido',
    clave: (ele: Federetarios): string | undefined => ele.apellidoSegundo,
    orden: 3,
  },
  {
    encabezado: 'Número acta',
    clave: (ele: Federetarios): string | undefined => ele.numeroActa,
    orden: 4,
  },
  {
    encabezado: 'Fetcha acta',
    clave: (ele: Federetarios) : string | undefined => ele.fetchActa,
    orden: 5,
  },
  {
    encabezado: 'Número notaria',
    clave: (ele: Federetarios) : string | undefined => ele.numeroNotaria,
    orden: 6,
  },
  {
    encabezado: 'Municipio o Delegación',
    clave: (ele: Federetarios) : string | undefined => ele.municipioDelegacion,
    orden: 7,
  },
  {
    encabezado: 'Estado o Distrito Federal',
    clave: (ele: Federetarios) : string | undefined => ele.estado,
    orden: 8,
  },
];

/**
 * @constant CONFIGURACION_OPERACIONES
 * @description
 * Configuración de columnas para la tabla de operaciones.
 * Muestra información completa del domicilio y estatus de las operaciones.
 * 
 * @type {Array<{encabezado: string, clave: (ele: Operacions) => string | undefined, orden: number}>}
 * 
 * @example
 * ```typescript
 * // Filtrar solo operaciones activas
 * const operacionesActivas = operaciones.filter(op => 
 *   CONFIGURACION_OPERACIONES.find(config => 
 *     config.encabezado === 'Estatus' && config.clave(op) === 'Activada'
 *   )
 * );
 * ```
 */
export const CONFIGURACION_OPERACIONES = [
  {
    encabezado: 'Calle',
    clave: (ele: Operacions) : string | undefined => ele.calle,
    orden: 1,
  },
  {
    encabezado: 'Número Exterior',
    clave: (ele: Operacions) : string | undefined => ele.numeroExterior,
    orden: 2,
  },
  {
    encabezado: 'Número Interior',
    clave: (ele: Operacions) : string | undefined => ele.numeroInterior,
    orden: 3,
  },
  {
    encabezado: 'Código Postal',
    clave: (ele: Operacions) : string | undefined => ele.codigoPostal,
    orden: 4,
  },
  {
    encabezado: 'Colonia',
    clave: (ele: Operacions) : string | undefined => ele.colonia,
    orden: 5,
  },
  {
    encabezado: 'Localidad',
    clave: (ele: Operacions) : string | undefined => ele.localidad,
    orden: 6,
  },
  {
    encabezado: 'Municipio o Delegación',
    clave: (ele: Operacions) : string | undefined => ele.municipioDelegacion,
    orden: 7,
  },
  {
    encabezado: 'Estado o Distrito Federal',
    clave: (ele: Operacions) : string | undefined => ele.estado,
    orden: 8,
  },
  {
    encabezado: 'País',
    clave: (ele: Operacions) : string | undefined => ele.pais,
    orden: 9,
  },
  {
    encabezado: 'Registro Federal de Contribuyente(RFC)',
    clave: (ele: Operacions) : string | undefined => ele.rfc,
    orden: 10,
  },
  {
    encabezado: 'Domicilio fiscal del solicitante',
    clave: (ele: Operacions) : string | undefined => ele.fiscalSolicitante,
    orden: 11,
  },
  {
    encabezado: 'Denominación o razón social',
    clave: (ele: Operacions) : string | undefined => ele.razonSocial,
    orden: 12,
  },

  {
    encabezado: 'Estatus',
    clave: (ele: Operacions) : string | undefined => (ele.estatus ? 'Activada' : 'Baja'),
    orden: 13,
  },
];

/**
 * @constant CONFIGURACION_BITACORA_TABLA
 * @description
 * Configuración para la tabla de bitácora de modificaciones.
 * Registra el historial de cambios realizados en el sistema.
 * 
 * @type {Array<{encabezado: string, clave: (ele: Bitacora) => string | undefined, orden: number}>}
 */
export const CONFIGURACION_BITACORA_TABLA = [
  {
    encabezado: 'Tipo modificación',
    clave: (ele: Bitacora) : string | undefined => ele.tipoModificion,
    orden: 1,
  },
  {
    encabezado: 'Fecha modificación',
    clave: (ele: Bitacora) : string | undefined => ele.fetchModificion,
    orden: 2,
  },
  {
    encabezado: 'Valores anteriores',
    clave: (ele: Bitacora) : string | undefined => ele.valoresAnteriores,
    orden: 3,
  },
  {
    encabezado: 'Valores nuevos',
    clave: (ele: Bitacora): string | undefined => ele.valoresNuevos,
    orden: 4,
  },
];

/**
 * @constant CONFIGURACION_ANEXOS_TABLA
 * @description
 * Configuración para mostrar anexos en formato de tabla.
 * Incluye fracciones arancelarias y descripciones de productos.
 * 
 * @type {Array<{encabezado: string, clave: (ele: Anexo) => string | undefined, orden: number}>}
 */
export const CONFIGURACION_ANEXOS_TABLA = [
  {
    encabezado: 'Fracción arancelaria del producto de exportación',
    clave: (ele: Anexo) : string | undefined => ele.fraccionArancelariaExportacion,
    orden: 1,
  },
  {
    encabezado: 'Descripción',
    clave: (ele: Anexo): string | undefined => ele.descripcion,
    orden: 2,
  },
  {
    encabezado: 'Tipo Fracción',
    clave: (ele: Anexo) : string | undefined => ele.tipoFraccion,
    orden: 3,
  },
];

/**
 * @constant CONFIGURACION_ANEXOS_IMPORTACION
 * @description
 * Configuración específica para anexos de importación.
 * Incluye tanto fracciones de exportación como de importación.
 * 
 * @type {Array<{encabezado: string, clave: (ele: Anexo) => string | undefined, orden: number}>}
 * 
 * @warning Hay dos elementos con orden 1, esto puede causar problemas de ordenamiento
 */
export const CONFIGURACION_ANEXOS_IMPORTACION = [
  {
    encabezado: 'Fracción arancelaria del producto de exportación',
    clave: (ele: Anexo): string | undefined => ele.fraccionArancelariaExportacion,
    orden: 1,
  },
  {
    encabezado: 'Fracción arancelaria de la mercancía de importación',
    clave: (ele: Anexo): string | undefined => ele.fraccionArancelariaImportacion,
    orden: 1,
  },
  {
    encabezado: 'Descripción',
    clave: (ele: Anexo) : string | undefined => ele.descripcion,
    orden: 2,
  },
  {
    encabezado: 'Tipo Fracción',
    clave: (ele: Anexo) : string | undefined => ele.tipoFraccion,
    orden: 3,
  },
];

/**
 * @constant TITULOMENSAJE
 * @description
 * Título principal del proceso de modificación IMMEX.
 * Se utiliza en encabezados y documentos oficiales.
 * 
 * @type {string}
 */
export const TITULOMENSAJE =
  'Registro de solicitud de modificación programa IMMEX (Modificación Alta a domicilio de una planta, bodega o almacén)';

/**
 * @constant TEXTOS_REQUISITOS
 * @description
 * Texto informativo que se muestra al usuario después del registro.
 * Explica el número temporal y el proceso de asignación de folio oficial.
 * 
 * @type {string}
 */
export const TEXTOS_REQUISITOS =
  'La solicitud ha quedado registrada con el número temporal [202767640]. Este no tiene validez legal y sirve solamente para efectos de identificar tu Solicitud. Un folio oficial le será asignado a la solicitud al momento en que esta sea firmada.';

/**
 * @constant CONFIGURACION_ANEXOS_FRACCION
 * @description
 * Configuración para mostrar fracciones arancelarias con detalles de cantidad y valor.
 * Utilizada en el procesamiento de mercancías de importación.
 * 
 * @type {Array<{encabezado: string, clave: (ele: FracciónArancelaria) => string | undefined, orden: number}>}
 * 
 * @warning Dos elementos tienen orden 1, revisar para evitar conflictos de ordenamiento
 */
export const CONFIGURACION_ANEXOS_FRACCION = [
  {
    encabezado: 'Fracción arancelaria de la mercancía de Importación',
    clave: (ele: FracciónArancelaria): string | undefined => ele.fraccionArancelariaFraccion,
    orden: 1,
  },
  {
    encabezado: 'Cantidad',
    clave: (ele: FracciónArancelaria): string | undefined => ele.cantidad,
    orden: 1,
  },
  {
    encabezado: 'Valor',
    clave: (ele: FracciónArancelaria): string | undefined => ele.valor,
    orden: 2,
  },
  {
    encabezado: 'Unidad de medida tarifaria',
    clave: (ele: FracciónArancelaria) : string | undefined => ele.unidadMedidaTarifaria,
    orden: 3,
  },
];

/**
 * @constant CONFIGURACION_ANEXOS_IMMEX
 * @description
 * Configuración para mostrar datos completos del programa IMMEX.
 * Incluye información fiscal, domicilio y contacto de la empresa.
 * 
 * @type {Array<{encabezado: string, clave: (ele: DatosImmex) => string | undefined, orden: number}>}
 */
export const CONFIGURACION_ANEXOS_IMMEX = [
  {
    encabezado: 'Registro Federal de Contribuyentes',
    clave: (ele: DatosImmex): string | undefined => ele.rfc,
    orden: 1,
  },
  {
    encabezado: 'Razón social',
    clave: (ele: DatosImmex): string | undefined => ele.domicilioFiscal,
    orden: 2,
  },
  {
    encabezado: 'Calle',
    clave: (ele: DatosImmex): string | undefined => ele.calle,
    orden: 3,
  },
  {
    encabezado: 'Número interior',
    clave: (ele: DatosImmex): string | undefined => ele.numeroInterior,
    orden: 4,
  },

  {
    encabezado: 'Número exterior',
    clave: (ele: DatosImmex): string | undefined => ele.numeroExterior,
    orden: 5,
  },
  {
    encabezado: 'Código postal',
    clave: (ele: DatosImmex): string | undefined => ele.codigoPostal,
    orden: 6,
  },
  {
    encabezado: 'Colonia',
    clave: (ele: DatosImmex): string | undefined => ele.colonia,
    orden: 7,
  },
  {
    encabezado: 'Municipio o Delegación',
    clave: (ele: DatosImmex): string | undefined => ele.localidad,
    orden: 8,
  },
  {
    encabezado: 'Entidad Federativa',
    clave: (ele: DatosImmex): string | undefined => ele.entidadFederativa,
    orden: 9,
  },
  {
    encabezado: 'País',
    clave: (ele: DatosImmex): string | undefined => ele.pais,
    orden: 10,
  },
  {
    encabezado: 'Teléfono',
    clave: (ele: DatosImmex): string | undefined => ele.telefono,
    orden: 11,
  }
];
/**
 * CONFIGURACION_SERVICIOS - Configuración de columnas para la tabla de servicios
 * Muestra información sobre los servicios relacionados con el trámite,
 * incluyendo descripción, tipo, estatus y si está testado
 */
export const CONFIGURACION_SERVICIOS = [
    {
      encabezado: 'Estatus',
      clave: (ele: DatosDelServicios):string | undefined => ele.desEstatus,
      orden: 4,
    },
    {
      encabezado: 'Testado',
      clave: (ele: DatosDelServicios):string | undefined => ele.testado,
      orden: 3,
    },
    {
      encabezado: 'Descripción del servicio',
      clave: (ele: DatosDelServicios):string | undefined => ele.descripcion,
      orden: 1,
    },
    {
      encabezado: 'Tipo de servicio',
      clave: (ele: DatosDelServicios):string | undefined => ele.tipoDeServicio,
      orden: 2,
    }
];

/**
 * CONFIGURACION_MODIFICACION - Configuración de columnas para la tabla de modificaciones
 * Define la estructura para mostrar los datos de modificación de domicilio,
 * incluyendo información completa de la dirección y datos de contacto
 */
export const CONFIGURACION_MODIFICACION = [
    { encabezado: 'Id', 
      clave: (ele: DatosDelModificacion):number | undefined => ele.id, 
      orden: 0 },
    { encabezado: 'Calle', 
      clave: (ele: DatosDelModificacion):string | undefined => ele.calle, 
      orden: 2 },
    {
      encabezado: 'Número Exterior',
      clave: (ele: DatosDelModificacion):number | undefined => ele.numeroExterior,
      orden: 3,
    },
    {
      encabezado: 'Número Interior',
      clave: (ele: DatosDelModificacion):number | undefined => ele.numeroInterior,
      orden: 4,
    },
    {
      encabezado: 'Código Postal',
      clave: (ele: DatosDelModificacion):number | undefined => ele.codigoPosta,
      orden: 5,
    },
    { encabezado: 'Colonia', 
      clave: (ele: DatosDelModificacion):string | undefined => ele.colonia, 
      orden: 6 },
    {
      encabezado: 'Municipio o alcaldía',
      clave: (ele: DatosDelModificacion):string | undefined => ele.municipioOAlcaldia,
      orden: 7,
    },
    {
      encabezado: 'Entidad Federativa',
      clave: (ele: DatosDelModificacion):string | undefined => ele.entidadFederativa,
      orden: 8,
    },
    { encabezado: 'País', 
      clave: (ele: DatosDelModificacion):string | undefined => ele.pais, 
      orden: 9 },
    {
      encabezado: 'Telefono',
      clave: (ele: DatosDelModificacion):string | undefined => ele.telefono,
      orden: 10,
    },
    {
      encabezado: 'Estatus',
      clave: (ele: DatosDelModificacion):string | undefined => ele.desEstatus,
      orden: 1,
    },
];

