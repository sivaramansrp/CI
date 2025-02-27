import {
  Anexo,
  Bitacora,
  Complimentaria,
  DomicilioInfo,
  Federetarios,
  Operacions,
} from '../models/plantas-consulta.model';

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
    titulo: 'Anexar necesarios',
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

export const CONFIGURACION_DOMICILIOS = [
  {
    encabezado: 'Calle',
    clave: (ele: DomicilioInfo) => ele.calle,
    orden: 1,
  },
  {
    encabezado: 'Número Exterior',
    clave: (ele: DomicilioInfo) => ele.numeroExterior,
    orden: 2,
  },
  {
    encabezado: 'Número Interior',
    clave: (ele: DomicilioInfo) => ele.numeroInterior,
    orden: 3,
  },
  {
    encabezado: 'Código Postal',
    clave: (ele: DomicilioInfo) => ele.codigoPostal,
    orden: 4,
  },

  {
    encabezado: 'Colonia',
    clave: (ele: DomicilioInfo) => ele.colonia,
    orden: 5,
  },
  {
    encabezado: 'Localidad',
    clave: (ele: DomicilioInfo) => ele.localidad,
    orden: 6,
  },

  {
    encabezado: 'Municipio o alcaldía',
    clave: (ele: DomicilioInfo) => ele.delegacionMunicipio,
    orden: 7,
  },
  {
    encabezado: 'Entidad Federativa',
    clave: (ele: DomicilioInfo) => ele.entidadFederativa,
    orden: 8,
  },
  {
    encabezado: 'País',
    clave: (ele: DomicilioInfo) => ele.pais,
    orden: 9,
  },
  {
    encabezado: 'RFC',
    clave: (ele: DomicilioInfo) => ele.rfc,
    orden: 10,
  },
  
  {
    encabezado: 'Razón Social',
    clave: (ele: DomicilioInfo) => ele.razonSocial,
    orden: 13,
  },
 
];

export const CONFIGURACION_ACCIONISTAS = [
  {
    encabezado: 'Registro Federal de Contribuyente(RFC)',
    clave: (ele: Complimentaria) => ele.rfc,
    orden: 1,
  },
  {
    encabezado: 'Nombre(s)',
    clave: (ele: Complimentaria) => ele.nombre,
    orden: 2,
  },
  {
    encabezado: 'Primer apellido',
    clave: (ele: Complimentaria) => ele.apellidoPrimer,
    orden: 3,
  },
  {
    encabezado: 'Segundo apellido',
    clave: (ele: Complimentaria) => ele.apellidoSegundo,
    orden: 4,
  },
];

export const CONFIGURACION_FEDERETARIOS = [
  {
    encabezado: 'Nombre',
    clave: (ele: Federetarios) => ele.nombre,
    orden: 1,
  },
  {
    encabezado: 'Primer apellido',
    clave: (ele: Federetarios) => ele.apellidoPrimer,
    orden: 2,
  },
  {
    encabezado: 'Segundo apellido',
    clave: (ele: Federetarios) => ele.apellidoSegundo,
    orden: 3,
  },
  {
    encabezado: 'Número acta',
    clave: (ele: Federetarios) => ele.numeroActa,
    orden: 4,
  },
  {
    encabezado: 'Fetcha acta',
    clave: (ele: Federetarios) => ele.fetchActa,
    orden: 5,
  },
  {
    encabezado: 'Número notaria',
    clave: (ele: Federetarios) => ele.numeroNotaria,
    orden: 6,
  },
  {
    encabezado: 'Municipio o Delegación',
    clave: (ele: Federetarios) => ele.municipioDelegacion,
    orden: 7,
  },
  {
    encabezado: 'Estado o Distrito Federal',
    clave: (ele: Federetarios) => ele.estado,
    orden: 8,
  },
];

