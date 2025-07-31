import {
  Mercancia,
} from '../models/configuracion-columna.model';

/**
 * Arreglo constante que define los pasos del proceso para la gestión de permisos.
 * Cada objeto representa un paso específico con su índice, título, y los estados de activo y completado.
 *
 * @property {number} indice - El número de orden del paso dentro del proceso.
 * @property {string} titulo - El nombre descriptivo del paso.
 * @property {boolean} activo - Indica si el paso está actualmente activo para el usuario.
 * @property {boolean} completado - Indica si el paso ya ha sido completado.
 *
 * Ejemplo de uso:
 * - Para mostrar el flujo de pasos en un formulario de solicitud.
 * - Para controlar la navegación entre pasos según el estado de cada uno.
 */
export const PASOS = [
    {
        indice: 1,
        titulo: 'Capturar solicitud',
        activo: true,
        completado: true,
    },
    {
        indice: 2,
        titulo: 'Anexar requisitos',
        activo: false,
        completado: false,
    },
    {
        indice: 3,
        titulo: 'Firmar solicitud',
        activo: false,
        completado: false,
    }
];

/**
 * @enum {TablaSeleccion}
 * @description
 * Enumeración que define los tipos de selección posibles en una tabla. Se utiliza para decidir cómo los usuarios seleccionan filas (checkbox, radio, ninguno).
 *
 * @property {string} CHECKBOX - Representa la selección múltiple con casillas de verificación.
 * @property {string} RADIO - Representa la selección única usando botones de opción.
 * @property {string} UNDEFINED - Indica que no se ha definido ningún tipo de selección.
 *
 * @example
 * if (tipoSeleccion === TablaSeleccion.CHECKBOX) { ... }
 */
export enum TablaSeleccion {
  CHECKBOX = 'CHECKBOX',
  RADIO = 'RADIO',
  UNDEFINED = 'undefined',
}



/**
 * Arreglo de configuración para la visualización de columnas relacionadas con objetos de tipo `Mercancia` en una tabla.
 *
 * Cada objeto dentro del arreglo representa una columna y contiene:
 * - `encabezado`: El título visible de la columna.
 * - `clave`: Función que recibe un objeto `Mercancia` y retorna el valor a mostrar en la columna.
 * - `orden`: La posición de la columna en la tabla.
 *
 * Las columnas configuradas incluyen:
 * - Fracción arancelaria
 * - Nombre técnico
 * - Nombre comercial
 * - Número de registro de productos
 * - Fecha expedición
 * - Fecha vencimiento
 */
export const CONFIGURACION_MERCANCIA = [
  {
    /** Título visible: Fracción arancelaria */
    encabezado: 'Fracción arancelaria',

    /** Función que retorna la fracción arancelaria del objeto `Mercancia` */
    clave: (ele: Mercancia): string | undefined => ele.fraccionArancelaria,

    /** Posición de esta columna en la tabla */
    orden: 1,
  },
  {
    /** Título visible: Nombre técnico */
    encabezado: 'Nombre técnico',
    clave: (ele: Mercancia): string | undefined => ele.nombreTecnico,
    orden: 2,
  },
  {
    /** Título visible: Nombre comercial */
    encabezado: 'Nombre comercial',
    clave: (ele: Mercancia): string | undefined => ele.nombreComercial,
    orden: 3,
  },
  {
    /** Título visible: Número de registro de productos */
    encabezado: 'Número de registro de productos',
    clave: (ele: Mercancia): string | undefined => ele.numeroDeRegistrodeProductos,
    orden: 4,
  },
  {
    /** Título visible: Fecha expedición */
    encabezado: 'Fecha expedición',
    clave: (ele: Mercancia): string | undefined => ele.fechaExpedicion,
    orden: 5,
  },
  {
    /** Título visible: Fecha vencimiento */
    encabezado: 'Fecha vencimiento',
    clave: (ele: Mercancia): string | undefined => ele.fechaVencimiento,
    orden: 6, // ✔️ Corregido para evitar conflicto con la columna anterior.
  }
];
 /**
 * Mensaje informativo sobre las tablas obligatorias.
 */
export const CAPTURA_MERCANCIAS = `
  <p style="text-align: center;">
    Para continuar con el trámite, debes agregar por lo menos una mercancía.
  </p>
`;
export const CONFIGURACION_TABLA_MERCANCIAS = [
  {
    encabezado: 'Fracción arancelaria',
    clave: (item: Mercancia): string => item.fraccionArancelaria,
    orden: 1
  },
  {
    encabezado: 'Cantidad',
    clave: (item: Mercancia): string => item.cantidad || '',
    orden: 2
  },
  {
    encabezado: 'Unidad de medida',
    clave: (item: Mercancia): string => item.umc || '',
    orden: 3
  },
  {
    encabezado: 'Valor mercancía',
    clave: (item: Mercancia): string => item.valorMercancia || '',
    orden: 4
  },
  {
    encabezado: 'Tipo de factura',
    clave: (item: Mercancia): string => item.tipoFactura || '',
    orden: 5
  }
];
