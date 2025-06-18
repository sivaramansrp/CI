import { Catalogo } from "@libs/shared/data-access-user/src";

/**
 * Representa los datos del solicitante.
 */
export interface DatosSolicitante {
  /**
   * RFC del solicitante.
   */
  rfc: string;

  /**
   * Denominación o razón social del solicitante.
   */
  denominacion: string;

  /**
   * Actividad económica del solicitante.
   */
  actividadEconomica: string;

  /**
   * Correo electrónico del solicitante.
   */
  correoElectronico: string;
}

/**
 * Representa los datos de modificación de un trámite.
 */
export interface DatosModificacion {
  /**
   * RFC del solicitante.
   */
  rfc: string;

  /**
   * Información federal del solicitante.
   */
  federal: string;

  /**
   * Tipo de trámite.
   */
  tipo: string;

  /**
   * Programa seleccionado.
   */
  programa: string;

  /**
   * Actividad actual del solicitante.
   */
  actividadActual: string;

  /**
   * Actividad productiva seleccionada.
   */
  actividadProductiva: string | null;
}

/**
 * Representa los datos de una modificación para mostrar en una tabla.
 */
export interface DatosDelModificacion {
  id?: number;
  calle?: string;
  numeroExterior?: number;
  numeroInterior?: number;
  codigoPosta?: number;
  colonia?: string;
  municipioOAlcaldia?: string;
  entidadFederativa?: string;
  pais?: string;
  rfc?: string;
  domicilioFiscal?: string;
  razonSocial?: string;
  desEstatus?: string;
}

/**
 * Representa los datos complementarios de un trámite.
 */
export interface Complimentaria {
  /**
   * RFC del accionista.
   */
  rfc?: string;

  /**
   * Nombre del accionista.
   */
  nombre?: string;

  /**
   * Primer apellido del accionista.
   */
  apellidoPrimer?: string;

  /**
   * Segundo apellido del accionista.
   */
  apellidoSegundo?: string;
}

/**
 * Representa los datos de un federatario.
 */
export interface Federetarios {
  /**
   * Nombre del federatario.
   */
  nombre?: string;

  /**
   * Apellido paterno del federatario.
   */
  apellidoPaterno?: string;

  /**
   * Apellido materno del federatario.
   */
  apellidoMaterno?: string;

  /**
   * Número del acta asociada al federatario.
   */
  numeroActa?: string;
}

/**
 * Representa los datos de una operación.
 */
export interface Operacions {
  id?: number;
  calle?: string; // Calle de la dirección
  numeroExterior?: string; // Número exterior de la dirección
  numeroInterior?: string; // Número interior de la dirección
  codigoPostal?: string; // Código postal
  localidad?: string; // Localidad
  colonia?: string; // Colonia
}

/**
 * Representa los datos de una bitácora.
 */
export interface Bitacora {
  /**
   * Tipo de modificación registrada en la bitácora.
   */
  tipoModificion: string;

  /**
   * Fecha de la modificación registrada.
   */
  fetchModificion: string;

  /**
   * Valores anteriores antes de la modificación.
   */
  valoresAnteriores: string;

  /**
   * Valores nuevos después de la modificación.
   */
  valoresNuevos: string;
}

/**
 * Representa los datos de una empresa.
 */
export interface Empresas {
  id?: number;
  rfc?: string;
  razonSocial?: string;
  calle?: string;
  numeroExterior?: string;
  numeroInterior?: string;
  codigoPostal?: string;
  colonia?: string;
  delegacionMunicipio?: string;
  entidadFederativa?: string;
  pais?: string;
  telefono?: string;
  estatus?: boolean;
}

/**
 * Representa los datos de una planta.
 */
export interface Plantas {
  calle?: string;
  numeroExterior?: string;
  numeroInterior?: string;
  codigoPostal?: string;
  colonia?: string;
  delegacionMunicipio?: string;
}

/**
 * Representa los datos de un servicio.
 */
export interface Servicios {
  id?: number;
  descripciondeservicio?: string;
  tipoServicio?: string;
  testado?: string;
  estatus?: string;
}

/**
 * Representa los datos de una fracción sensible.
 */
export interface FraccionSensible {
  id?: number;
  fraccionArancelariaExportacion?: number;
  cantidad?: number;
  valor?: number;
  unidadMedidaTarifaria?: string;
}

/**
 * Representa los datos de un anexo.
 */
export interface Anexo {
  tipoFraccion?: string;
  fraccionArancelariaExportacion?: string;
  fraccionArancelariaImportacion?: string;
  descripcion?: string;
  valoresAnteriores?: string;
}

/**
 * Representa los datos de una tabla.
 */
export interface DatosDeLaTabla {
  id: number;
  folioDePrograma: string;
  tipoDePrograma: string;
}

/**
   * Carga los datos de certificación desde el servicio y actualiza el formulario reactivo con los valores obtenidos.
   */
export interface DatosCertificacion {
  certificion: string;
  fechaInicio: string;
  fechaVigencia: string;
}

/**
 * Representa la respuesta de una consulta de datos.
 */
export interface RespuestaConsulta {
  success: boolean;
  datos: ConsultaDatos;
  message: string;
}

/**
 * Representa los datos obtenidos de una consulta.
 */
export interface ConsultaDatos {
  /**
   * Lista de actividades productivas asociadas a la consulta.
   */
  actividadProductiva: Catalogo[] | null;
}
