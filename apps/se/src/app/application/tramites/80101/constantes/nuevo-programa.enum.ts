import {
  DatosCatalago,
  DatosEmpresaExtranjera,
  Servicio,
  ServicioInmex,
} from '../models/nuevo-programa-industrial.model';

export const PASOS = [
  {
    indice: 1,
    titulo: 'Capturar solicitud',
    activo: true,
    completado: true,
  },
  {
    indice: 2,
    titulo: 'Requisitos necesarios',
    activo: false,
    completado: false,
  },
  {
    indice: 3,
    titulo: 'Firmar solicitud',
    activo: false,
    completado: false,
  },
];
export const TITULOMENSAJE =
  'Registro de solicitud de modificación programa IMMEX (Modificación Alta a domicilio de una planta, bodega o almacén)';
export const TEXTOS_REQUISITOSS =
  'La solicitud ha quedado registrada con el número temporal [202767640]. Este no tiene validez legal y sirve solamente para efectos de identificar tu Solicitud. Un folio oficial le será asignado a la solicitud al momento en que esta sea firmada.';

export const CONFIGURACION_DOMICILIOS = [
  {
    encabezado: 'Servicio',
    clave: (ele: ServicioInmex): string | undefined => ele.Servicio,
    orden: 1,
  },
  {
    encabezado: 'Registro federal de contribuyentes',
    clave: (ele: ServicioInmex): string | undefined =>
      ele.RegistroContribuyentes,
    orden: 2,
  },
  {
    encabezado: 'Denominación o razón socialNúmero Interior',
    clave: (ele: ServicioInmex): string | undefined => ele.DenominaciónSocial,
    orden: 3,
  },
  {
    encabezado: 'Numero del programa IMMEX',
    clave: (ele: ServicioInmex): string | undefined => ele.NumeroIMMEX,
    orden: 4,
  },
  {
    encabezado: 'Año del programa IMMEXad',
    clave: (ele: ServicioInmex): string | undefined => ele.AñoIMMEX,
    orden: 5,
  },
];
export const CONFIGURACION_SERVICIO_IMMEX = [
  {
    encabezado: 'Descripión del servicio',
    clave: (ele: Servicio): string | undefined => ele.descripiónDelServicio,
    orden: 1,
  },
  {
    encabezado: 'Tipo de servicio',
    clave: (ele: Servicio): string | undefined => ele.tipode,
    orden: 2,
  },
];

export const CONFIGURACION_EMPRESA_ECTRANJERA = [
  {
    encabezado: 'Tax ID',
    clave: (ele: DatosEmpresaExtranjera): string | undefined =>
      ele.taxIdEmpresaExt,
    orden: 1,
  },
  {
    encabezado: 'Nombre del empresa',
    clave: (ele: DatosEmpresaExtranjera): string | undefined =>
      ele.nombreEmpresaExt,
    orden: 2,
  },
  {
    encabezado: 'País',
    clave: (ele: DatosEmpresaExtranjera): string | undefined =>
      ele.entidadFederativaEmpresaExt,
    orden: 2,
  },
  {
    encabezado: 'Dirección',
    clave: (ele: DatosEmpresaExtranjera): string | undefined =>
      ele.direccionEmpresaExtranjera,
    orden: 2,
  },
];

/**
 * Constante que define la estructura de datos para el formulario de empresa extranjera.
 * 
 * Contiene un arreglo de objetos que representan los campos necesarios para capturar
 * la información de una empresa extranjera. Cada objeto incluye propiedades como:
 * 
 * - `labelNombre`: Etiqueta que describe el campo.
 * - `campo`: Nombre del campo en el modelo de datos.
 * - `class`: Clases CSS para el diseño del campo.
 * - `tipo_input`: Tipo de entrada del campo (por ejemplo, texto, selección, área de texto).
 * - `required`: Indica si el campo es obligatorio.
 * - `orden`: Orden en el que se muestra el campo en el formulario.
 * - `opciones`: Opciones disponibles para campos de tipo selección (opcional).
 * 
 * Esta constante es utilizada para generar dinámicamente el formulario de captura
 * de datos de una empresa extranjera.
 */
export const FORMA_EMPRESA_ECTRANJERA: DatosCatalago[] = [
  {
    labelNombre: 'Tax ID',
    campo: 'taxIdEmpresaExt',
    class: 'col-md-4 col-sm-10',
    tipo_input: 'text',
    required: true,
    orden: 1,
  },
  {
    labelNombre: 'Nombre del empresa',
    campo: 'nombreEmpresaExt',
    class: 'col-md-4 col-sm-10',
    tipo_input: 'text',
    required: true,
    orden: 2,
  },
  {
    labelNombre: 'País',
    campo: 'entidadFederativaEmpresaExt',
    class: 'col-md-10 col-10',
    tipo_input: 'select',
    required: true,
    opciones: [],
    orden: 3,
  },
  {
    labelNombre: 'Dirección',
    campo: 'direccionEmpresaExtranjera',
    class: 'col-md-10 col-10',
    tipo_input: 'textarea',
    required: true,
    orden: 4,
  },
];


/**
* Secciones a mostrar dentro de cada Paso de acuerdo al trámite
*/
export const SECCIONES_TRAMITE_230401 = {
    PASO_1: {
      VALIDACION_SECCION_1: false,
      VALIDACION_SECCION_2: true,
      VALIDACION_SECCION_3: true,
    },
    PASO_2: {
      VALIDACION_SECCION: true,
    },
    PASO_3: {
      requiereValidacion: true,
    },
  };

