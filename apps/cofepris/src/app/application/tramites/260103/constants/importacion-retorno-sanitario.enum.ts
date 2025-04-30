import {
  ConfiguracionColumna,
  TipoPersona,
} from '@ng-mf/data-access-user';
import { Destinatario, Fabricante } from '../../../shared/models/terceros-relacionados.model';
import { TablaMercanciasImportacion } from '../models/importicon-retorno.model';


/**
 * @const PASOS
 * @description Pasos configurados para guiar al usuario en el proceso de solicitud.
 * Cada paso incluye un índice, un título descriptivo, y estados de actividad y completitud.
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
  },
];

/**
 * @const MENSAJE_TABLA_OBLIGATORIA
 * @description Mensaje que indica que la tabla es obligatoria.
 */
export const TITULOMENSAJE = 'Permiso sanitario previo de importación por retorno de productos';


/**
 * @const {string} TEXTOS_REQUISITOS
 * @description La constante `TEXTOS_REQUISITOS` contiene un mensaje informativo que se muestra al usuario
 * cuando una solicitud ha sido registrada con un número temporal. Este número no tiene validez legal y 
 * solo sirve para identificar la solicitud. Un folio oficial será asignado cuando la solicitud sea firmada.
 * 
 * @usage Utilizado en el proceso de registro de solicitudes para informar al usuario sobre el estado temporal
 * de su solicitud.
 */
export const TEXTOS_REQUISITOS =
  'La solicitud ha quedado registrada con el número temporal [202767640]. Este no tiene validez legal y sirve solamente para efectos de identificar tu Solicitud. Un folio oficial le será asignado a la solicitud al momento en que esta sea firmada.';


/**
 * @const ID_PROCEDIMIENTO
 * @description Identificador único del procedimiento para el trámite 260302.
 * @type {number}
 */
export const ID_PROCEDIMIENTO = 260103;

/**
 * @const DESTINATARIO_ENCABEZADO_DE_TABLA
 * @description Columnas configuradas para mostrar los datos del fabricante en una tabla.
 */
export const DESTINATARIO_ENCABEZADO_DE_TABLA: ConfiguracionColumna<Destinatario>[] =
  [
    {
      encabezado: 'Nombre/Denominación o Razón Social',
      clave: (fila) => fila.nombreRazonSocial,
      orden: 1,
    },
    { encabezado: 'R.F.C.', clave: (fila) => fila.rfc, orden: 2 },
    { encabezado: 'CURP', clave: (fila) => fila.curp, orden: 3 },
    { encabezado: 'Teléfono', clave: (fila) => fila.telefono, orden: 4 },
    {
      encabezado: 'Correo Electrónico',
      clave: (fila) => fila.correoElectronico,
      orden: 5,
    },
    { encabezado: 'Calle', clave: (fila) => fila.calle, orden: 6 },
    {
      encabezado: 'Número Exterior',
      clave: (fila) => fila.numeroExterior,
      orden: 7,
    },
    {
      encabezado: 'Número Interior',
      clave: (fila) => fila.numeroInterior,
      orden: 8,
    },
    { encabezado: 'País', clave: (fila) => fila.pais, orden: 9 },
    { encabezado: 'Colonia', clave: (fila) => fila.colonia, orden: 10 },
    {
      encabezado: 'Municipio o Alcaldía',
      clave: (fila) => fila.municipioAlcaldia,
      orden: 11,
    },
    { encabezado: 'Localidad', clave: (fila) => fila.localidad, orden: 12 },
    {
      encabezado: 'Estado/Localidad',
      clave: (fila) => fila.localidad,
      orden: 13,
    },
    {
      encabezado: 'Código Postal',
      clave: (fila) => fila.codigoPostal,
      orden: 14,
    },
  ];

  /**
 * @const FABRICANTE_ENCABEZADO_DE_TABLA
 * @description Columnas configuradas para mostrar los datos del Fabricante en una tabla.
 */
