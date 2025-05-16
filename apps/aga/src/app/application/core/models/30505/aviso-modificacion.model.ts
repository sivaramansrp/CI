import { ConfiguracionColumna } from "@libs/shared/data-access-user/src";

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
 * Crea y retorna el estado inicial para la solicitud 30505.
 *
 * @returns {Solicitud30505State} El estado inicial de la solicitud 30505 con valores predeterminados.
 *
 * @memberof Tramites30505Store
 *
 * @see Solicitud30505State
 */
export const TERCEROS_ENCABEZADO_DE_TABLA: ConfiguracionColumna<TercerosRelacionados>[] =
  [
    {
      encabezado: 'RFC',
      clave: (fila) => fila.rfc,
      orden: 1,
    },
    { encabezado: 'CURP', clave: (fila) => fila.curp, orden: 2},
    { encabezado: 'Nombre', clave: (fila) => fila.nombre, orden: 3 },
    {
      encabezado: 'Apellido Paterno',
      clave: (fila) => fila.apellidoPaterno,
      orden: 4,
    },
    { encabezado: 'Apellido Materno',
       clave: (fila) => fila.apellidoMaterno,
        orden: 5 
      },
    {
      encabezado: 'Domicilio',
      clave: (fila) => fila.domicilio,
      orden: 6,
    }
  ];

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
 * Configuración de columnas para la tabla de Fusión/Escisión.
 * Define los encabezados, claves de acceso y el orden de las columnas que se mostrarán en la interfaz.
 * 
 * @type {ConfiguracionColumna<FusionEscision>[]}
 * 
 * @property {string} encabezado - Título de la columna que se muestra en la tabla.
 * @property {(fila: FusionEscision) => any} clave - Función que retorna el valor a mostrar en la columna, dependiendo de la fila y condiciones específicas.
 * @property {number} orden - Orden en el que se muestra la columna en la tabla.
 * 
 * @author Equipo de Desarrollo VUCEM
 * @since 2024-06
 */
export const FUSION_CONFIGURATION_TABLA: ConfiguracionColumna<FusionEscision>[] =
  [
    {
      encabezado: 'Registro Federal de Contribuyentes',
      clave: (fila) => fila.certificacionModal == '1'? fila.rfcBusquedaModal: fila.rfcBusquedaModalSC,
      orden: 1,
    },
    { encabezado: 'Denominación o Razón Social', clave: (fila) => fila.certificacionModal == '1' ? fila.razonSocialFusionante : fila.razonSocialFusionanteSC, orden: 2},
    { encabezado: 'Folio VUCEM de la Última certificación/renovación', clave: (fila) => fila.folioVucemFusionante, orden: 3 },
    {
      encabezado: 'Fecha de fin de vigencia de la Última certificación/renovación',
      clave: (fila) => fila.fechaInicioVigenciaFusionante,
      orden: 4,
    },
    { encabezado: 'Fecha de inicio de vigencia de la Última certificación/renovación',
       clave: (fila) => fila.fechaFinVigenciaFusionante,
        orden: 5 
      },
  ];

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
  tipoDeFigura: string,
  nombre: string,
  apellidoPaterno: string,
  apellidoMaterno: string,
  razonSocial: string,
  patentAutorizacion: string,
  estatus: string
}
/**
 * @description
 * Configuración de las columnas para la tabla de Aviso de Agente.
 * Cada objeto en el arreglo representa una columna con su encabezado, función para obtener el valor de la fila y el orden de aparición.
 *
 * @type {ConfiguracionColumna<AvisoAgente>[]}
 *
 * @see AvisoAgente
 * @see ConfiguracionColumna
 *
 * @memberof AvisoModificacion
 *
 * @example
 * // Uso en un componente de tabla:
 * <app-tabla [columnas]="AVISO_AGENTE_DE_TABLA" [datos]="agentes"></app-tabla>
 */
export const AVISO_AGENTE_DE_TABLA: ConfiguracionColumna<AvisoAgente>[] =
  [
    {
      encabezado: 'Tipo de Figura',
      clave: (fila) => fila.tipoDeFigura,
      orden: 1,
    },
    { encabezado: 'Nombre', clave: (fila) => fila.nombre, orden: 2 },
    {
      encabezado: 'Apellido Paterno',
      clave: (fila) => fila.apellidoPaterno,
      orden: 3,
    },
    { encabezado: 'Apellido Materno',
       clave: (fila) => fila.apellidoMaterno,
        orden: 4 
      },
    {
      encabezado: 'Denominación o Razón Social',
      clave: (fila) => fila.razonSocial,
      orden: 5,
    },
    {
      encabezado: 'Patente o Autorización',
      clave: (fila) => fila.patentAutorizacion,
      orden: 6,
    },
    {
      encabezado: 'Estatus',
      clave: (fila) => fila.estatus,
      orden: 7,
    }
  ];

  
 
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

 
