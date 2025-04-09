import { ComposicionMaterial, TablaNumeroCasType } from "../models/materiales-peligrosos.model";

/**
 * Define una constante que representa la lista de pasos para un asistente (wizard).
 * Cada paso incluye su índice, título, estado de actividad y estado de completitud.
 *
 * Índice numérico del paso.
 * Título descriptivo del paso.
 * Indica si el paso está actualmente activo y visible.
 * Indica si el paso ha sido completado.
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
      indice: 4,
      titulo: 'Firmar solicitud',
      activo: false,
      completado: false,
    },
  ];

  /**
* Secciones a mostrar dentro de cada Paso de acuerdo al trámite
*/
export const SECCIONES_TRAMITE_260206 = {
    PASO_1: {
      VALIDACION_SECCION_1: false,
      VALIDACION_SECCION_2: true,
      VALIDACION_SECCION_3: false,
      VALIDACION_SECCION_4: false,
    },
    PASO_2: {
      VALIDACION_SECCION: true,
    },
    PASO_3: {
      requiereValidacion: true,
    },
  };

  /**
   * Representa una tabla de configuración para materiales peligrosos con información específica
   * como el número CAS, descripción no arancelaria, nombre químico y constancia CISEN.
   * 
   * Cada objeto en la tabla contiene las siguientes propiedades:
   * 
   * - `encabezado`: El título de la columna en la tabla.
   * - `clave`: Una función que toma un elemento de tipo `TablaNumeroCasType` y devuelve el valor correspondiente
   *   para esa columna.
   * - `orden`: El orden de la columna en la tabla.
   * 
   * @constant
   * @type {Array<{ encabezado: string; clave: (ele: TablaNumeroCasType) => string; orden: number }>}
   */
  export const NUMERO_CAS_TABLA = [
    {
      encabezado: 'Número CAS',
      clave: (ele: TablaNumeroCasType): string => ele.numeroCas,
      orden: 1,
    },
    {
      encabezado: 'Descripción no arancelaria',
      clave: (ele: TablaNumeroCasType): string => ele.descripcionNoArancelaria,
      orden: 1,
    },
    {
      encabezado: 'Nombre químico/Nomenclatura IUPAC del material',
      clave: (ele: TablaNumeroCasType): string => ele.nombreQuimico,
      orden: 1,
    },
    {
      encabezado: 'Constancia CISEN',
      clave: (ele: TablaNumeroCasType): string => ele.constanciaCisen,
      orden: 1,
    },
  ];

  /**
   * Representa una tabla de configuración para la composición de materiales peligrosos.
   * 
   * Cada objeto en la tabla contiene las siguientes propiedades:
   * 
   * - `encabezado`: El título de la columna en la tabla.
   * - `clave`: Una función que toma un elemento de tipo `ComposicionMaterial` y devuelve el valor correspondiente
   *   para esa columna.
   * - `orden`: El orden de la columna en la tabla.
   * 
   * @constant
   * @type {Array<{ encabezado: string; clave: (ele: ComposicionMaterial) => string; orden: number }>}}
   */
  export const COMPOSICION_TABLA = [
    {
      encabezado: 'Componente del material',
      clave: (ele: ComposicionMaterial): string => ele.componente,
      orden: 1,
    },
    {
      encabezado: 'Porcentaje de concentración',
      clave: (ele: ComposicionMaterial): string => ele.porcentajeConcentracion.toString(),
      orden: 1,
    },
  ];

  /**
 * Constant representing the invoice date field configuration.
 * 
 * @property {string} labelNombre - The label for the invoice date field.
 * @property {boolean} required - Indicates if the invoice date field is required.
 * @property {boolean} habilitado - Indicates if the invoice date field is enabled.
 */
export const FECHA_FACTURA = {
  labelNombre: 'Fecha de la factura',
  required: false,
  habilitado: true,
};