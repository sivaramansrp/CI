/**
 * @description Representa la información de los terceros relacionados.
 * @interface
 * @property {string} rfc - RFC del tercero relacionado.
 * @property {string} curp - CURP del tercero relacionado.
 * @property {string} nombre - Nombre del tercero relacionado.
 * @property {string} apellidoPaterno - Apellido paterno del tercero relacionado.
 * @property {string} apellidoMaterno - Apellido materno del tercero relacionado.
 * @property {string} domicilio - Domicilio del tercero relacionado.
 */
export interface TercerosRelacionados{
  rfc: string,
  curp: string,
  nombre: string,
  apellidoPaterno: string,
  apellidoMaterno: string,
  domicilio: string
}

/**
 * @description
 * Representa el modelo de datos para la fusión o escisión de una entidad.
 *
 * @property {string} certificacionModal - Certificación asociada al proceso de fusión o escisión.
 * @property {string} rfcBusquedaModal - RFC utilizado para la búsqueda de la entidad fusionante.
 * @property {string} razonSocialFusionante - Razón social de la entidad fusionante.
 * @property {string} folioVucemFusionante - Folio VUCEM de la entidad fusionante.
 * @property {string} fechaInicioVigenciaFusionante - Fecha de inicio de vigencia de la fusión.
 * @property {string} fechaFinVigenciaFusionante - Fecha de fin de vigencia de la fusión.
 * @property {string} rfcBusquedaModalSC - RFC utilizado para la búsqueda de la sociedad controladora.
 * @property {string} razonSocialFusionanteSC - Razón social de la sociedad controladora.
 *
 * @author Su equipo de desarrollo
 */
export interface FusionEscision{
  certificacionModal: string,
  rfcBusquedaModal: string,
  razonSocialFusionante: string,
  folioVucemFusionante: string,
  fechaInicioVigenciaFusionante: string,
  fechaFinVigenciaFusionante: string,
  rfcBusquedaModalSC: string,
  razonSocialFusionanteSC: string
}

/**
 * @description
 * Representa la información de un aviso de agente, incluyendo datos personales y de autorización.
 *
 * @interface
 * @export
 * @compodoc
 * @param {string} tipoDeFigura - Tipo de figura del agente.
 * @param {string} nombre - Nombre del agente.
 * @param {string} apellidoPaterno - Apellido paterno del agente.
 * @param {string} apellidoMaterno - Apellido materno del agente.
 * @param {string} razonSocial - Razón social asociada al agente.
 * @param {string} patentAutorizacion - Patente o autorización del agente.
 * @param {string} estatus - Estatus actual del agente.
 */
export interface AvisoAgente{
  tipoFigura: string,
      patenteModificada:string,
      numPatenteModal: string,
      rfcModal: string,
      obligFisc: string,
      autPantente: string,
      nombre: string,
      apellidoPaterno: string,
      apellidoMaterno:string,
      razonSocial: string,
      patente2: string,
      razonAgencia: string
}

  /**
   * @desc Identificador único de la tabla utilizada para mostrar los datos de fusión o escisión en la interfaz de usuario.
   * @type {string}
   * @memberof AvisoModificacion
   */
  export const TABLE_ID = "gridFusionEscision";

 /**
 * @description
 * Representa los datos relacionados con la fusión de una entidad.
 *
 * @property {string} razonSocial - Razón social de la entidad fusionada.
 * @property {string} numFolioTramite - Número de folio del trámite de fusión.
 * @property {string} fechaInicioVigencia - Fecha de inicio de la vigencia de la fusión (formato ISO).
 * @property {string} fechaFinVigencia - Fecha de fin de la vigencia de la fusión (formato ISO).
 *
 * @author
 * @compodoc
 */
  export interface FusionDatos{
    razonSocial: string,
    numFolioTramite: string,
    fechaInicioVigencia: string,
    fechaFinVigencia: string
  }

 
