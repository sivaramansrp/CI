import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { DisponiblesTabla } from '../models/certificado-origen.model';
import { HistoricoColumnas } from '../models/certificado-origen.model';
import { SeleccionadasTabla } from '../models/certificado-origen.model';

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
    titulo: 'Firmar solicitud',
    activo: false,
    completado: false,
  },
];

/**
 * Texto de alerta para terceros.
 *
 * Este texto se muestra como un mensaje de advertencia cuando no se han agregado mercancías al trámite.
 */
export const TERCEROS_TEXTO_DE_ALERTA =
  'Para continuar con el trámite, debes agregar por lo menos una mercancía.';

/**
 * Configuración para la fecha inicial.
 *
 * Define las propiedades de la fecha inicial, como el nombre de la etiqueta, si es requerida y si está habilitada.
 */
export const FECHA_INICIAL = {
  labelNombre: 'Fecha inicio',
  required: false,
  habilitado: true,
};

/**
 * Configuración para la fecha final.
 *
 * Define las propiedades de la fecha final, como el nombre de la etiqueta, si es requerida y si está habilitada.
 */
export const FECHA_FINAL = {
  labelNombre: 'Fecha fin',
  required: false,
  habilitado: true,
};

/**
 * Configuración para la fecha de factura.
 *
 * Define las propiedades de la fecha de factura, como el nombre de la etiqueta, si es requerida y si está habilitada.
 */
export const FECHA_FACTURA = {
  labelNombre: 'Fecha de factura',
  required: true,
  habilitado: true,
};

/**
 * Configuración de las columnas para la tabla de mercancías disponibles.
 *
 * Esta constante define los encabezados y claves de las columnas que se mostrarán en la tabla de mercancías disponibles.
 */
export const DISPONIBLES_ENCABEZADOS: ConfiguracionColumna<DisponiblesTabla>[] = [
  {
    encabezado: 'Fracción arancelaria',
    clave: (ele: DisponiblesTabla) => ele.fraccionArancelaria,
    orden: 1,
  },
  {
    encabezado: 'Nombre técnico',
    clave: (ele: DisponiblesTabla) => ele.nombreTecnico,
    orden: 2,
  },
  {
    encabezado: 'Nombre comercial',
    clave: (ele: DisponiblesTabla) => ele.nombreComercial,
    orden: 3,
  },
  {
    encabezado: 'Número de registro de productos',
    clave: (ele: DisponiblesTabla) => ele.numeroRegistroProductos,
    orden: 4,
  },
  {
    encabezado: 'Fecha expedición',
    clave: (ele: DisponiblesTabla) => ele.fechaExpedicion,
    orden: 5,
  },
  {
    encabezado: 'Fecha vencimiento',
    clave: (ele: DisponiblesTabla) => ele.fechaVencimiento,
    orden: 6,
  },
];

/**
 * Configuración de las columnas para la tabla de mercancías seleccionadas.
 *  Esta constante define los encabezados y claves de las columnas que se mostrarán en la tabla de mercancías seleccionadas.
 *  @type {ConfiguracionColumna<SeleccionadasTabla>[]}
 *  @constant
 *  @property {string} encabezado - El título de la columna que se mostrará en la tabla.
 *  @property {function} clave - Una función que toma un elemento de tipo SeleccionadasTabla y devuelve el valor a mostrar en la columna.
 *   @property {number} orden - El orden en que se mostrará la columna en la tabla.
 *  @returns {ConfiguracionColumna<SeleccionadasTabla>[]} Un array de objetos que representan la configuración de las columnas.
 */ 
export const SLECCIONADAS_ENCABEZADOS:ConfiguracionColumna<SeleccionadasTabla>[] =
    [
      {
        encabezado: 'Fracción arancelaria',
        clave: (ele: SeleccionadasTabla) => ele.fraccionArancelaria,
        orden: 1,
      },
      {
        encabezado: 'Cantidad',
        clave: (ele: SeleccionadasTabla) => ele.cantidad,
        orden: 2,
      },
      {
        encabezado: 'Unidad de medida',
        clave: (ele: SeleccionadasTabla) => ele.unidadMedida,
        orden: 3,
      },
      {
        encabezado: 'Valor mercancía',
        clave: (ele: SeleccionadasTabla) => ele.valorMercancia,
        orden: 4,
      },
      {
        encabezado: 'Tipo de factura',
        clave: (ele: SeleccionadasTabla) => ele.tipoFactura,
        orden: 5,
      },
      {
        encabezado: 'Número factura',
        clave: (ele: SeleccionadasTabla) => ele.numFactura,
        orden: 6,
      },
      {
        encabezado: 'Complemento descripción',
        clave: (ele: SeleccionadasTabla) => ele.complementoDescripcion,
        orden: 7,
      },
      {
        encabezado: 'Fecha factura',
        clave: (ele: SeleccionadasTabla) => ele.fechaFactura,
        orden: 8,
      },
    ];


    /**
     *  Configuración de las columnas para la tabla de historial de productores.
     *  Esta constante define los encabezados y claves de las columnas que se mostrarán en la tabla de historial de productores.
     *  @type {ConfiguracionColumna<HistoricoColumnas>[]}
     *   @constant
     *  @property {string} encabezado - El título de la columna que se mostrará en la tabla.
     *   @property {function} clave - Una función que toma un elemento de tipo HistoricoColumnas y devuelve el valor a mostrar en la columna.
     *  @property {number} orden - El orden en que se mostrará la columna en la tabla.
     *   @returns {ConfiguracionColumna<HistoricoColumnas>[]} Un array de objetos que representan la configuración de las columnas.
     */
   export const HISTORICO_ENCABZADOS: ConfiguracionColumna<HistoricoColumnas>[] = [
        {
          encabezado: 'Nombre del productor',
          clave: (elementos) => elementos.nombreProductor,
          orden: 1
        },
        {
          encabezado: 'Número de registro fiscal',
          clave: (elementos) => elementos.numeroRegistroFiscal,
          orden: 2,
        },
        {
          encabezado: 'Dirección',
          clave: (elementos) => elementos.direccion,
          orden: 3,
        },
        {
          encabezado: 'Correo Electrónico',
          clave: (elementos) => elementos.correoElectronico,
          orden: 4,
        },
        {
          encabezado: 'Teléfono',
          clave: (elementos) => elementos.telefono,
          orden: 5,
        },
        {
          encabezado: 'Fax',
          clave: (elementos) => elementos.fax,
          orden: 6,
        },
      ];