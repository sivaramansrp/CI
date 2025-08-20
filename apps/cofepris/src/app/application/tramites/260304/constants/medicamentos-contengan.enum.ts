import { ConfiguracionColumna, TipoPersona } from '@ng-mf/data-access-user';
import { DetalleMercancíaProductoTerminado, Otros } from '../models/medicamentos-contengan.model';
import { Destinatario } from '../../../shared/models/terceros-relacionados.model';
import { TablaMercanciasDatos } from '../../../shared/models/datos-solicitud.model';

/**
 * @const PASOS
 * @description Pasos del proceso de solicitud, incluyendo su estado de actividad y completado.
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
 * @const TITULO_MENSAJE
 * @description Título del mensaje que describe el propósito de la solicitud.
 */
export const TITULO_MENSAJE =
  'Solicitud Exportación de Medicamentos que sean o contengan Estupefacientes o Psicotrópicos';

/**
 * @const TEXTOS_REQUISITOS
 * @description Mensaje que informa al usuario sobre el número temporal de la solicitud y su validez.
 */  
export const TEXTOS_REQUISITOS =
  'La solicitud ha quedado registrada con el número temporal [202767640]. Este no tiene validez legal y sirve solamente para efectos de identificar tu Solicitud. Un folio oficial le será asignado a la solicitud al momento en que esta sea firmada.';

/**
 * @const ID_PROCEDIMIENTO
 * @description Identificador único del procedimiento.
 */
export const ID_PROCEDIMIENTO = 260304;

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
export const OTROS_ENCABEZADO_DE_TABLA: ConfiguracionColumna<Otros>[] = [
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
 * @description Tipos de tablas de datos disponibles.
 */
export enum TIPO_TABLA_DATOS {
  DESTINATARIO = 'Destinatario(Destino final)',
  OTROS = 'Otros',
}

/**
 * @const PRODUCTO_TABLA_ESTUPEFACIENTES_EXPORTICON
 * @description Configuración de columnas para mostrar los datos de productos estupefacientes en una tabla.
 */
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
    encabezado: 'Denominación común internacional (DCI) o Denominación genérica o nombre científico',
    clave: (ele: TablaMercanciasDatos): string | undefined =>
      ele.denominacionCumonInternacional, // Reemplaza 'ele.denominacionEspecificaProducto' con la clave correcta
    orden: 3,
  },
  {
    encabezado: 'Denominación distintiva',
    clave: (ele: TablaMercanciasDatos): string | undefined =>
      ele.denominacionDistintiva, // Reemplaza 'ele.denominacionEspecificaProducto' con la clave correcta
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
    encabezado: 'Cantidad UMC',
    clave: (ele: TablaMercanciasDatos): string => ele.cantidadUMC, // Reemplaza 'ele.cantidadUMT' con la clave correcta
    orden: 8,
  },
  {
    encabezado: 'Cantidad de lotes ',
    clave: (ele: TablaMercanciasDatos): string | undefined =>
      ele.cantidadDeLotes, // Reemplaza 'ele.descripcionFraccion' con la clave correcta
    orden: 9,
  },
  {
    encabezado: 'Número de registro sanitario',
    clave: (ele: TablaMercanciasDatos): string | undefined => ele.numeroRegistroSanitario,
    orden: 10,
  },
  {
    encabezado: 'Presentación',
    clave: (ele: TablaMercanciasDatos): string => ele.presentacion, // Reemplaza 'ele.Presentación' con la clave correcta
    orden: 11,
  },
  {
    encabezado: 'Uso especifico',
    clave: (ele: TablaMercanciasDatos): string => ele.usoEspecifico, // Reemplaza 'ele.usoEspecifico' con la clave correcta
    orden: 12,
  },
  {
    encabezado: 'Detallar uso específico',
    clave: (ele: TablaMercanciasDatos): string | undefined => ele.detallarUsoEspecifico,
    orden: 13,
  },
  {
    encabezado: 'País de destino',
    clave: (ele: TablaMercanciasDatos): string | undefined => ele.paisDeDestino, // Reemplaza 'ele.paisProcedencia' con la clave correcta
    orden: 14,
  },
  {
    encabezado: 'Forma farmacéutica',
    clave: (ele: TablaMercanciasDatos): string => ele.formaFarmaceutica, // Reemplaza 'ele.formaFarmaceutica' con la clave correcta
    orden: 15,
  },
  {
    encabezado: 'UMC',
    clave: (ele: TablaMercanciasDatos): string | undefined =>
      ele.unidadMedidaComercializacion, // Reemplaza 'ele.unidadMedidaTarifa' con la clave correcta
    orden: 16,
  },
  {
    encabezado: 'Cantidad UMT',
    clave: (ele: TablaMercanciasDatos): string => ele.cantidadUMT, // Reemplaza 'ele.cantidadUMT' con la clave correcta
    orden: 17,
  },
  {
    encabezado: 'Unidad de medida de tarifa (UMT)',
    clave: (ele: TablaMercanciasDatos): string => ele.unidadMedidaTarifa, // Reemplaza 'ele.unidadMedidaTarifa' con la clave correcta
    orden: 18,
  },
  {
    encabezado: 'Tipo de Producto',
    clave: (ele: TablaMercanciasDatos): string => ele.tipoProducto, // Reemplaza 'ele.tipoProducto' con la clave correcta
    orden: 19,
  }
];

/**
 * @const DETALLE_MERCANCIA_PRODUCTO_TERMINADO
 * @description Configuración de columnas para mostrar los detalles de mercancías de productos terminados.
 */
export const DETALLE_MERCANCIA_PRODUCTO_TERMINADO = [
  {
    encabezado: 'Cantidad',
    clave: (ele: DetalleMercancíaProductoTerminado): string => ele.cantidad,
    orden: 1,
  },
  {
    encabezado: 'Presentación',
    clave: (ele: DetalleMercancíaProductoTerminado): string => ele.presentacion,
    orden: 2,
  },
    {
    encabezado: 'Registro Sanitario',
    clave: (ele: DetalleMercancíaProductoTerminado): string => ele.registroSanitario,
    orden: 3,
  }, 
];

/**
 * @const TERCEROS_NACIONALIDAD_RADIO_OPCIONS
 * @description Opciones de nacionalidad para terceros.
 */
export const TERCEROS_NACIONALIDAD_RADIO_OPCIONS = [
  { label: 'Nacional', value: 'true' },
  { label: 'Extranjero', value: 'false' },
];

/**
 * @const TERCEROS_PERSONA_RADIO_OPCIONS
 * @description Opciones de tipo de persona para terceros.
 */
export const TERCEROS_PERSONA_RADIO_OPCIONS = [
  { label: 'Física', value: TipoPersona.FISICA ,hint:'Física'},
  { label: 'Moral', value: TipoPersona.MORAL,hint:'Moral' }
];

/**
 * @const ELEMENTOS_REQUERIDOS
 * @description Lista de elementos requeridos para completar el formulario o proceso.
 */
export const ELEMENTOS_REQUERIDOS = [
  'colonia',
  'localidad',
  'denominacionRazon',
  'scian',
  'correoElectronico',
  'manifesto'
];

/**
 * @const ELEMENTOS_ANADIDOS
 * @description Lista de elementos adicionales que pueden ser incluidos en el formulario o proceso.
 */
export const ELEMENTOS_ANADIDOS = [
  'calleYNumero',
  'correoElectronico',
  'rfcSanitario',
  'regimenLaMercancia',
  'aduana',
];