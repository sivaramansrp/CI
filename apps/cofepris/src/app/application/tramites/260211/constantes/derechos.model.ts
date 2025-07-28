/* *
 * @constant
 * @type {object}
 * @property {string} labelNombre - Etiqueta que se mostrará para el campo.
 * @property {boolean} required - Indica si el campo es obligatorio (true) o no (false).
 * @property {boolean} habilitado - Indica si el campo está habilitado (true) o deshabilitado (false).
 *
*/
export const FECHA_DE_PAGO = {
  labelNombre: 'Fecha de pago',
  required: false,
  habilitado: true,
};
/**
 * Lista de bancos disponibles para selección.
 * Contiene identificador y descripción de cada banco.
 * Utilizado para formularios o catálogos desplegables.
 */
export const BANCOS_DATA = [
  {
    id: 1,
    descripcion: "Banco de Comercio"
  },
  {
    id: 2,
    descripcion: "Banco de Desarrollo"
  },
  {
    id: 3,
    descripcion: "Banco de Inversión"
  },
  {
    id: 4,
    descripcion: "Banco de Ahorro"
  },
  {
    id: 5,
    descripcion: "Banco de Crédito"
  }
];
