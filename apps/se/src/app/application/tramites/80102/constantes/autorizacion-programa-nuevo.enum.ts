import {
  DatosCatalago,
  DatosEmpresaExtranjera,
  Servicio,
  ServicioInmex,
} from '../models/autorizacion-programa-nuevo.model';

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
export const TEXTOS_REQUISITOS =
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

export const FORMA_SOCIO_ACCIONISTAS: DatosCatalago[] = [
  {
    labelNombre: 'Tax ID',
    campo: 'taxId',
    class: 'col-md-7 col-sm-10 pr-5',
    tipo_input: 'text',
    required: true,
    orden: 1,
  },
  {
    labelNombre: 'Denominación o razón social',
    campo: 'razonSocial',
    class: 'col-md-6 col-sm-10 mt-3',
    tipo_input: 'text',
    required: true,
    orden: 2,
  },
  {
    labelNombre: 'País',
    campo: 'pais',
    class: 'col-md-6 col-10 mt-1',
    tipo_input: 'select-paise',
    required: true,
    opciones: [],
    orden: 3,
  },
  {
    labelNombre: 'Código postal',
    campo: 'codigoPostal',
    class: 'col-md-6 col-10 mt-3',
    tipo_input: 'text',
    required: true,
    orden: 4,
  },
  {
    labelNombre: 'Estado',
    campo: 'estado',
    class: 'col-md-6 col-10  mt-1',
    tipo_input: 'select-catalog',
    required: true,
    opcionesCatalogo: [],
    orden: 5,
  },
  {
    labelNombre: 'Correo electrónico',
    campo: 'correoElectronico ',
    class: 'col-md-6 col-10 mt-3',
    tipo_input: 'text',
    required: true,
    orden: 6,
  },
];

export const FORMA_SOCIO_ACCIONISTAS_EXTRANJEROS: DatosCatalago[] = [
  {
    labelNombre: 'Nombre',
    campo: 'nombre',
    class: 'col-md-6 col-sm-10 mt-3',
    tipo_input: 'text',
    required: true,
    orden: 1,
  },
  {
    labelNombre: 'Apellido paterno',
    campo: 'apellidoPaterno',
    class: 'col-md-6 col-sm-10 mt-3',
    tipo_input: 'text',
    required: true,
    orden: 2,
  },
  {
    labelNombre: 'País',
    campo: 'pais',
    class: 'col-md-10 col-10 mt-1',
    tipo_input: 'select-paise',
    required: true,
    opciones: [],
    orden: 3,
  },
  {
    labelNombre: 'Código postal',
    campo: 'codigoPostal',
    class: 'col-md-6 col-10 mt-3',
    tipo_input: 'text',
    required: true,
    orden: 4,
  },
  {
    labelNombre: 'Estado',
    campo: 'estado',
    class: 'col-md-6 col-10 mt-3',
    tipo_input: 'select-catalog ',
    required: true,
    opcionesCatalogo: [],
    orden: 5,
  },
  {
    labelNombre: 'Correo electrónico',
    campo: 'correoElectronico',
    class: 'col-md-6 col-10 mt-3',
    tipo_input: 'text',
    required: true,
    orden: 6,
  },
  {
    labelNombre: 'Tax ID',
    campo: 'taxId',
    class: 'col-md-6 col-sm-10 mt-3',
    tipo_input: 'text',
    required: true,
    orden: 7,
  },
];

export const FORMA_SOCIO: DatosCatalago[] = [
  {
    labelNombre: 'Registro Federal de Contribuyentes',
    campo: 'rfc',
    class: 'col-md-6 col-10 mt-3',
    tipo_input: 'text',
    required: true,
    orden: 1,
  },
];

export enum TIPO_FORMA {
  DEFAULT = 1,
  TIPO_PERSONA = 2,
  NATIONALIDAD_MEXICANA = 3,
}
