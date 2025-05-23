import {
  ConfiguracionColumna,
  TipoPersona,
} from '@ng-mf/data-access-user';
import { Otros, TipoPersonaModel } from '../models/exporticon-estupefacientes.model';
import { Destinatario } from '../../../shared/models/terceros-relacionados.model';
import { TablaMercanciasDatos } from '../../../shared/models/datos-solicitud.model';

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
export const TITULOMENSAJE = 'Solicitud Exportación de Materias Primas que sean o contengan Estupefacientes o Psicotrópicos';


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
export const ID_PROCEDIMIENTO = 260302;

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
      encabezado: 'Entidad Federativa',
      clave: (fila) => fila.entidadFederativa,
      orden: 13,
    },
    {
      encabezado: 'Estado/Localidad',
      clave: (fila) => fila.localidad,
      orden: 14,
    },
    {
      encabezado: 'Código Postal',
      clave: (fila) => fila.codigoPostal,
      orden: 15,
    },
  ];

  /**
 * @const OTROS_ENCABEZADO_DE_TABLA
 * @description Columnas configuradas para mostrar los datos del otros en una tabla.
 */
export const OTROS_ENCABEZADO_DE_TABLA: ConfiguracionColumna<Otros>[] =
[
  {
    encabezado: 'Tercero nombre descripcion',
    clave: (fila) => fila.nombreDescripcion,
    orden: 1,
  },
  {
    encabezado: 'Nombre/Denominación o Razón Social',
    clave: (fila) => fila.nombreRazonSocial,
    orden: 2,
  },
  { encabezado: 'R.F.C.', clave: (fila) => fila.rfc, orden: 3 },
  { encabezado: 'CURP', clave: (fila) => fila.curp, orden: 4 },
  { encabezado: 'Teléfono', clave: (fila) => fila.telefono, orden: 5 },
  {
    encabezado: 'Correo Electrónico',
    clave: (fila) => fila.correoElectronico,
    orden: 6,
  },
  { encabezado: 'Calle', clave: (fila) => fila.calle, orden: 7 },
  {
    encabezado: 'Número Exterior',
    clave: (fila) => fila.numeroExterior,
    orden: 8,
  },
  {
    encabezado: 'Número Interior',
    clave: (fila) => fila.numeroInterior,
    orden: 9,
  },
  { encabezado: 'País', clave: (fila) => fila.pais, orden: 10 },
  { encabezado: 'Colonia', clave: (fila) => fila.colonia, orden: 11 },
  {
    encabezado: 'Municipio o Alcaldía',
    clave: (fila) => fila.municipioAlcaldia,
    orden: 12,
  },
  { encabezado: 'Localidad', clave: (fila) => fila.localidad, orden: 13 },
  {
    encabezado: 'Entidad Federativa',
    clave: (fila) => fila.entidadFederativa,
    orden: 14,
  },
  {
    encabezado: 'Estado/Localidad',
    clave: (fila) => fila.localidad,
    orden: 15,
  },
  {
    encabezado: 'Código Postal',
    clave: (fila) => fila.codigoPostal,
    orden: 16,
  },
];

/**
 * @enum TIPO_TABLA_DATOS
 * @description Tipos de tablas de datos disponibles en la aplicación.
 * Se utiliza para identificar el tipo de tabla que se está utilizando.
 */
