import { ColumnasTabla } from "../../32505/models/avios-model";

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
  }
];



export const TEXTOS_REQUISITOS = {
  INSTRUCCIONES: `<h6>Instrucciones</h6>
      <p>- La solicitud ha quedado registrada con el número temporal 67922457.</p>
      <p>- Éste no tiene validez legal y será solamente para efectos de identificar tu solicitud.</p>
      <p>- Un folio oficial le sera asignado a la solicitud al momento en que ésta sea firmada.</p>`,
};


export const TABLE_DATA = {
  headers: [
    { encabezado: 'Datos del tipo de registro', clave: (ele: ColumnasTabla) => ele.headerTipoRegistro, orden: 1 },
    {
      encabezado: 'NIV o número de serie',
      clave: (ele: ColumnasTabla) => ele.headerNIV,
      orden: 2,
    },
    {
      encabezado: 'Año modelo',
      clave: (ele: ColumnasTabla) => ele.headerAnioModelo,
      orden: 3,
    },
    {
      encabezado: 'Marca',
      clave: (ele: ColumnasTabla) => ele.headerMarca,
      orden: 4,
    },
    {
      encabezado: 'Modelo',
      clave: (ele: ColumnasTabla) => ele.headerModelo,
      orden: 5,
    },
    {
      encabezado: 'Tipo/Variante',
      clave: (ele: ColumnasTabla) => ele.headerTVV,
      orden: 5,
    },
    {
      encabezado: 'Nombre en el título de propiedad extranjero o en su caso, nombre de la persona a la que se haya concedido la propiedad',
      clave: (ele: ColumnasTabla) => ele.headerNombreTitulo,
      orden: 6,
    },
    {
      encabezado: 'No. del título de propiedad',
      clave: (ele: ColumnasTabla) => ele.headerNoTitulo,
      orden: 7,
    },
    {
      encabezado: 'País que emitió el título de propiedad',
      clave: (ele: ColumnasTabla) => ele.headerPais,
      orden: 8,
    },
    {
      encabezado: 'Estado o provincia de emisión del titulo de propiedad',
      clave: (ele: ColumnasTabla) => ele.headerEstado,
      orden: 9,
    },
    {
      encabezado: 'No. de placas de circulación en el país de procedencia',  
      clave: (ele: ColumnasTabla) => ele.headerPlacas,
      orden: 10,
    },
    { 
      encabezado: 'Forma de adquisición del vehículo importado',
      clave: (ele: ColumnasTabla) => ele.headerAdquisicion,
      orden: 12,
    },
    {
      encabezado: 'No. de documento de exportación',
      clave: (ele: ColumnasTabla) => ele.headerDocumentoExportacion,
      orden: 13,

    },
    {
      encabezado: 'Aduana de importación',
      clave: (ele: ColumnasTabla) => ele.headerAduana,
      orden: 14,

    },

    {
      encabezado: 'Patente de importación',
      clave: (ele: ColumnasTabla) => ele.headerPatente,
      orden: 15,

    },
    {
      encabezado: 'Pedimento de importación',
      clave: (ele: ColumnasTabla) => ele.headerPedimento,
      orden: 16,

    },
    {
      encabezado: 'Kilometraje a la fecha de la importación',
      clave: (ele: ColumnasTabla) => ele.headerKilometraje,
      orden: 17,

    },
    {
      encabezado: 'Valor en dólares',
      clave: (ele: ColumnasTabla) => ele.headerValorDolares,
      orden: 18,

    },
    {
      encabezado: 'Valor en la aduana',
      clave: (ele: ColumnasTabla) => ele.headerValorAduana,
      orden: 19,

    },
    {
      encabezado: 'Monto de IGI pagado',
      clave: (ele: ColumnasTabla) => ele.headerMontoIGI,
      orden: 20,

    },
    {
      encabezado: 'Forma de pago del IGI',
      clave: (ele: ColumnasTabla) => ele.headerFormaPago,
      orden: 21,

    },
    {
      encabezado: 'Monto de DTA pagado',
      clave: (ele: ColumnasTabla) => ele.headerMontoDTA,
      orden: 22,

    },
    {
      encabezado: 'Folio del CFDI por el servicio de importación',
      clave: (ele: ColumnasTabla) => ele.headerFolioCFDI,
      orden: 23,

    },
    {
      encabezado: 'Valor de venta en territorio nacional sin IVA',
      clave: (ele: ColumnasTabla) => ele.headerFolioCFDI,
      orden: 24,

    },
    {
      encabezado: 'Folio del CFDI por la venta en territorio nacional',
      clave: (ele: ColumnasTabla) => ele.headerFolioCFDI,
      orden: 25,

    },
 
    {
      encabezado: 'Identificador de transacción de VUCEM correspondiente al aviso de importación previa relacionado',
      clave: (ele: ColumnasTabla) => ele.headerFolioCFDI,
      orden: 26,

    },
  ],
  data: [],
};

export const TEXTOS = {
  INSTRUCCIONES: `
  <p>- El archivo no debe exceder los 1000 registros. Para descargar plantilla del archivo de excel de click</p>`,
  CARGA_DE_ARCHIVOS: `Seleccionar archivo`,
  CARGA_DE_ARCHIVO_DE_TEXTO: `Sin archivos seleccionados`,
  CARGA_DE_ARCHIVO_DE_TEXTO_EXITOSO: `El formato del archivo es correcto. Se enviará un correo de notificación con el resultado.`,
};