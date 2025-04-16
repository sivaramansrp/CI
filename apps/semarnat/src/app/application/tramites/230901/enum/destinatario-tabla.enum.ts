import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';

/**
 * Interfaz que define la estructura de un elemento de configuración para la tabla de terceros.
 * Representa los datos asociados a un destinatario, como país, ciudad, entidad federativa, domicilio y código postal.
 */
export interface DestinatarioConfiguracionItem {
  /**
   * País del destinatario.
   */
  pais: string;

  /**
   * Ciudad del destinatario.
   */
  ciudad: string;

  /**
   * Entidad federativa del destinatario.
   */
  entidadFederativa: string;

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
    orden: 1,
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
    orden: 2,
  },
  {
    /**
     * Encabezado de la columna para la entidad federativa.
     */
    encabezado: 'Entidad Federativa',
    /**
     * Clave que define cómo obtener el valor de la entidad federativa de un elemento.
     */
    clave: (item: DestinatarioConfiguracionItem) => item.entidadFederativa,
    /**
     * Orden de la columna en la tabla.
     */
    orden: 3,
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
    orden: 4,
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
    orden: 5,
  },
];

/**
 * Entrada predeterminada para la tabla de destinatarios.
 * Proporciona valores iniciales para los datos de un destinatario.
 */
export const DESTINATARIO_TABLE_ENTRY = {
  /**
   * País del destinatario.
   */
  pais: 'MEXICO (ESTADOS UNIDOS MEXICANOS)',

  /**
   * Ciudad del destinatario.
   */
  ciudad: '---',

  /**
   * Entidad federativa del destinatario.
   */
  entidadFederativa: 'MORELOS',

  /**
   * Domicilio del destinatario.
   */
  domicilio: 'prueba',

  /**
   * Código postal del destinatario.
   */
  codigoPostal: 96533,
};