export enum TIPO_TABLA_DATOS {
  DESTINATARIO = 'Destinatario (Destino final)',
  OTROS = 'Otros',
}
export const PRODUCTO_TABLA_ESTUPEFACIENTES_EXPORTICON = [
  {
    encabezado: 'Clasificación del producto',
    clave: (ele: TablaMercanciasDatos): string => ele.clasificacionProducto, // Reemplaza 'ele.clasificacionProducto' con la clave correcta
    orden: 1,
  },
  {
    encabezado: 'Especificar clasificación del producto',
    clave: (ele: TablaMercanciasDatos): string =>
      ele.especificarClasificacionProducto, // Reemplaza 'ele.especificarClasificacionProducto' con la clave correcta
    orden: 2,
  },
  {
    encabezado: 'Denominación común internacional',
    clave: (ele: TablaMercanciasDatos): string | undefined =>
      ele.denominacionCumonInternacional, // Reemplaza 'ele.denominacionEspecificaProducto' con la clave correcta
    orden: 3,
  },
  {
    encabezado: 'Marca comercial o denominación distintiva',
    clave: (ele: TablaMercanciasDatos): string | undefined =>
      ele.marcaComercialDenominacion, // Reemplaza 'ele.denominacionEspecificaProducto' con la clave correcta
    orden: 4,
  },
  {
    encabezado: 'Número CAS',
    clave: (ele: TablaMercanciasDatos): string | undefined => ele.numeroCAS, // Reemplaza 'ele.estadoFisico' con la clave correcta
    orden: 5,
  },
  {
    encabezado: 'Fracción arancelaria',
    clave: (ele: TablaMercanciasDatos): string => ele.fraccionArancelaria, // Reemplaza 'ele.fraccionArancelaria' con la clave correcta
    orden: 6,
  },
  {
    encabezado: 'Descripción de la fracción',
    clave: (ele: TablaMercanciasDatos): string | undefined =>
      ele.descripcionFraccion, // Reemplaza 'ele.descripcionFraccion' con la clave correcta
    orden: 7,
  },

  {
    encabezado: 'Cantidad de lotes ',
    clave: (ele: TablaMercanciasDatos): string | undefined =>
      ele.cantidadDeLotes, // Reemplaza 'ele.descripcionFraccion' con la clave correcta
    orden: 8,
  },
  {
    encabezado: 'Presentación',
    clave: (ele: TablaMercanciasDatos): string => ele.presentacion, // Reemplaza 'ele.Presentación' con la clave correcta
    orden: 9,
  },
  {
    encabezado: 'Uso especifico',
    clave: (ele: TablaMercanciasDatos): string => ele.usoEspecifico, // Reemplaza 'ele.usoEspecifico' con la clave correcta
    orden: 10,
  },
  {
    encabezado: 'País de destino',
    clave: (ele: TablaMercanciasDatos): string | undefined => ele.paisDeDestino, // Reemplaza 'ele.paisProcedencia' con la clave correcta
    orden: 11,
  },
  {
    encabezado: 'Forma farmacéutica',
    clave: (ele: TablaMercanciasDatos): string => ele.formaFarmaceutica, // Reemplaza 'ele.formaFarmaceutica' con la clave correcta
    orden: 12,
  },
  {
    encabezado: 'Estado físico',
    clave: (ele: TablaMercanciasDatos): string => ele.estadoFisico, // Reemplaza 'ele.estadoFisico' con la clave correcta
    orden: 13,
  },
  {
    encabezado: 'Unidad de medida de tarifa (UMT)',
    clave: (ele: TablaMercanciasDatos): string => ele.unidadMedidaTarifa, // Reemplaza 'ele.unidadMedidaTarifa' con la clave correcta
    orden: 14,
  },
  {
    encabezado: 'Cantidad UMT',
    clave: (ele: TablaMercanciasDatos): string => ele.cantidadUMT, // Reemplaza 'ele.cantidadUMT' con la clave correcta
    orden: 15,
  },
  {
    encabezado: 'UMC',
    clave: (ele: TablaMercanciasDatos): string | undefined =>
      ele.unidadMedidaComercializacion, // Reemplaza 'ele.unidadMedidaTarifa' con la clave correcta
    orden: 16,
  },
  {
    encabezado: 'Cantidad UMC',
    clave: (ele: TablaMercanciasDatos): string => ele.cantidadUMC, // Reemplaza 'ele.cantidadUMT' con la clave correcta
    orden: 17,
  },
  {
    encabezado: 'Tipo producto',
    clave: (ele: TablaMercanciasDatos): string => ele.tipoProducto, // Reemplaza 'ele.tipoProducto' con la clave correcta
    orden: 18,
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
  { label: 'Extranjero', value: 'false'},
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
export const TERCEROS_PERSONA_RADIO_OPCIONS : TipoPersonaModel[]= [
  { label: 'Física', value: TipoPersona.FISICA ,hint:'Física'},
  { label: 'Moral', value: TipoPersona.MORAL,hint:'Moral' }
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
  'colonia',
  'localidad',
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
  'calleYNumero',
  'correoElectronico',
  'rfcSanitario',
  'regimenLaMercancia',
  'aduana',
]
