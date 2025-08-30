
/**
 * Representa la información complementaria de un certificado técnico japonés.
 *
 * @property {number} id - Identificador único del registro.
 * @property {string} numerodeOrden - Número de orden asociado.
 * @property {string} fraccionArancelaria - Fracción arancelaria del producto.
 * @property {string} nombreTecnico - Nombre técnico del producto.
 * @property {string} nombreComercial - Nombre comercial del producto.
 * @property {string} nombreIngles - Nombre en inglés del producto.
 * @property {string} númerodeRegistro - Número de registro oficial.
 * @property {string} [cantidad] - Cantidad del producto (opcional).
 * @property {string} [fechadelaFactura] - Fecha de la factura (opcional).
 */
export interface CompliMentaria {
  id: number;
  numerodeOrden: string;
  fraccionArancelaria: string;
  nombreTecnico: string;
  nombreComercial: string;
  nombreIngles: string;
  númerodeRegistro: string;
  cantidad?: string;
  fechadelaFactura?: string;
}

/**
 * @constant
 * @name CERTIFICADO_TABLA
 * @description
 * Arreglo de objetos que define la estructura de la tabla para el certificado técnico japonés.
 * Cada objeto representa una columna de la tabla, especificando el encabezado, la clave para obtener el valor de la columna desde un objeto `CompliMentaria`, y el orden de aparición.
 *
 * @property {string} encabezado - Texto que se muestra como encabezado de la columna.
 * @property {(ele: CompliMentaria) => string} clave - Función que recibe un elemento de tipo `CompliMentaria` y retorna el valor correspondiente para la columna.
 * @property {number} orden - Número que indica el orden en el que aparece la columna en la tabla.
 */
export const CERTIFICADO_TABLA = [
  {
    encabezado: 'Número de orden',
    clave: (ele: CompliMentaria): string => ele.numerodeOrden,
    orden: 1
  },
  {
    encabezado: 'Fracción arancelaria*',
    clave: (ele: CompliMentaria): string => ele.fraccionArancelaria,
    orden: 2
  },
  {
    encabezado: 'Nombre técnico',
    clave: (ele: CompliMentaria): string => ele.nombreTecnico,
    orden: 3
  },
  {
    encabezado: 'Nombre comercial',
    clave: (ele: CompliMentaria): string => ele.nombreComercial,
    orden: 4
  },
  {
    encabezado: 'Nombre inglés',
    clave: (ele: CompliMentaria): string => ele.nombreIngles,
    orden: 5
  },
  {
    encabezado: 'Número de registro',
    clave: (ele: CompliMentaria): string => ele.númerodeRegistro,
    orden: 6
  }
]
