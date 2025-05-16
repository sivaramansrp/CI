/**
 * Modelo de datos que representa los pasos del proceso de exportación de armas y explosivos.
 * Este modelo se utiliza para definir la estructura de cada paso en el flujo del trámite.
 * 
 * @export
 * @interface ListaPasosWizard
 * 
 * @property {number} indice - Posición del paso en el proceso, comenzando desde 1.
 * @property {string} titulo - Título descriptivo del paso, que indica su propósito dentro del trámite.
 * @property {boolean} activo - Indica si el paso está activo actualmente en el flujo del trámite.
 * @property {boolean} completado - Indica si el paso ha sido completado por el usuario.
 */
export interface ListaPasosWizard {
  indice: number;
  titulo: string;
  activo: boolean;
  completado: boolean;
}

/**
 * Modelo de datos que representa el formulario de solicitud.
 * Este modelo se utiliza para manejar los datos del formulario de solicitud.
 * 
 * @export
 * @interface SolicitudForm
 * 
 * @property {string} descripcionGenerica1 - Descripción genérica 1.
 * @property {string} descripcionGenerica2 - Descripción genérica 2.
 * @property {string} descripcionGenerica3 - Descripción genérica 3.
 * @property {string} capacidadAlmacenamiento - Capacidad de almacenamiento.
 * @property {string} cantidadBienes - Cantidad de bienes.
 */
export interface SolicitudForm {
  descripcionGenerica1: string;
  descripcionGenerica2: string;
  descripcionGenerica3: string;
  capacidadAlmacenamiento: string;
  cantidadBienes: string;
}

/**
 * Modelo de datos que representa el formulario de mercancías.
 * Este modelo se utiliza para manejar los datos relacionados con las mercancías.
 * 
 * @export
 * @interface MercanciaForm
 * 
 * @property {null | number} consecutivo - Número consecutivo de la mercancía.
 * @property {string} descripcion - Descripción de la mercancía.
 * @property {null | number} cantidad - Cantidad de la mercancía.
 * @property {string} unidadMedida - Unidad de medida de la mercancía.
 * @property {null | number} peso - Peso de la mercancía.
 */
export interface MercanciaForm {
  consecutivo: null | number;
  descripcion: string;
  cantidad: null | number;
  unidadMedida: string; 
  peso: null | number;
}

/**
 * Configuración de las columnas de la tabla para el servicio REGIONES.
 * Define las propiedades y formato de las columnas en la tabla de regiones.
 * 
 * @constant
 * @type {Array}
 */
export const HECHOS_SERVICIO = [
  {
    encabezado: 'Consecutivo',
    clave: (ele: HechosInfo): string => ele.TABLA_Columna_1,
    orden: 1
  },
  {
    encabezado: 'Descripción',
    clave: (ele: HechosInfo): string => ele.TABLA_Columna_2,
    orden: 2
  },
  {
    encabezado: 'Candidad',
    clave: (ele: HechosInfo): string => ele.TABLA_Columna_3,
    orden: 3
  },
  {
    encabezado: 'Unidad de medida (Tarifa)',
    clave: (ele: HechosInfo): string => ele.TABLA_Columna_4,
    orden: 4
  },
  {
    encabezado: 'Peso (kg)',
    clave: (ele: HechosInfo): string => ele.TABLA_Columna_5,
    orden: 5
  }
]

/**
 * Interfaz para la información de REGIONES.
 * Representa la estructura de los datos de las regiones en la tabla.
 * 
 * @export
 * @interface HechosInfo
 * 
 * @property {string} TABLA_Columna_1 - Información de la columna 1.
 * @property {string} TABLA_Columna_2 - Información de la columna 2.
 * @property {string} TABLA_Columna_3 - Información de la columna 3.
 * @property {string} TABLA_Columna_4 - Información de la columna 4.
 * @property {string} TABLA_Columna_5 - Información de la columna 5.
 * @property {boolean} estatus - Estado de la región.
 */
export interface HechosInfo {
  TABLA_Columna_1: string;
  TABLA_Columna_2: string;
  TABLA_Columna_3: string;
  TABLA_Columna_4: string;
  TABLA_Columna_5: string;
  estatus: boolean;
}