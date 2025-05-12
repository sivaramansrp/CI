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

/**
 * @constant
 * @description Lista de claves que representan los datos específicos relacionados con materiales peligrosos.
 * Cada clave en esta lista corresponde a un atributo que debe ser proporcionado o manejado
 * en el contexto de la aplicación para tramitar información sobre materiales peligrosos.
 * 
 * Claves incluidas:
 * - `nombreComun`: Nombre común del material.
 * - `nombreComercial`: Nombre comercial del material.
 * - `estadoFisico`: Estado físico del material (sólido, líquido, gas, etc.).
 * - `cantidad`: Cantidad del material.
 * - `unidadMedida`: Unidad de medida utilizada para la cantidad.
 * - `licenciaSanitaria`: Información sobre la licencia sanitaria asociada.
 * - `usoEspecifico`: Uso específico del material.
 * - `fechaExportacion`: Fecha de exportación del material.
 * - `modoCantidad`: Modo en que se mide o calcula la cantidad.
 */
export const DATOS_ESPECIFICOS_VALIDO_CONTROL = [
  'nombreComun',
  'nombreComercial',
  'estadoFisico',
  'cantidad',
  'unidadMedida',
  'licenciaSanitaria',
  'usoEspecifico',
  'fechaExportacion',
  'modoCantidad'
];

/**
 * Lista de claves válidas para el control de información general.
 * 
 * Esta constante define las propiedades que son consideradas válidas 
 * para el control de información general en el contexto de materiales peligrosos.
 * 
 * @const INFO_GENERAL_VALIDO_CONTROL
 * @type {string[]}
 */
export const INFO_GENERAL_VALIDO_CONTROL = [
  'fraccionArancelaria',
  'numeroCas',
  ];

  /**
   * @constant OPCIONES_DE_BOTON_DE_RADIO
   * 
   * @description
   * Contiene las opciones para un botón de radio, representadas como un arreglo de objetos.
   * Cada objeto incluye una etiqueta (`label`) y un valor (`value`).
   * 
   * @comando
   * Utilizar esta constante para inicializar o configurar componentes de botones de radio
   * en la interfaz de usuario.
   */
  export const OPCIONES_DE_BOTON_DE_RADIO = [
    {
      label: 'Fisica',
      value: 'Fisica',
    },
    {
      label: 'Moral',
      value: 'Moral',
    }
  ];
export const OPCIONES_DE_BOTON_DE_RADIO_CONTENEDOR = [
  {
    label: 'Numérico',
    value: 'Numérico',
  },
  {
    label: 'Rangos',
    value: 'Rangos',
  }
]