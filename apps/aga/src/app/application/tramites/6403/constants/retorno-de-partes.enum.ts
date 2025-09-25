import { SolicitudTabla } from "../models/retorno-de-partes.model";

/**
 * Constante que define los pasos del wizard en el trámite.
 * 
 * Esta constante contiene un array de objetos que representan los pasos del wizard,
 * incluyendo su índice, título, y estado (activo o completado).
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
 * Textos utilizados en el trámite.
 * 
 * Esta constante contiene textos como instrucciones o mensajes que se muestran
 * en la interfaz del usuario.
 */
export const TEXTOS = {
  TIPO_CARGO: ` El archivo no debe exceder los 1000 registros. Para descargar plantilla del archivo de excel de click <span class="">*</span><br />
     <label><a href="javascript:void(0);"> Descargar plantilla</a></label>
        `,
  TERCEROS_TEXTO_DE_ALERTA: 'La solicitud ha quedado registrada con el número temporal 202767903 Éste no tiene validez legal y sirve solamente para efectos de identificar tu solicitud. Un folio oficial le será asignado a la solicitud al momento en que ésta sea firmada.',
  SELECTOR_DESPERDICIO: `
  <input type="checkbox" formControlName="selectorDesperdicio" /><span class="require">*</span>No es posible declarar el porcentaje que representa la mercancia a destruir, de la mercancia importada temporalmente de la que procede
  `
};

/**
 * Fecha de importación temporal.
 * 
 * @property {string} labelNombre - Etiqueta que describe el campo.
 * @property {boolean} required - Indica si el campo es obligatorio.
 * @property {boolean} habilitado - Indica si el campo está habilitado.
 */
export const FECHA_IMPORTACION = {
  labelNombre: 'Fecha de importación temporal',
  required: true,
  habilitado: true,
};

/**
 * Fecha de vencimiento.
 * 
 * @property {string} labelNombre - Etiqueta que describe el campo.
 * @property {boolean} required - Indica si el campo es obligatorio.
 * @property {boolean} habilitado - Indica si el campo está habilitado.
 */
export const FECHA_VENCIMIENTO = {
  labelNombre: 'Fecha de vencimiento',
  required: true,
  habilitado: true,
};

/**
 * Fecha de carta de porte.
 * 
 * @property {string} labelNombre - Etiqueta que describe el campo.
 * @property {boolean} required - Indica si el campo es obligatorio.
 * @property {boolean} habilitado - Indica si el campo está habilitado.
 */
export const FECHA_CARTAPORTE = {
  labelNombre: 'Fecha de carta de porte',
  required: false,
  habilitado: true,
};

/**
 * Constante que define las propiedades de configuración para la fecha de destino.
 * 
 * @property {string} labelNombre - Etiqueta que describe el nombre del campo.
 * @property {boolean} required - Indica si el campo es obligatorio.
 * @property {boolean} habilitado - Indica si el campo está habilitado.
 */
export const FECHA_DESTINO = {
  labelNombre: 'Fecha',
  required: true,
  habilitado: true,
};


/**
   * @property {object} tablaDeDatos
   * @description Configuración de la tabla de datos utilizada en el componente.
   * Contiene las definiciones de las columnas (encabezados) y los datos que se mostrarán en la tabla.
  */
/**
 * Tabla de datos utilizada para mostrar y organizar información de mercancías.
 *
 * Contiene dos propiedades principales:
 * - **encabezadas**: Arreglo que define las columnas de la tabla (títulos, clave y orden).
 * - **datos**: Lista de registros de tipo `SolicitudTabla`.
 */
export const TABLA_DE_DATOS: {
  /**
   * Definición de las columnas que forman el encabezado de la tabla.
   */
  encabezadas: {
    /**
     * Nombre visible de la columna en la tabla.
     */
    encabezado: string;

    /**
     * Función que extrae el valor de la propiedad correspondiente
     * desde un objeto `SolicitudTabla`.
     */
    clave: (ele: SolicitudTabla) => string;

    /**
     * Número que determina el orden de aparición de la columna.
     */
    orden: number;
  }[];

  /**
   * Arreglo de registros de mercancías que se mostrarán en la tabla.
   */
  datos: SolicitudTabla[];
} = {
  encabezadas: [
    /**
     * Columna que muestra la **marca** de la mercancía.
     */
    {
      encabezado: 'Marca',
      clave: (ele: SolicitudTabla) => ele.marca,
      orden: 1,
    },

    /**
     * Columna que muestra el **modelo** de la mercancía.
     */
    {
      encabezado: 'Modelo',
      clave: (ele: SolicitudTabla) => ele.modelo,
      orden: 2,
    },

    /**
     * Columna que muestra el **número de serie** de la mercancía.
     */
    {
      encabezado: 'Número de serie',
      clave: (ele: SolicitudTabla) => ele.numeroDeSerie,
      orden: 3,
    },

    /**
     * Columna que muestra el **tipo** de mercancía.
     */
    {
      encabezado: 'Tipo',
      clave: (ele: SolicitudTabla) => ele.tipo,
      orden: 4,
    },

    /**
     * Columna que muestra la **descripción de la mercancía**.
     */
    {
      encabezado: 'Descripción de la mercancía',
      clave: (ele: SolicitudTabla) => ele.descripcionMercancia,
      orden: 5,
    },
  ],

  /**
   * Inicialmente vacío; contendrá los registros de mercancías.
   */
  datos: [],
};




