import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';

/**
 * Representa la configuración de un destinatario con información detallada.
 *
 * @property Nombre - Nombre del destinatario.
 * @property ApellidoPaterno - Apellido paterno del destinatario.
 * @property ApellidoMaterno - Apellido materno del destinatario.
 * @property RazonSocial - Razón social del destinatario.
 * @property pais - País del destinatario.
 * @property ciudad - Ciudad del destinatario.
 * @property domicilio - Domicilio del destinatario.
 * @property codigoPostal - Código postal o equivalente del destinatario.
 *
 * @remarks
 * - `entidadFederativa` (comentado): Representa la entidad federativa del destinatario.
 */
export interface DestinatarioConfiguracionItem {

  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  razonSocial: string;

  /**
   * País del destinatario.
   */
  pais: string;

  /**
   * Ciudad del destinatario.
   */
  ciudad: string;

  /**
   * Domicilio del destinatario.
   */
  domicilio: string;

  /**
   * Código postal o equivalente del destinatario.
   */
  codigoPostal: number;
}

/**
 * Configuración de las columnas para la tabla de terceros.
 * Define cómo se mostrarán los datos de los destinatarios en la tabla, incluyendo encabezados, claves y orden.
 */
export const DESTINATARIO_TABLA_CONFIGURACION: ConfiguracionColumna<DestinatarioConfiguracionItem>[] = [
  {

    encabezado: 'Nombre',

    clave: (item: DestinatarioConfiguracionItem) => item.nombre,
    orden: 1,
  },
  {

    encabezado: 'Apellido Paterno',

    clave: (item: DestinatarioConfiguracionItem) => item.apellidoPaterno,

    orden: 2,
  },
  {

    encabezado: 'Apellido materno',

    clave: (item: DestinatarioConfiguracionItem) => item.apellidoMaterno,

    orden: 3,
  },
  {

    encabezado: 'Razon Social',

    clave: (item: DestinatarioConfiguracionItem) => item.razonSocial,

    orden: 4,
  },
  {
    /**
     * Encabezado de la columna para el país.
     */
    encabezado: 'País',
    /**
     * Clave que define cómo obtener el valor del país de un elemento.
     */
    clave: (item: DestinatarioConfiguracionItem) => item.pais,
    /**
     * Orden de la columna en la tabla.
     */
    orden: 5,
  },
  {
    /**
     * Encabezado de la columna para la ciudad.
     */
    encabezado: 'Ciudad',
    /**
     * Clave que define cómo obtener el valor de la ciudad de un elemento.
     */
    clave: (item: DestinatarioConfiguracionItem) => item.ciudad,
    /**
     * Orden de la columna en la tabla.
     */
    orden: 6,
  },
  {
    /**
     * Encabezado de la columna para el domicilio.
     */
    encabezado: 'Domicilio',
    /**
     * Clave que define cómo obtener el valor del domicilio de un elemento.
     */
    clave: (item: DestinatarioConfiguracionItem) => item.domicilio,
    /**
     * Orden de la columna en la tabla.
     */
    orden: 7,
  },
  {
    /**
     * Encabezado de la columna para el código postal o equivalente.
     */
    encabezado: 'Código postal o equivalente',
    /**
     * Clave que define cómo obtener el valor del código postal de un elemento.
     */
    clave: (item: DestinatarioConfiguracionItem) => item.codigoPostal,
    /**
     * Orden de la columna en la tabla.
     */
    orden: 8,
  },
];

/**
 * Entrada predeterminada para la tabla de destinatarios.
 * Proporciona valores iniciales para los datos de un destinatario.
 */
export const DESTINATARIO_TABLE_ENTRY = {
  /**
   * Nombre del destinatario.
   */
  Nombre: 'prueba',

  /**
   * Apellido paterno del destinatario.
   */
  ApellidoPaterno: 'prueba',

  /**
   * Apellido materno del destinatario.
   */
  ApellidoMaterno: 'prueba',

  /**
   * Razón social del destinatario.
   */
  RazonSocial: 'prueba',

  /**
   * País del destinatario.
   */
  pais: 'MEXICO (ESTADOS UNIDOS MEXICANOS)',

  /**
   * Ciudad del destinatario.
   */
  ciudad: '---',

  /**
   * Domicilio del destinatario.
   */
  domicilio: 'prueba',

  /**
   * Código postal del destinatario.
   */
  codigoPostal: 96533,
};