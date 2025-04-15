import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';

export interface MercanciaConfiguracionItem {
  tipoMercancia: string;
}

/**
 * Interfaz que define la estructura de un elemento de configuración para la tabla de terceros.
 * Representa los datos asociados a un destinatario, como país, ciudad, entidad federativa, domicilio y código postal.
 */
export interface DestinatarioConfiguracionItem {
  id?: number;
  denominacionRazonRem?: string;
  denominacionRazon: string;
    /**
   * Domicilio del destinatario.
   */
    domicilio: string;

  /**
   * País del destinatario.
   */
  pais: string;

  /**
   * Correo del destinatario.
   */
  correo: string;

  paginaWeb: string;

  tipoMercancia: string;
}

export const MERCANCIA_TABLA_CONFIGURACION = [
  {
    encabezado: 'Mercancia',
    clave: (item: MercanciaConfiguracionItem): string => item.tipoMercancia,
    orden: 1,
  }
]

/**
 * Configuración de las columnas para la tabla de terceros.
 * Define cómo se mostrarán los datos de los destinatarios en la tabla, incluyendo encabezados, claves y orden.
 */
export const DESTINATARIO_TABLA_CONFIGURACION: ConfiguracionColumna<DestinatarioConfiguracionItem>[] = [
  {
    /**
     * Encabezado de la columna para la denominación o razón social.
     */
    encabezado: 'Nombre / Razón social',
    /**
     * Clave que define cómo obtener el valor de la denominación o razón social de un elemento.
     */
    clave: (item: DestinatarioConfiguracionItem) => item.denominacionRazon,
    /**
     * Orden de la columna en la tabla.
     */
    orden: 1,
  },
  {
    encabezado: 'Domicilio',
    clave: (item: DestinatarioConfiguracionItem) => item.domicilio,
    orden: 2,
  },
  {
    encabezado: 'País',
    clave: (item: DestinatarioConfiguracionItem) => item.pais,
    orden: 3,
  }
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