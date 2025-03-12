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
    titulo: 'Firmar solicitud',
    activo: false,
    completado: false,
  },
];

export const CONFIGURACION_DOMICILIOS = [
  {
    encabezado: 'Calle',
    clave: (ele: DomicilioInfo): string | undefined => ele.calle,
    orden: 1,
  },
  {
    encabezado: 'Número Exterior',
    clave: (ele: DomicilioInfo) : string | undefined => ele.numeroExterior,
    orden: 2,
  },
  {
    encabezado: 'Número Interior',
    clave: (ele: DomicilioInfo): string | undefined => ele.numeroInterior,
    orden: 3,
  },
  {
    encabezado: 'Código Postal',
    clave: (ele: DomicilioInfo): string | undefined => ele.codigoPostal,
    orden: 4,
  },

  {
    encabezado: 'Colonia',
    clave: (ele: DomicilioInfo): string | undefined => ele.colonia,
    orden: 5,
  },
  {
    encabezado: 'Localidad',
    clave: (ele: DomicilioInfo): string | undefined => ele.localidad,
    orden: 6,
  },

  {
    encabezado: 'Municipio o alcaldía',
    clave: (ele: DomicilioInfo): string | undefined => ele.delegacionMunicipio,
    orden: 7,
  },
  {
    encabezado: 'Entidad Federativa',
    clave: (ele: DomicilioInfo): string | undefined => ele.entidadFederativa,
    orden: 8,
  },
  {
    encabezado: 'País',
    clave: (ele: DomicilioInfo): string | undefined => ele.pais,
    orden: 9,
  },
  {
    encabezado: 'RFC',
    clave: (ele: DomicilioInfo): string | undefined => ele.rfc,
    orden: 10,
  },
  
  {
    encabezado: 'Razón Social',
    clave: (ele: DomicilioInfo): string | undefined => ele.razonSocial,
    orden: 13,
  },
 
];

export const CONFIGURACION_ACCIONISTAS = [
  {
    encabezado: 'Registro Federal de Contribuyente(RFC)',
    clave: (ele: Complimentaria): string | undefined => ele.rfc,
    orden: 1,
  },
  {
    encabezado: 'Nombre(s)',
    clave: (ele: Complimentaria): string | undefined => ele.nombre,
    orden: 2,
  },
  {
    encabezado: 'Primer apellido',
    clave: (ele: Complimentaria): string | undefined => ele.apellidoPrimer,
    orden: 3,
  },
  {
    encabezado: 'Segundo apellido',
    clave: (ele: Complimentaria): string | undefined => ele.apellidoSegundo,
    orden: 4,
  },
];

export const CONFIGURACION_FEDERETARIOS = [
  {
    encabezado: 'Nombre',
    clave: (ele: Federetarios): string | undefined => ele.nombre,
    orden: 1,
  },
  {
    encabezado: 'Primer apellido',
    clave: (ele: Federetarios): string | undefined => ele.apellidoPrimer,
    orden: 2,
  },
  {
    encabezado: 'Segundo apellido',
    clave: (ele: Federetarios): string | undefined => ele.apellidoSegundo,
    orden: 3,
  },
  {
    encabezado: 'Número acta',
    clave: (ele: Federetarios): string | undefined => ele.numeroActa,
    orden: 4,
  },
  {
    encabezado: 'Fetcha acta',
    clave: (ele: Federetarios) : string | undefined => ele.fetchActa,
    orden: 5,
  },
  {
    encabezado: 'Número notaria',
    clave: (ele: Federetarios) : string | undefined => ele.numeroNotaria,
    orden: 6,
  },
  {
    encabezado: 'Municipio o Delegación',
    clave: (ele: Federetarios) : string | undefined => ele.municipioDelegacion,
    orden: 7,
  },
  {
    encabezado: 'Estado o Distrito Federal',
    clave: (ele: Federetarios) : string | undefined => ele.estado,
    orden: 8,
  },
];