export const FABRICANTE_ENCABEZADO_DE_TABLA: ConfiguracionColumna<Fabricante>[] =
[

  {
    encabezado: 'Nombre/Denominación o Razón Social',
    clave: (fila) => fila.nombreRazonSocial,
    orden: 1,
  },
  { encabezado: 'R.F.C.', clave: (fila) => fila.rfc, orden: 2 },
  { encabezado: 'CURP', clave: (fila) => fila.curp, orden: 3 },
  { encabezado: 'Teléfono', clave: (fila) => fila.telefono, orden: 4 },
  {
    encabezado: 'Correo Electrónico',
    clave: (fila) => fila.correoElectronico,
    orden: 5,
  },
  { encabezado: 'Calle', clave: (fila) => fila.calle, orden: 6 },
  {
    encabezado: 'Número Exterior',
    clave: (fila) => fila.numeroExterior,
    orden: 7,
  },
  {
    encabezado: 'Número Interior',
    clave: (fila) => fila.numeroInterior,
    orden: 8,
  },
  { encabezado: 'País', clave: (fila) => fila.pais, orden: 9 },
  { encabezado: 'Colonia', clave: (fila) => fila.colonia, orden: 10 },
  {
    encabezado: 'Municipio o Alcaldía',
    clave: (fila) => fila.municipioAlcaldia,
    orden: 11,
  },
  { encabezado: 'Localidad', clave: (fila) => fila.localidad, orden: 12 },
  {
    encabezado: 'Estado/Localidad',
    clave: (fila) => fila.localidad,
    orden: 13,
  },
  {
    encabezado: 'Código Postal',
    clave: (fila) => fila.codigoPostal,
    orden: 14,
  },
];

/**
 * @enum TIPO_TABLA_DATOS
 * @description Tipos de tablas de datos disponibles en la aplicación.
 * Se utiliza para identificar el tipo de tabla que se está utilizando.
 */
export enum TIPO_TABLA_DATOS {
  DESTINATARIO = 'Destinatario(Destino final)',
  Fabricante = 'Fabricante',
}
export const PRODUCTO_TABLA_IMPORTACION = [
  {
    encabezado: 'Clasificación del producto',
    clave: (ele: TablaMercanciasImportacion): string => ele.clasificacionProducto, // Reemplaza 'ele.clasificacionProducto' con la clave correcta
    orden: 1,
  },
  {
    encabezado: 'Especificar clasificación del producto',
    clave: (ele: TablaMercanciasImportacion): string =>
      ele.especificarClasificacionProducto, // Reemplaza 'ele.especificarClasificacionProducto' con la clave correcta
    orden: 2,
  },
  {
    encabezado: 'Denominación específica del producto',
    clave: (ele: TablaMercanciasImportacion): string | undefined =>
      ele.denominacionEspecificaProducto, // Reemplaza 'ele.denominacionEspecificaProducto' con la clave correcta
    orden: 3,
  },
  {
    encabezado: 'Marca',
    clave: (ele: TablaMercanciasImportacion): string | undefined =>
      ele.marca, // Reemplaza 'ele.denominacionEspecificaProducto' con la clave correcta
    orden: 4,
  },
  {
    encabezado: 'Fracción arancelaria',
    clave: (ele: TablaMercanciasImportacion): string => ele.fraccionArancelaria, // Reemplaza 'ele.fraccionArancelaria' con la clave correcta
    orden: 5,
  },
  {
    encabezado: 'Descripción de la fracción',
    clave: (ele: TablaMercanciasImportacion): string | undefined =>
      ele.descripcionFraccion, // Reemplaza 'ele.descripcionFraccion' con la clave correcta
    orden: 6,
  },
  {
    encabezado: 'Unidad de medida de tarifa (UMT)',
    clave: (ele: TablaMercanciasImportacion): string | undefined => ele.unidadMedidaTarifa, // Reemplaza 'ele.unidadMedidaTarifa' con la clave correcta
    orden: 7,
  },
  {
    encabezado: 'Cantidad UMT',
    clave: (ele: TablaMercanciasImportacion): string => ele.cantidadUMT, // Reemplaza 'ele.cantidadUMT' con la clave correcta
    orden: 8,
  },
  {
    encabezado: 'Unidad de medida de comercialización (UMC)',
    clave: (ele: TablaMercanciasImportacion): string | undefined =>
      ele.unidadMedidaComercializacion,
    orden: 9,
  },
  {
    encabezado: 'Cantidad UMC',
    clave: (ele: TablaMercanciasImportacion): string => ele.cantidadUMC, // Reemplaza 'ele.cantidadUMT' con la clave correcta
    orden: 10,
  },
  {
    encabezado: 'Pais de origen',
    clave: (ele: TablaMercanciasImportacion): string => ele.paisOrigen, // Reemplaza 'ele.cantidadUMT' con la clave correcta
    orden: 11,
  },
  {
    encabezado: 'Pais de procedencia',
    clave: (ele: TablaMercanciasImportacion): string => ele.paisProcedencia, // Reemplaza 'ele.cantidadUMT' con la clave correcta
    orden: 12,
  },
  {
    encabezado: 'Tipo producto',
    clave: (ele: TablaMercanciasImportacion): string => ele.tipoProducto, // Reemplaza 'ele.tipoProducto' con la clave correcta
    orden: 13,
  },
  {
    encabezado: 'Uso especifico',
    clave: (ele: TablaMercanciasImportacion): string => ele.usoEspecifico, // Reemplaza 'ele.usoEspecifico' con la clave correcta
    orden: 14,
  },
];

