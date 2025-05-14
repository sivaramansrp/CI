/**
 * Interfaz SerieConfiguracionItem
 * Descripción: Representa la configuración de un elemento de serie.
 */
export interface SerieConfiguracionItem {
  /**
   * Propiedad serie
   * Descripción: Número de serie del elemento.
   */
  serie: string;
}

/**
 * Interfaz ConfiguracionItem
 * Descripción: Representa la configuración de un elemento de mercancía.
 */
export interface ConfiguracionItem {
  /**
   * Propiedad id
   * Descripción: Identificador único del elemento.
   */
  id: number;

  /**
   * Propiedad marca
   * Descripción: Marca del equipo.
   */
  marca: string;

  /**
   * Propiedad modelo
   * Descripción: Modelo del equipo.
   */
  modelo: string;

  /**
   * Propiedad serie
   * Descripción: Número de serie del equipo.
   */
  serie: string;

  /**
   * Propiedad voltaje
   * Descripción: Voltaje máximo del tubo de rayos X.
   */
  voltaje: string;

  /**
   * Propiedad unidadMedidaVoltaje
   * Descripción: Unidad de medida del voltaje.
   */
  unidadMedidaVoltaje: string;

  /**
   * Propiedad corriente
   * Descripción: Corriente máxima del tubo de rayos X.
   */
  corriente: string;

  /**
   * Propiedad unidadMedidaCorriente
   * Descripción: Unidad de medida de la corriente.
   */
  unidadMedidaCorriente: string;

  /**
   * Propiedad numEquipos
   * Descripción: Número de equipos.
   */
  numEquipos: string;

  /**
   * Propiedad fraccionArancelaria
   * Descripción: Fracción arancelaria asociada al equipo.
   */
  fraccionArancelaria: string;

  /**
   * Propiedad fraccionDescripcion
   * Descripción: Descripción de la fracción arancelaria.
   */
  fraccionDescripcion: string;
}

/**
 * Constante SERIE_TABLA_CONFIGURACION
 * Descripción: Configuración de la tabla para los elementos de serie.
 */
export const SERIE_TABLA_CONFIGURACION = [
  {
    /**
     * Propiedad encabezado
     * Descripción: Título de la columna en la tabla.
     */
    encabezado: 'Serie',

    /**
     * Propiedad clave
     * Descripción: Función que devuelve el valor de la clave para un elemento de serie.
     */
    clave: (item: SerieConfiguracionItem): string => item.serie,

    /**
     * Propiedad orden
     * Descripción: Orden de la columna en la tabla.
     */
    orden: 1,
  },
];

/**
 * Constante TABLA_CONFIGURACION
 * Descripción: Configuración de la tabla para los elementos de mercancía.
 */
export const TABLA_CONFIGURACION = [
  {
    encabezado: 'Marca',
    clave: (item: ConfiguracionItem): string => item.marca,
    orden: 1,
  },
  {
    encabezado: 'Modelo',
    clave: (item: ConfiguracionItem): string => item.modelo,
    orden: 2,
  },
  {
    encabezado: 'Número de serie',
    clave: (item: ConfiguracionItem): string => item.serie,
    orden: 3,
  },
  {
    encabezado: 'Voltaje máximo del tubo de R-X',
    clave: (item: ConfiguracionItem): string => item.voltaje,
    orden: 4,
  },
  {
    encabezado: 'Unidad de voltaje',
    clave: (item: ConfiguracionItem): string => item.unidadMedidaVoltaje,
    orden: 5,
  },
  {
    encabezado: 'Corriente máxima del tubo de R-X',
    clave: (item: ConfiguracionItem): string => item.corriente,
    orden: 6,
  },
  {
    encabezado: 'Unidad de corriente',
    clave: (item: ConfiguracionItem): string => item.unidadMedidaCorriente,
    orden: 7,
  },
  {
    encabezado: 'Número de equipos',
    clave: (item: ConfiguracionItem): string => item.numEquipos,
    orden: 8,
  },
  {
    encabezado: 'Fracción arancelaria',
    clave: (item: ConfiguracionItem): string => item.fraccionArancelaria,
    orden: 9,
  },
  {
    encabezado: 'Descripción de la fracción arancelaria',
    clave: (item: ConfiguracionItem): string => item.fraccionDescripcion,
    orden: 10,
  },
];