/**
 * Contiene los textos utilizados como instrucciones y mensajes para la gestión de requisitos en el programa.
 *
 * @property INSTRUCCIONES - Texto HTML que proporciona instrucciones generales para la gestión de documentos.
 *   - Explica que algunos documentos pueden ser obligatorios dependiendo del caso.
 *   - Indica cómo eliminar documentos no requeridos.
 *   - Describe el proceso para anexar múltiples documentos del mismo tipo.
 *
 * @property ADJUNTAR - Texto HTML que explica cómo adjuntar un nuevo documento.
 *   - Indica la opción a seleccionar para adjuntar un nuevo documento.
 *   - Describe el uso del botón "Adjuntar documentos".
 */
export const TEXTOS_REQUISITOS = {
  INSTRUCCIONES: `<h6>Instrucciones</h6>
    <p>- De acuerdo al caso particular, algunos dcumentos podrían ser obligatorios</p>
    <p>- En caso de que no requieras algún documento, seleccionalo y elíminalo</p>
    <p>- Si necesitas anexar más de un documento del mismo tipo selecciónalo de la lista y presiona "Agregar nuevo".</p>`,
  ADJUNTAR: `<p>Si deseas adjuntar un nuevo documento, selecciona la opción --Adjuntar nuevo documento-- y presiona el botón "Adjuntar dcumentos"</p>`,
};

/**
 * @constant
 * @description Constante que representa un catálogo de datos para complementar fracciones.
 * Contiene un arreglo de objetos con propiedades `id` y `descripcion`.
 * 
 * @type {Array<{ id: number; descripcion: string }>}
 * @example
 * // Ejemplo de uso:
 * console.log(COMPLEMENTAR_FRACCION_CATALOGO_DATOS);
 * // Salida: [{ id: 0, descripcion: '' }]
 */
export const COMPLEMENTAR_FRACCION_CATALOGO_DATOS = [{
  id: 0,
  descripcion: ''
}];

/**
 * @constant
* @description Objeto que representa los datos complementarios de una fracción arancelaria.
 * Contiene información como la fracción arancelaria, anexos, tipo, unidad de medida, categoría,
 * descripción, y valores relacionados con moneda nacional y volumen.
 * 
 * @property {string} fraccionArancelaria - Código de la fracción arancelaria.
 * @property {string} anexoDos - Información adicional del anexo dos.
 * @property {string} tipo - Tipo de fracción o categoría.
 * @property {string} umt - Unidad de medida utilizada.
 * @property {string} catagoria - Categoría a la que pertenece la fracción.
 * @property {string} descripcion - Descripción detallada de la fracción.
 * @property {number} monedaNacionalMensual - Valor mensual en moneda nacional.
 * @property {number} monedaNacionalDeDosPeriodos - Valor acumulado de dos periodos en moneda nacional.
 * @property {number} volumenMensual - Volumen mensual asociado.
 * @property {number} twoPeriodVolume - Volumen acumulado de dos periodos.
 */
export const COMPLEMENTAR_FRACCION_DATOS = {
  fraccionArancelaria: '',
  anexoDos: '',
  tipo: '',
  umt: '',
  catagoria: '',
  descripcion: '',
  monedaNacionalMensual: 0,
  monedaNacionalDeDosPeriodos: 0,
  volumenMensual: 0,
  twoPeriodVolume: 0
}

/**
 * Contiene los datos del proyecto relacionados con el trámite.
 * 
 * @property fraccionArancelaria - Representa la fracción arancelaria del proyecto.
 * @property anexoDos - Indica si el proyecto es sensible o no sensible.
 * @property tipo - Define el tipo de operación, como exportación.
 * @property umt - Unidad de medida utilizada, por ejemplo, kilogramos.
 * @property descripcion - Descripción complementaria del proyecto.
 * @property tipoDeDocumente - Tipo de documento asociado al proyecto.
 * @property fechaDeFirma - Fecha en la que se firmó el documento.
 * @property fechaDeVigencia - Fecha de vigencia del documento.
 * @property rfcTaxId - RFC o Tax ID del contribuyente asociado al proyecto.
 * @property razonSocial - Razón social del contribuyente asociado al proyecto.
 */
export const PROYECTO_DATOS = {
  fraccionArancelaria: '6465469',
  anexoDos: 'NO SENSIBLE',
  tipo: 'EXPORTACCION',
  umt: 'KILOGRAM',
  descripcion: 'TEST COMPLEMENTOR',
  tipoDeDocumente: '',
  fechaDeFirma: '',
  fechaDeVigencia: '',
  rfcTaxId: 0,
  razonSocial: ''
}

/**
 * @constant DOCUMENTO_CATALOGO_DATOS
 * @description Representa un catálogo de documentos con sus respectivos identificadores y descripciones.
 * Contiene una lista de objetos que describen los documentos disponibles.
 * 
 * @property {number} id - Identificador único del documento.
 * @property {string} descripcion - Descripción del documento.
 */
export const DOCUMENTO_CATALOGO_DATOS = [
  {
    id: 0,
    descripcion: 'Cantrado De Maqula'
  }
]