/**
 * @const TERCEROS_NACIONALIDAD_RADIO_OPCIONS
 * @description Opciones para el radio de nacionalidad de terceros.
 * Contiene dos opciones: "Nacional" y "Extranjero".
 * 
 * @property {string} label - Etiqueta que describe la opción.
 * @property {string} value - Valor asociado a la opción. 
 * "true" para Nacional y "false" para Extranjero.
 */
export const TERCEROS_NACIONALIDAD_RADIO_OPCIONS = [
  { label: 'Nacional', value: 'true' },
  { label: 'Extranjero', value: 'false' },
];


/**
 * @const TERCEROS_PERSONA_RADIO_OPCIONS
 * @description Opciones de selección para el tipo de persona (Física o Moral) en un formulario.
 * @type {Array<{ label: string, value: TipoPersona }>}
 * 
 * @property {string} label - Etiqueta que describe el tipo de persona.
 * @property {TipoPersona} value - Valor asociado al tipo de persona, basado en la enumeración `TipoPersona`.
 * 
 * @usage
 * Este arreglo se utiliza para renderizar opciones de radio button en la interfaz de usuario,
 * permitiendo al usuario seleccionar entre una persona física o moral.
 */
export const TERCEROS_PERSONA_RADIO_OPCIONS = [
  { label: 'Física', value: TipoPersona.FISICA },
  { label: 'Moral', value: TipoPersona.MORAL }
];

/**
 * @const ELEMENTOS_REQUERIDOS
 * @description Lista de elementos requeridos para el trámite 260302.
 * @type {string[]}
 * @memberof exporticon-estupefacientes.enum
 * @usage Utilizado para validar los campos obligatorios en el formulario del trámite.
 * @example
 * ELEMENTOS_REQUERIDOS.includes('colonia'); // true
 */
export const ELEMENTOS_REQUERIDOS=[
  'denominacionRazon',
  'scian',
  'correoElectronico',
]

/**
 * @const ELEMENTOS_ANADIDOS
 * @description Constante que define una lista de elementos adicionales utilizados en el trámite 260302.
 * Contiene los nombres de las propiedades relacionadas con información sanitaria y aduanera.
 * 
 * @type {string[]}
 * @example
 */
export const ELEMENTOS_ANADIDOS=[
  'regimenLaMercancia',
  'domicilio-aduana',
]
