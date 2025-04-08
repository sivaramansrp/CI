import {
  Mercancia,
} from '../models/configuracion-columna.model';

/**
 * Paso del proceso de captura y firma de solicitud.
 * Define los pasos del proceso en una lista.
 */
export const PASOS = [
  {
    indice: 1, // Índice del paso
    titulo: 'Capturar solicitud', // Título del paso
    activo: true, // Indica si el paso está activo
    completado: true, // Indica si el paso ha sido completado
  },
  {
    indice: 2, // Índice del paso
    titulo: 'Firmar solicitud', // Título del paso
    activo: false, // Indica si el paso está activo
    completado: false, // Indica si el paso ha sido completado
  },
];

/**
 * Enum para representar los tipos de selección en las tablas.
 * Permite especificar si se utilizará un checkbox, un radio, o si no está definido.
 */
export enum TablaSeleccion {
  CHECKBOX = 'CHECKBOX', // Representa la selección con checkbox
  RADIO = 'RADIO', // Representa la selección con radio
  UNDEFINED = 'undefined', // Indica que la selección no está definida
}

/**
 * Configuración para los campos de mercancía.
 * Define los encabezados, claves y el orden para mostrar los datos relacionados con las mercancías.
 */
export const CONFIGURACION_MERCANCIA = [
  {
    encabezado: 'Fracción arancelaria', // Título de la columna
    clave: (ele: Mercancia): string | undefined => ele.fraccionArancelaria, // Función que devuelve la fracción Naladi
    orden: 1, // Orden en que se mostrará la columna
  },
  {
    encabezado: 'Nombre técnico', // Título de la columna
    clave: (ele: Mercancia): string | undefined => ele.nombreTecnico, // Función que devuelve la fracción Naladi SA93
    orden: 2, // Orden en que se mostrará la columna
  },
  {
    encabezado: 'Nombre comercial', // Título de la columna
    clave: (ele: Mercancia): string | undefined => ele.nombreComercial, // Función que devuelve la fracción Naladi SA96
    orden: 3, // Orden en que se mostrará la columna
  },
  {
    encabezado: 'Número de registro de productos', // Título de la columna
    clave: (ele: Mercancia): string | undefined => ele.numeroDeRegistrodeProductos, // Función que devuelve la fracción Naladi SA02
    orden: 4, // Orden en que se mostrará la columna
  },
  {
    encabezado: 'Fecha expedición', // Título de la columna
    clave: (ele: Mercancia): string | undefined => ele.fechaExpedicion, // Función que devuelve el nombre técnico de la mercancía
    orden: 5, // Orden en que se mostrará la columna
  },
  {
    encabezado: 'Fecha vencimiento', // Título de la columna
    clave: (ele: Mercancia): string | undefined => ele.fechaVencimiento, // Función que devuelve el nombre comercial de la mercancía
    orden: 5, // Orden en que se mostrará la columna
  }
];