export const CONFIGURACION_OPERACIONES = [
  {
    encabezado: 'Calle',
    clave: (ele: Operacions) : string | undefined => ele.calle,
    orden: 1,
  },
  {
    encabezado: 'Número Exterior',
    clave: (ele: Operacions) : string | undefined => ele.numeroExterior,
    orden: 2,
  },
  {
    encabezado: 'Número Interior',
    clave: (ele: Operacions) : string | undefined => ele.numeroInterior,
    orden: 3,
  },
  {
    encabezado: 'Código Postal',
    clave: (ele: Operacions) : string | undefined => ele.codigoPostal,
    orden: 4,
  },
  {
    encabezado: 'Colonia',
    clave: (ele: Operacions) : string | undefined => ele.colonia,
    orden: 5,
  },
  {
    encabezado: 'Localidad',
    clave: (ele: Operacions) : string | undefined => ele.localidad,
    orden: 6,
  },
  {
    encabezado: 'Municipio o Delegación',
    clave: (ele: Operacions) : string | undefined => ele.municipioDelegacion,
    orden: 7,
  },
  {
    encabezado: 'Estado o Distrito Federal',
    clave: (ele: Operacions) : string | undefined => ele.estado,
    orden: 8,
  },
  {
    encabezado: 'País',
    clave: (ele: Operacions) : string | undefined => ele.pais,
    orden: 9,
  },
  {
    encabezado: 'Registro Federal de Contribuyente(RFC)',
    clave: (ele: Operacions) : string | undefined => ele.rfc,
    orden: 10,
  },
  {
    encabezado: 'Domicilio fiscal del solicitante',
    clave: (ele: Operacions) : string | undefined => ele.fiscalSolicitante,
    orden: 11,
  },
  {
    encabezado: 'Denominación o razón social',
    clave: (ele: Operacions) : string | undefined => ele.razonSocial,
    orden: 12,
  },

  {
    encabezado: 'Estatus',
    clave: (ele: Operacions) : string | undefined => (ele.estatus ? 'Activada' : 'Baja'),
    orden: 13,
  },
];

export const CONFIGURACION_BITACORA_TABLA = [
  {
    encabezado: 'Tipo modificación',
    clave: (ele: Bitacora) : string | undefined => ele.tipoModificion,
    orden: 1,
  },
  {
    encabezado: 'Fecha modificación',
    clave: (ele: Bitacora) : string | undefined => ele.fetchModificion,
    orden: 2,
  },
  {
    encabezado: 'Valores anteriores',
    clave: (ele: Bitacora) : string | undefined => ele.valoresAnteriores,
    orden: 3,
  },
  {
    encabezado: 'Valores nuevos',
    clave: (ele: Bitacora): string | undefined => ele.valoresNuevos,
    orden: 4,
  },
];

export const CONFIGURACION_ANEXOS_TABLA = [
  {
    encabezado: 'Fracción arancelaria del producto de exportación',
    clave: (ele: Anexo) : string | undefined => ele.fraccionArancelariaExportacion,
    orden: 1,
  },
  {
    encabezado: 'Descripción',
    clave: (ele: Anexo): string | undefined => ele.descripcion,
    orden: 2,
  },
  {
    encabezado: 'Tipo Fracción',
    clave: (ele: Anexo) : string | undefined => ele.tipoFraccion,
    orden: 3,
  },
];

export const CONFIGURACION_ANEXOS_IMPORTACION = [
  {
    encabezado: 'Fracción arancelaria del producto de exportación',
    clave: (ele: Anexo): string | undefined => ele.fraccionArancelariaExportacion,
    orden: 1,
  },
  {
    encabezado: 'Fracción arancelaria de la mercancía de importación',
    clave: (ele: Anexo): string | undefined => ele.fraccionArancelariaImportacion,
    orden: 1,
  },
  {
    encabezado: 'Descripción',
    clave: (ele: Anexo) : string | undefined => ele.descripcion,
    orden: 2,
  },
  {
    encabezado: 'Tipo Fracción',
    clave: (ele: Anexo) : string | undefined => ele.tipoFraccion,
    orden: 3,
  },
];

export const TITULOMENSAJE =
  'Registro de solicitud de modificación programa IMMEX (Modificación Alta a domicilio de una planta, bodega o almacén)';
export const TEXTOS_REQUISITOS =
  'La solicitud ha quedado registrada con el número temporal [202767640]. Este no tiene validez legal y sirve solamente para efectos de identificar tu Solicitud. Un folio oficial le será asignado a la solicitud al momento en que esta sea firmada.';
