
import { SubfabricanteDireccionModelo } from "../modelos/subfabricante.model";
/**
 * Configuración de la tabla para mostrar información de subfabricantes.
 * @export
 * @const {Array<Object>} SUBFABRICANTE_TABLA_CONFIGURACION
 */
export const SUBFABRICANTE_TABLA_CONFIGURACION = [
  {
    /**
     * Título de la columna que se muestra en la tabla.
     * @property {string} encabezado
     */
    encabezado: 'Calle',

    /**
     * Función que toma un objeto de tipo `SubfabricanteDireccionModelo` y devuelve el valor correspondiente para la columna.
     * @property {(ele: SubfabricanteDireccionModelo) => string} clave
     */
    clave: (ele: SubfabricanteDireccionModelo):string => ele.calle,

    /**
     * Posición de la columna en la tabla.
     * @property {number} orden
     */
    orden: 1,
  },
  {
    encabezado: 'Num.exterior',
    clave: (ele: SubfabricanteDireccionModelo):number => ele.numExterior,
    orden: 2,
  },
  {
    encabezado: 'Num.interior',
    clave: (ele: SubfabricanteDireccionModelo):number => ele.numInterior,
    orden: 3,
  },
  {
    encabezado: 'Código postal',
    clave: (ele: SubfabricanteDireccionModelo):number=> ele.codigoPostal,
    orden: 4,
  },
  {
    encabezado: 'Colonia',
    clave: (ele: SubfabricanteDireccionModelo):string => ele.colonia,
    orden: 5,
  },
];