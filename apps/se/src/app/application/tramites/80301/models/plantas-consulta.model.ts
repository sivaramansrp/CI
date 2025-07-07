/**
 * Representa la información del domicilio de una planta, bodega o almacén.
 */
export interface DomicilioInfo {
  /** ID único del domicilio (opcional) */
  id?: number;
  /** Calle de la dirección */
  calle?: string;
  /** Número exterior del domicilio */
  numeroExterior?: string;
  /** Número interior del domicilio (si aplica) */
  numeroInterior?: string;
  /** Código postal del domicilio */
  codigoPostal?: string;
  /** Localidad o zona geográfica */
  localidad?: string;
  /** Colonia o fraccionamiento */
  colonia?: string;
  /** Delegación o municipio */
  delegacionMunicipio?: string;
  /** Entidad federativa (estado) */
  entidadFederativa?: string;
  /** País del domicilio */
  pais?: string;
  /** Teléfono de contacto del domicilio */
  telefono?: string;
  /** ID de la planta asociada */
  idPlanta?: string;
  /** ID de la solicitud asociada (opcional) */
  idSolicitud?: string;
  /** Razón social de la empresa asociada */
  razonSocial?: string;
  /** Estatus en texto legible: 'Activada' o 'Baja' */
  desEstatus?: 'Baja' | 'Activada';
  /** Estatus booleano (true para activo, false para inactivo) */
  estatus?: boolean;
  /** Registro Federal de Contribuyentes (RFC) */
  rfc?: string;
}

/**
 * Información complementaria de personas físicas o morales.
 */
export interface Complimentaria {
  /** RFC de la persona o empresa */
  rfc?: string;
  /** Nombre(s) del accionista o representante */
  nombre?: string;
  /** Primer apellido */
  apellidoPrimer?: string;
  /** Segundo apellido */
  apellidoSegundo?: string;
}

/**
 * Representa los datos de un fedatario público.
 */
export interface Federetarios {
  /** ID único del fedatario (opcional) */
  id?: number;
  /** Nombre del fedatario */
  nombre?: string;
  /** Primer apellido del fedatario */
  apellidoPrimer?: string;
  /** Segundo apellido del fedatario */
  apellidoSegundo?: string;
  /** Número de acta notarial */
  numeroActa?: string;
  /** Fecha del acta (puede contener error de tipografía: "fetchActa") */
  fetchActa?: string;
  /** Número de la notaría */
  numeroNotaria?: string;
  /** Municipio o delegación donde se emitió el acta */
  municipioDelegacion?: string;
  /** Estado o entidad federativa correspondiente */
  estado?: string;
}


/**
 * Representa los datos relacionados con una operación registrada dentro del trámite IMMEX.
 * 
 * Esta interfaz extiende de:
 * - `Complimentaria`: para incluir información del contribuyente o persona.
 * - `Federetarios`: para incluir información notarial relacionada.
 * - `DomicilioInfo`: para incluir los datos de ubicación del establecimiento.
 */
export interface Operacions extends Complimentaria, Federetarios, DomicilioInfo {
  /** Razón social del establecimiento u operación */
  razonSocial?: string;

  /** Domicilio fiscal del solicitante que presenta la operación */
  fiscalSolicitante?: string;

  /** Tipo de operación que se realiza en la planta (por ejemplo: almacenaje, maquila, transformación) */
  operacion?: string;

  // ──────────── Campos heredados y redefinidos para asegurar su presencia ────────────

  /** Registro Federal de Contribuyentes (RFC) del solicitante o empresa */
  rfc?: string;

  /** Nombre(s) del representante o persona asociada a la operación */
  nombre?: string;

  /** Primer apellido del representante */
  apellidoPrimer?: string;

  /** Segundo apellido del representante */
  apellidoSegundo?: string;

  /** Número del acta notarial asociada */
  numeroActa?: string;

  /** Fecha del acta notarial */
  fetchActa?: string;

  /** Número de la notaría donde se registró el acta */
  numeroNotaria?: string;

  /** Municipio o delegación en la que se ubica la operación */
  municipioDelegacion?: string;

  /** Estado o entidad federativa correspondiente */
  estado?: string;

  /** Identificador único de la operación */
  id?: number;

  /** Calle en la que se encuentra ubicada la planta o almacén */
  calle?: string;

  /** Número exterior del domicilio */
  numeroExterior?: string;

  /** Número interior del domicilio (si aplica) */
  numeroInterior?: string;

  /** Código postal del domicilio */
  codigoPostal?: string;

  /** Localidad correspondiente al domicilio */
  localidad?: string;

  /** Colonia del domicilio */
  colonia?: string;

  /** Delegación o municipio del domicilio */
  delegacionMunicipio?: string;

  /** Entidad federativa donde se localiza la operación */
  entidadFederativa?: string;

  /** País donde se encuentra la planta o almacén */
  pais?: string;

  /** Teléfono de contacto del establecimiento */
  telefono?: string;

  /** ID asignado a la planta dentro del sistema */
  idPlanta?: string;

  /** ID de la solicitud asociada a esta operación */
  idSolicitud?: string;

  /** Estado descriptivo del registro: 'Baja' o 'Activada' */
  desEstatus?: 'Baja' | 'Activada';

  /** Indicador booleano del estatus (true = activa, false = baja) */
  estatus?: boolean;
}


/**
 * Representa un registro en la bitácora de modificaciones.
 */
export interface Bitacora {
  /** Tipo de modificación realizada (ej. "Alta", "Baja", "Cambio") */
  tipoModificion: string;
  /** Fecha en que se realizó la modificación (puede tener error de escritura: "fetchModificion") */
  fetchModificion: string;
  /** Valores antes de la modificación (como string serializado) */
  valoresAnteriores: string;
  /** Valores después de la modificación */
  valoresNuevos: string;
}

/**
 * Información asociada a fracciones arancelarias y anexos de importación/exportación.
 */
export interface Anexo {
  /** Tipo de fracción (importación/exportación) */
  tipoFraccion?: string;
  /** Fracción arancelaria para exportación */
  fraccionArancelariaExportacion?: string;
  /** Fracción arancelaria para importación */
  fraccionArancelariaImportacion?: string;
  /** Descripción del producto o mercancía */
  descripcion?: string;
  /** Valores anteriores, si aplica para trazabilidad o auditoría */
  valoresAnteriores?: string;
}

/**
 * Contiene los datos generales para la modificación de una solicitud IMMEX.
 */
export interface DatosModificacion {
  /** Registro Federal de Contribuyentes del solicitante */
  rfc: string;
  /** Representación federal (nombre o entidad que representa) */
  representacionFederal: string;
  /** Tipo de modalidad IMMEX a modificar */
  tipoModalidad: string;
  /** Descripción detallada de la modalidad */
  descripcionModalidad: string;
}