export const CONFIGURACION_OPERACIONES = [
  {
    encabezado: 'Calle',
    clave: (ele: Operacions) => ele.calle,
    orden: 1,
  },
  {
    encabezado: 'Número Exterior',
    clave: (ele: Operacions) => ele.numeroExterior,
    orden: 2,
  },
  {
    encabezado: 'Número Interior',
    clave: (ele: Operacions) => ele.numeroInterior,
    orden: 3,
  },
  {
    encabezado: 'Código Postal',
    clave: (ele: Operacions) => ele.codigoPostal,
    orden: 4,
  },
  {
    encabezado: 'Colonia',
    clave: (ele: Operacions) => ele.colonia,
    orden: 5,
  },
  {
    encabezado: 'Localidad',
    clave: (ele: Operacions) => ele.localidad,
    orden: 6,
  },
  {
    encabezado: 'Municipio o Delegación',
    clave: (ele: Operacions) => ele.municipioDelegacion,
    orden: 7,
  },
  {
    encabezado: 'Estado o Distrito Federal',
    clave: (ele: Operacions) => ele.estado,
    orden: 8,
  },
  {
    encabezado: 'País',
    clave: (ele: Operacions) => ele.pais,
    orden: 9,
  },
  {
    encabezado: 'Registro Federal de Contribuyente(RFC)',
    clave: (ele: Operacions) => ele.rfc,
    orden: 10,
  },
  {
    encabezado: 'Domicilio fiscal del solicitante',
    clave: (ele: Operacions) => ele.fiscalSolicitante,
    orden: 11,
  },
  {
    encabezado: 'Denominación o razón social',
    clave: (ele: Operacions) => ele.razonSocial,
    orden: 12,
  },

  {
    encabezado: 'Estatus',
    clave: (ele: Operacions) => (ele.estatus ? 'Activada' : 'Baja'),
    orden: 13,
  },
];

export const CONFIGURACION_BITACORA_TABLA = [
  {
    encabezado: 'Tipo modificación',
    clave: (ele: Bitacora) => ele.tipoModificion,
    orden: 1,
  },
  {
    encabezado: 'Fetcha modificación',
    clave: (ele: Bitacora) => ele.fetchModificion,
    orden: 2,
  },
  {
    encabezado: 'Velores anteriores',
    clave: (ele: Bitacora) => ele.valoresAnteriores,
    orden: 3,
  },
  {
    encabezado: 'Velores nuevos',
    clave: (ele: Bitacora) => ele.valoresNuevos,
    orden: 4,
  },
];

export const CONFIGURACION_ANEXOS_TABLA = [
  {
    encabezado: 'Fracción arancelaria del producto de exportación',
    clave: (ele: Anexo) => ele.fraccionArancelariaExportacion,
    orden: 1,
  },
  {
    encabezado: 'Descripción',
    clave: (ele: Anexo) => ele.descripcion,
    orden: 2,
  },
  {
    encabezado: 'Tipo Fracción',
    clave: (ele: Anexo) => ele.tipoFraccion,
    orden: 3,
  },
];

export const CONFIGURACION_ANEXOS_IMPORTACION = [
  {
    encabezado: 'Fracción arancelaria del producto de exportación',
    clave: (ele: Anexo) => ele.fraccionArancelariaExportacion,
    orden: 1,
  },
  {
    encabezado: 'Fracción arancelaria de la mercancía de importación',
    clave: (ele: Anexo) => ele.fraccionArancelariaImportacion,
    orden: 1,
  },
  {
    encabezado: 'Descripción',
    clave: (ele: Anexo) => ele.descripcion,
    orden: 2,
  },
  {
    encabezado: 'Tipo Fracción',
    clave: (ele: Anexo) => ele.tipoFraccion,
    orden: 3,
  },
];

export const TITULOMENSAJE =
  'Registro de solicitude modificación programa IMMEX (Modificación Alta a domicilio de una planta, bodega o almacén)';
export const TEXTOS_REQUISITOS =
  'La solicitud ha quedado registrada con el número temporal [202767640]. Este no tiene validez legal y sirve solamente para efectos de identificar tu Solicitud. Un folio oficial le será asignado a la solicitud al momento en que esta sea firmada.';
