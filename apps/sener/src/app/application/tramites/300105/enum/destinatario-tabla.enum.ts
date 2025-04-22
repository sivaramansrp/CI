import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';

/**
 * Interfaz MercanciaConfiguracionItem
 * Descripción: Representa la configuración de un elemento de mercancía.
 */
export interface MercanciaConfiguracionItem {
  /**
   * Propiedad tipoMercancia
   * Descripción: Tipo de mercancía asociada al elemento.
   */
  tipoMercancia: string;
}

/**
 * Interfaz DestinatarioConfiguracionItem
 * Descripción: Representa los datos asociados a un destinatario, como país, ciudad, entidad federativa, domicilio y código postal.
 */
export interface DestinatarioConfiguracionItem {
  /**
   * Propiedad id
   * Descripción: Identificador único del destinatario.
   */
  id?: number;

  /**
   * Propiedad denominacionRazonRem
   * Descripción: Denominación o razón social del remitente.
   */
  denominacionRazonRem?: string;

  /**
   * Propiedad denominacionRazon
   * Descripción: Denominación o razón social del destinatario.
   */
  denominacionRazon: string;

  /**
   * Propiedad domicilio
   * Descripción: Domicilio del destinatario.
   */
  domicilio: string;

  /**
   * Propiedad pais
   * Descripción: País del destinatario.
   */
  pais: string;

  /**
   * Propiedad correo
   * Descripción: Correo electrónico del destinatario.
   */
  correo: string;

  /**
   * Propiedad paginaWeb
   * Descripción: Página web del destinatario.
   */
  paginaWeb: string;

  /**
   * Propiedad tipoMercancia
   * Descripción: Tipo de mercancía asociada al destinatario.
   */
  tipoMercancia: string;
}

/**
 * Constante MERCANCIA_TABLA_CONFIGURACION
 * Descripción: Configuración de la tabla para los elementos de mercancía.
 */
export const MERCANCIA_TABLA_CONFIGURACION = [
  {
    /**
     * Propiedad encabezado
     * Descripción: Título de la columna en la tabla.
     */
    encabezado: 'Mercancia',

    /**
     * Propiedad clave
     * Descripción: Función que devuelve el valor de la clave para un elemento de mercancía.
     */
    clave: (item: MercanciaConfiguracionItem): string => item.tipoMercancia,

    /**
     * Propiedad orden
     * Descripción: Orden de la columna en la tabla.
     */
    orden: 1,
  },
];

/**
 * Constante DESTINATARIO_TABLA_CONFIGURACION
 * Descripción: Configuración de las columnas para la tabla de destinatarios.
 * Define cómo se mostrarán los datos de los destinatarios en la tabla, incluyendo encabezados, claves y orden.
 */
export const DESTINATARIO_TABLA_CONFIGURACION: ConfiguracionColumna<DestinatarioConfiguracionItem>[] = [
  {
    /**
     * Propiedad encabezado
     * Descripción: Encabezado de la columna para la denominación o razón social.
     */
    encabezado: 'Nombre / Razón social',

    /**
     * Propiedad clave
     * Descripción: Clave que define cómo obtener el valor de la denominación o razón social de un elemento.
     */
    clave: (item: DestinatarioConfiguracionItem) => item.denominacionRazon,

    /**
     * Propiedad orden
     * Descripción: Orden de la columna en la tabla.
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
  },
];