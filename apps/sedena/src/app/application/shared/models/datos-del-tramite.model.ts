import { ConfiguracionColumna } from '@ng-mf/data-access-user';
/**
 * Interfaz que representa el estado del formulario de datos del trámite.
 *
 * @property {string} permisoGeneral - Permiso general seleccionado por el usuario.
 * @property {string} usoFinal - Uso final declarado en el formulario.
 * @property {string[]} aduanasSeleccionadas - Lista de aduanas seleccionadas.
 * @property {string} paisDestino - País de destino de la mercancía.
 */
export interface DatosDelTramiteFormState {
  permisoGeneral: string;
  usoFinal: string;
  aduanasSeleccionadas: string[];
  paisDestino: string;
}

/**
 * Interfaz que representa los datos capturados para una mercancía.
 *
 * @property {string} fraccionArancelaria - Clave de la fracción arancelaria.
 * @property {string} descripcionFraccion - Descripción de la fracción arancelaria.
 * @property {string} unidadMedidaTarifa - Unidad de medida de tarifa (UMT).
 * @property {string} umc - Unidad de medida comercial.
 * @property {number} cantidadUMT - Cantidad en unidad de medida de tarifa.
 * @property {number} valorComercial - Valor comercial total de la mercancía.
 * @property {string} tipoMoneda - Tipo de moneda utilizada.
 * @property {string} descripcion - Descripción general del producto.
 * @property {string} paisOrigen - País de origen de la mercancía.
 */
export interface MercanciaDetalle {
  fraccionArancelaria: string;
  descripcionFraccion: string;
  unidadMedidaTarifa: string;
  umc: string;
  cantidadUMT: number;
  valorComercial: number;
  tipoMoneda: string;
  descripcion: string;
  paisOrigen: string;
}

/**
 * Constante que define la configuración de columnas para la tabla dinámica de mercancías.
 *
 * @constant
 * @type {ConfiguracionColumna<MercanciaDetalle>[]}
 */
export const MERCANCIA_ENCABEZADO_DE_TABLA: ConfiguracionColumna<MercanciaDetalle>[] =
  [
    {
      encabezado: 'Fracción arancelaria',
      clave: (fila) => fila.fraccionArancelaria,
      orden: 1,
    },
    {
      encabezado: 'Descripción de la fracción',
      clave: (fila) => fila.descripcionFraccion,
      orden: 2,
    },
    {
      encabezado: 'Unidad de medida de tarifa (UMT)',
      clave: (fila) => fila.unidadMedidaTarifa,
      orden: 3,
    },
    {
      encabezado: 'UMC',
      clave: (fila) => fila.umc,
      orden: 4,
    },
    {
      encabezado: 'Cantidad en UMT',
      clave: (fila) => fila.cantidadUMT,
      orden: 5,
    },
    {
      encabezado: 'Valor comercial',
      clave: (fila) => fila.valorComercial,
      orden: 6,
    },
    {
      encabezado: 'Tipo moneda',
      clave: (fila) => fila.tipoMoneda,
      orden: 7,
    },
    {
      encabezado: 'Descripción',
      clave: (fila) => fila.descripcion,
      orden: 8,
    },
    {
      encabezado: 'País de origen',
      clave: (fila) => fila.paisOrigen,
      orden: 9,
    },
  ];
