import {
  DatosDelRegistrar,
  DatosDelRegistrarManual,
} from '../models/proveedores.model';

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
    titulo: 'Firmar solicitud',
    activo: false,
    completado: false,
  },
];

/**
 * @const TITULO_MENSAJE
 * @description Título del mensaje que describe el propósito de la solicitud.
 */
export const TITULO_MENSAJE = 'Registrar proveedores.';

/**
 * @const TEXTOS_REQUISITOS
 * @description Mensaje que informa al usuario sobre el número temporal de la solicitud y su validez.
 */
export const TEXTOS_REQUISITOS =
  'La solicitud ha quedado registrada con el número temporal [202767640]. Este no tiene validez legal y sirve solamente para efectos de identificar tu Solicitud. Un folio oficial le será asignado a la solicitud al momento en que esta sea firmada.';

/**
 * @const REGISTRAR_PROVEEDORES_DE_TABLA
 * @description Configuración de las columnas para la tabla de registro de proveedores.
 * Cada columna incluye un encabezado, una clave para acceder al valor correspondiente en la fila, y un orden para su disposición.
 * @type {ConfiguracionColumna<DatosDelRegistrar>[]}
 */
export const REGISTRAR_PROVEEDORES_DE_TABLA: ConfiguracionColumna<DatosDelRegistrar>[] =
  [
    {
      encabezado: 'RFC',
      clave: (fila) => fila.rfc,
      orden: 1,
    },
    {
      encabezado: 'Denominación o razón social',
      clave: (fila) => fila.razonSocial,
      orden: 2,
    },
    {
      encabezado: 'Nombre completo',
      clave: (fila) => fila.nombreCompleto,
      orden: 3,
    },
    {
      encabezado: 'Domicilio fiscal',
      clave: (fila) => fila.domicilioFiscal,
      orden: 4,
    },
    {
      encabezado: 'Norma',
      clave: (fila) => fila.norma,
      orden: 5,
    },
    {
      encabezado: 'Número de programa IMMEX',
      clave: (fila) => fila.numeroProgramaImmex,
      orden: 6,
    },
    {
      encabezado: 'Número de programa PROSEC',
      clave: (fila) => fila.numeroProgramaProsec,
      orden: 7,
    },
    {
      encabezado: 'Aduana en las que opera',
      clave: (fila) => fila.aduanasOpera,
      orden: 8,
    },
  ];

/**
 * @const REGISTRAR_PROVEEDORES_MANUAL_DE_TABLA
 * @description Configuración de las columnas para la tabla de registro manual de proveedores.
 * Cada columna incluye un encabezado, una clave para acceder al valor correspondiente en la fila, y un orden para su disposición.
 * @type {ConfiguracionColumna<DatosDelRegistrarManual>[]}
 */
export const REGISTRAR_PROVEEDORES_MANUAL_DE_TABLA: ConfiguracionColumna<DatosDelRegistrarManual>[] =
  [
    {
      encabezado: 'RFC',
      clave: (fila) => fila.rfc,
      orden: 1,
    },
    {
      encabezado: 'Denominación o razón social',
      clave: (fila) => fila.razonSocial,
      orden: 2,
    },
    {
      encabezado: 'Nombre completo',
      clave: (fila) => fila.nombreCompleto,
      orden: 3,
    },
    {
      encabezado: 'Domicilio fiscal',
      clave: (fila) => fila.domicilioFiscal,
      orden: 4,
    },
    {
      encabezado: 'Norma',
      clave: (fila) => fila.norma,
      orden: 5,
    },
    {
      encabezado: 'Número de programa IMMEX',
      clave: (fila) => fila.numeroProgramaImmex,
      orden: 6,
    },
    {
      encabezado: 'Número de programa PROSEC',
      clave: (fila) => fila.numeroProgramaProsec,
      orden: 7,
    },
    {
      encabezado: 'Aduana en las que opera',
      clave: (fila) => fila.aduanasOpera,
      orden: 8,
    },
  ];

/**
 * @interface ConfiguracionColumna
 * @description Representa la configuración de una columna en una tabla.
 */
export interface ConfiguracionColumna<T> {
  encabezado: string;
  clave: (ele: T) => string | number | undefined | boolean;
  orden: number;
  hiperenlace?: boolean;
}

/**
 * @const CROSLISTA_DE_DATOS
 * @description Lista de datos de ejemplo que incluye nombres de países y autorizaciones de programas.
 * @type {string[]}
 */
export const CROSLISTA_DE_DATOS: string[] = [
  'AFGANISTÁN (EMIRATO ISLÁMICO)',
  'ALBANIA (REPÚBLICA DE)',
  'ALEMANIA (REPÚBLICA FEDERAL DE)',
  'ANDORRA (PRINCIPADO DE)',
  '8-2024-AUTORIZACIÓN PROGRAMA NUEVO',
];
