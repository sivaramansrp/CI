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

  export const TEXTOS_REQUISITOS = {
    INSTRUCCIONES: `<h6>Instrucciones</h6>
    <p>- De acuerdo al caso particular, algunos dcumentos podrían ser obligatorios</p>
    <p>- En caso de que no requieras algún documento, seleccionalo y elíminalo</p>
    <p>- Si necesitas anexar más de un documento del mismo tipo selecciónalo de la lista y presiona "Agregar nuevo".</p>`,
    ADJUNTAR: `<p>Si deseas adjuntar un nuevo documento, selecciona la opción --Adjuntar nuevo documento-- y presiona el botón "Adjuntar dcumentos"</p>`,
};

export interface AccionBoton {
  accion: string;
  valor: number;
}