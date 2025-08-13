/**
 * Información del domicilio de la planta
 * @interface DomicilioInfo
 * @description Interface que define la estructura de datos para la información del domicilio de una planta
 */
export interface DomicilioInfo {
    /** Identificador único del domicilio */
    id?: number;
    /** Calle de la dirección */
    calle?: string;
    /** Número exterior de la dirección */
    numeroExterior?: string;
    /** Número interior de la dirección */
    numeroInterior?: string;
    /** Código postal */
    codigoPostal?: string;
    /** Localidad */
    localidad?: string;
    /** Colonia */
    colonia?: string;
    /** Delegación o municipio */
    delegacionMunicipio?: string;
    /** Entidad federativa */
    entidadFederativa?: string;
    /** País */
    pais?: string;
    /** Teléfono */
    telefono?: string;
    /** ID de la planta (como cadena de texto) */
    idPlanta?: string;
    /** ID de la solicitud (opcional, ya que puede estar indefinido) */
    idSolicitud?: string;
    /** Razón social */
    razonSocial?: string;
    /** Estado que puede ser 'Baja' o 'Activada' */
    desEstatus?: 'Baja' | 'Activada';
    /** Valor booleano para el estado */
    estatus?: boolean;
    /** Registro Federal de Contribuyentes */
    rfc?: string;
}

/**
 * Información complementaria del representante
 * @interface Complimentaria
 * @description Interface que define los datos complementarios de un representante
 */
export interface Complimentaria {
    /** Registro Federal de Contribuyentes */
    rfc?: string;
    /** Nombre del representante */
    nombre?: string;
    /** Primer apellido */
    apellidoPrimer?: string;
    /** Segundo apellido */
    apellidoSegundo?: string;
}

/**
 * Información de los federatarios
 * @interface Federetarios
 * @description Interface que define los datos de los federatarios o representantes legales
 */
export interface Federetarios {
    /** Nombre del federatario */
    nombre?: string;
    /** Primer apellido */
    apellidoPrimer?: string;
    /** Segundo apellido */
    apellidoSegundo?: string;
    /** Número del acta constitutiva */
    numeroActa?: string;
    /** Fecha del acta */
    fetchActa?: string;
    /** Número de la notaría */
    numeroNotaria?: string;
    /** Municipio o delegación */
    municipioDelegacion?: string;
    /** Estado */
    estado?: string;
}

/**
 * Operaciones que extiende múltiples interfaces
 * @interface Operacions
 * @description Interface que combina información complementaria, federatarios y domicilio
 * @extends Complimentaria
 * @extends Federetarios
 * @extends DomicilioInfo
 */
export interface Operacions extends Complimentaria, Federetarios, DomicilioInfo {
    /** Razón social de la empresa */
    razonSocial?: string;
    /** RFC del solicitante fiscal */
    fiscalSolicitante?: string;
    // Propiedades heredadas se documentan automáticamente
}

/**
 * Información de la bitácora de cambios
 * @interface Bitacora
 * @description Interface que registra las modificaciones realizadas
 */
export interface Bitacora {
    /** Tipo de modificación realizada */
    tipoModificion: string;
    /** Fecha de la modificación */
    fetchModificion: string;
    /** Valores anteriores antes del cambio */
    valoresAnteriores: string;
    /** Valores nuevos después del cambio */
    valoresNuevos: string;
}

/**
 * Información de anexos
 * @interface Anexo
 * @description Interface que define la estructura de los anexos del trámite
 */
export interface Anexo {
    /** Tipo de fracción arancelaria */
    tipoFraccion?: string;
    /** Fracción arancelaria para exportación */
    fraccionArancelariaExportacion?: string;
    /** Fracción arancelaria para importación */
    fraccionArancelariaImportacion?: string;
    /** Descripción del anexo */
    descripcion?: string;
    /** Valores anteriores */
    valoresAnteriores?: string;
}

/**
 * Datos de modificación del trámite
 * @interface DatosModificacion
 * @description Interface que contiene los datos necesarios para una modificación
 */
export interface DatosModificacion {
    /** Registro Federal de Contribuyentes */
    rfc: string;
    /** Representación federal */
    representacionFederal: string;
    /** Tipo de modalidad */
    tipoModalidad: string;
    /** Descripción de la modalidad */
    descripcionModalidad: string;
}

/**
 * Fracción arancelaria
 * @interface FracciónArancelaria
 * @description Interface que define la estructura de una fracción arancelaria
 */
export interface FracciónArancelaria {
    /** Identificador único */
    id?: number;
    /** Fracción arancelaria */
    fraccionArancelariaFraccion?: string;
    /** Cantidad */
    cantidad?: string;
    /** Valor */
    valor?: string;
    /** Unidad de medida tarifaria */
    unidadMedidaTarifaria?: string;
}

/**
 * Datos de la operación IMMEX
 * @interface DatosImmex
 * @description Interface que contiene los datos específicos para operaciones IMMEX
 */
export interface DatosImmex {
    /** Registro Federal de Contribuyentes */
    rfc?: string;
    /** Domicilio fiscal */
    domicilioFiscal?: string;
    /** Calle */
    calle?: string;
    /** Número interior */
    numeroInterior?: string;
    /** Número exterior */
    numeroExterior?: string;
    /** Código postal */
    codigoPostal?: string;
    /** Colonia */
    colonia?: string;
    /** Localidad */
    localidad?: string;
    /** Entidad federativa */
    entidadFederativa?: string;
    /** País */
    pais?: string;
    /** Teléfono */
    telefono?: string;
}

/**
 * Datos de modificación de la planta
 * @interface DatosDelModificacion
 * @description Interface que define los datos que pueden ser modificados en una planta
 */
export interface DatosDelModificacion {
    /** Identificador único */
    id?: number;
    /** Calle */
    calle?: string;
    /** Número exterior */
    numeroExterior?: number;
    /** Número interior */
    numeroInterior?: number;
    /** Código postal */
    codigoPosta?: number;
    /** Colonia */
    colonia?: string;
    /** Municipio o alcaldía */
    municipioOAlcaldia?: string;
    /** Entidad federativa */
    entidadFederativa?: string;
    /** País */
    pais?: string;
    /** Teléfono */
    telefono?: string;
    /** Descripción del estatus */
    desEstatus?: string;
}

/**
 * Datos de los servicios
 * @interface DatosDelServicios
 * @description Interface que define la estructura de los servicios ofrecidos
 */
export interface DatosDelServicios {
    /** Identificador único */
    id?: number;
    /** Descripción del estatus */
    desEstatus?: string;
    /** Descripción del servicio */
    descripcion?: string;
    /** Tipo de servicio */
    tipoDeServicio?: string;
    /** Estado del servicio */
    testado?: string;
}

/**
 * Datos de modificación secundarios
 * @interface DatosDelModificaciondos
 * @description Interface simplificada para modificaciones de servicios
 */
export interface DatosDelModificaciondos {
    /** Identificador único */
    id?: number;
    /** Descripción del estatus */
    desEstatus?: string;
    /** Descripción */
    descripcion?: string;
    /** Tipo de servicio */
    tipoDeServicio?: string;
}