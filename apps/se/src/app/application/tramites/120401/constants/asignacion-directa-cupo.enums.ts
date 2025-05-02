import {
    SeleccionDelCupoTabla
} from '../models/asignacion-directa-cupo.model';



export const CONFIGURACION_CUPOS_DISPONIBLES_TABLA = [
  /**
 * Configuración de la tabla de cupos disponibles utilizada en la aplicación.
 * 
 * Este arreglo define las columnas de la tabla, incluyendo encabezados, claves de acceso
 * a los datos y el orden en que se deben mostrar. Cada columna está representada por un objeto
 * que contiene las siguientes propiedades:
 * 
 * - `encabezado`: El título de la columna que se mostrará en la tabla.
 * - `clave`: Una función que toma un elemento de tipo `SeleccionDelCupoTabla` y devuelve
 *   el valor correspondiente a mostrar en la columna. Puede devolver un `string` o `undefined`.
 * - `orden`: Un número que indica la posición de la columna en la tabla.
 * 
 * Propósito:
 * Esta configuración permite personalizar la estructura y el contenido de la tabla de cupos
 * disponibles, facilitando la visualización de datos relevantes como el nombre del producto,
 * subproducto, mecanismo de asignación, fracciones arancelarias y tipo de cupo.
 */
  {
    encabezado: 'Nombre de producto',
    clave: (ele: SeleccionDelCupoTabla) : string | undefined => ele.nombreProducto,
    orden: 1,
  },
  {
    encabezado: 'Nombre del subproducto',
    clave: (ele: SeleccionDelCupoTabla) : string | undefined => ele.nombreSubproducto,
    orden: 2,
  },
  {
    encabezado: 'Mecanismo de asignacións',
    clave: (ele: SeleccionDelCupoTabla) : string | undefined => ele.mecanismoAsignacion,
    orden: 3,
  },
  {
    encabezado: 'Fracciones arancelarias',
    clave: (ele: SeleccionDelCupoTabla): string | undefined => ele.fraccionesArancelarias,
    orden: 4,
  },
  {
    encabezado: 'Tipo cupos',
    clave: (ele: SeleccionDelCupoTabla): string | undefined => ele.tipoCupo,
    orden: 4,
  },
];
