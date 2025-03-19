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

export const EXPEDICION_FACTURA_FECHA = {
  labelNombre: 'Fecha de inspección',
  required: true,
  habilitado: true,
};

export const FECHA_DE_PAGO = {
  labelNombre: 'Fecha de pago:',
  required: true,
  habilitado: true,
};

export const TITULOMENSAJE =
  'Registro de solicitud de modificación programa IMMEX (Modificación Alta a domicilio de una planta, bodega o almacén)';
export const TEXTOS_REQUISITOS =
  'La solicitud ha quedado registrada con el número temporal [202767640]. Este no tiene validez legal y sirve solamente para efectos de identificar tu Solicitud. Un folio oficial le será asignado a la solicitud al momento en que esta sea firmada.';

export const INSTRUCCION_DOBLE_CLIC =
  'Al dar clic en el boton "Cargar" se creara una nueva solicitud con los mismos datos de la solcitud 202766288 ';

export const MANDATORY_INSTRUCTION =
  'Las tablas con asterisco son obligatorias y debes agregar por lo menos un registro.';

export const TEXTOS_220702 = {
  TEXTOS_SOLICITUD:
    'Al dar doble clic en el registro seleccionado creará una Nueva solicitud con los mismos datos de la solicitud elegida.',

  SECCION_LEYENDA_CONFIRMAR_TEXTOS:
    'Debes declarar la cantidad que ingresa en parcialidad por cada fracción arancelaria. La columna "Saldo pendiente" mostrará el saldo disponible para las siguientes parcialidades.',
};

export const MERCANCIA_SERVICIO = [
  {
    encabezado: 'No. pardita',
    clave: (ele: MercanciaInfo): string => ele.TABLA_Columna_1,
    orden: 1,
  },
  {
    encabezado: 'Tipo de requisito',
    clave: (ele: MercanciaInfo): string => ele.TABLA_Columna_2,
    orden: 2,
  },
  {
    encabezado: 'Requisito',
    clave: (ele: MercanciaInfo): string => ele.TABLA_Columna_3,
    orden: 3,
  },
  {
    encabezado: 'Número Certificado Internacional',
    clave: (ele: MercanciaInfo): string => ele.TABLA_Columna_4,
    orden: 4,
  },
  {
    encabezado: 'Fracción arancelaria',
    clave: (ele: MercanciaInfo): string => ele.TABLA_Columna_5,
    orden: 5,
  },
  {
    encabezado: 'Descripción de la fracción',
    clave: (ele: MercanciaInfo): string => ele.TABLA_Columna_6,
    orden: 6,
  },
  {
    encabezado: 'Nico',
    clave: (ele: MercanciaInfo): string => ele.TABLA_Columna_7,
    orden: 7,
  },
  {
    encabezado: 'Descripción Nico',
    clave: (ele: MercanciaInfo): string => ele.TABLA_Columna_8,
    orden: 8,
  },
  {
    encabezado: 'Descripción',
    clave: (ele: MercanciaInfo): string => ele.TABLA_Columna_8,
    orden: 8,
  },
  {
    encabezado: 'Unidad de medida tarifa (UMT)',
    clave: (ele: MercanciaInfo): string => ele.TABLA_Columna_9,
    orden: 9,
  },
  {
    encabezado: 'Cantidad UMT',
    clave: (ele: MercanciaInfo): string => ele.TABLA_Columna_10,
    orden: 10,
  },
  {
    encabezado: 'Unidad de medida de comercializacion (UMC)',
    clave: (ele: MercanciaInfo): string => ele.TABLA_Columna_11,
    orden: 11,
  },
  {
    encabezado: 'Cantidad UMC',
    clave: (ele: MercanciaInfo): string => ele.TABLA_Columna_12,
    orden: 12,
  },
  {
    encabezado: 'Uso',
    clave: (ele: MercanciaInfo): string => ele.TABLA_Columna_13,
    orden: 13,
  },
  {
    encabezado: 'Tipo de Producto',
    clave: (ele: MercanciaInfo): string => ele.TABLA_Columna_14,
    orden: 14,
  },
  {
    encabezado: 'Número de lote ',
    clave: (ele: MercanciaInfo): string => ele.TABLA_Columna_15,
    orden: 15,
  },
  {
    encabezado: 'País de orígen ',
    clave: (ele: MercanciaInfo): string => ele.TABLA_Columna_16,
    orden: 16,
  },

  {
    encabezado: 'País de procedencia ',
    clave: (ele: MercanciaInfo): string => ele.TABLA_Columna_17,
    orden: 17,
  },

  {
    encabezado: 'Certificado Internacional Electrónico ',
    clave: (ele: MercanciaInfo): string => ele.TABLA_Columna_18,
    orden: 18,
  }
];


export interface MercanciaInfo {
  TABLA_Columna_1: string;
  TABLA_Columna_2: string;
  TABLA_Columna_3: string;
  TABLA_Columna_4: string;
  TABLA_Columna_5: string;
  TABLA_Columna_6: string;
  TABLA_Columna_7: string;
  TABLA_Columna_8: string;
  TABLA_Columna_9: string;
  TABLA_Columna_10: string;
  TABLA_Columna_11: string;
  TABLA_Columna_12: string;
  TABLA_Columna_13: string;
  TABLA_Columna_14: string;
  TABLA_Columna_15: string;
  TABLA_Columna_16: string;
  TABLA_Columna_17: string;
  TABLA_Columna_18: string;
  TABLA_Columna_19: string;
  estatus: boolean;
}

export const EXPORTADOR_SERVICIO = [
  {
    encabezado: 'Nombre/denominacaió o razón social',
    clave: (ele: ExportadorInfo): string => ele.TABLA_Columna_1,
    orden: 1,
  },
  {
    encabezado: 'Teléfono',
    clave: (ele: ExportadorInfo): string => ele.TABLA_Columna_2,
    orden: 2,
  },
  {
    encabezado: 'Correo electrónico',
    clave: (ele: ExportadorInfo): string => ele.TABLA_Columna_3,
    orden: 3,
  },
  {
    encabezado: 'Domicilio',
    clave: (ele: ExportadorInfo): string => ele.TABLA_Columna_4,
    orden: 4,
  },
  {
    encabezado: 'País',
    clave: (ele: ExportadorInfo): string => ele.TABLA_Columna_5,
    orden: 5,
  },
];


export interface ExportadorInfo {
  TABLA_Columna_1: string;
  TABLA_Columna_2: string;
  TABLA_Columna_3: string;
  TABLA_Columna_4: string;
  TABLA_Columna_5: string;
  estatus: boolean;
}

export const DESTINO_SERVICIO = [
  {
    encabezado: 'Nombre/denominacaió o razón social',
    clave: (ele: DestinoInfo): string => ele.TABLA_Columna_1,
    orden: 1,
  },
  {
    encabezado: 'Teléfono',
    clave: (ele: DestinoInfo): string => ele.TABLA_Columna_2,
    orden: 2,
  },
  {
    encabezado: 'Correo electrónico',
    clave: (ele: DestinoInfo): string => ele.TABLA_Columna_3,
    orden: 3,
  },
  {
    encabezado: 'Calle',
    clave: (ele: DestinoInfo): string => ele.TABLA_Columna_4,
    orden: 4,
  },
  {
    encabezado: 'Número extrior',
    clave: (ele: DestinoInfo): string => ele.TABLA_Columna_5,
    orden: 5,
  },
  {
    encabezado: 'Número interior',
    clave: (ele: DestinoInfo): string => ele.TABLA_Columna_6,
    orden: 6,
  },
  {
    encabezado: 'País',
    clave: (ele: DestinoInfo): string => ele.TABLA_Columna_7,
    orden: 7,
  },
  {
    encabezado: 'Colonia',
    clave: (ele: DestinoInfo): string => ele.TABLA_Columna_8,
    orden: 8,
  },
  {
    encabezado: 'Mucinipio o alcaldía',
    clave: (ele: DestinoInfo): string => ele.TABLA_Columna_9,
    orden: 9,
  },
  {
    encabezado: 'Entidad federativa',
    clave: (ele: DestinoInfo): string => ele.TABLA_Columna_10,
    orden: 10,
  },
  {
    encabezado: 'Código postal',
    clave: (ele: DestinoInfo): string => ele.TABLA_Columna_11,
    orden: 11,
  },
];


export interface DestinoInfo {
  TABLA_Columna_1: string;
  TABLA_Columna_2: string;
  TABLA_Columna_3: string;
  TABLA_Columna_4: string;
  TABLA_Columna_5: string;
  TABLA_Columna_6: string;
  TABLA_Columna_7: string;
  TABLA_Columna_8: string;
  TABLA_Columna_9: string;
  TABLA_Columna_10: string;
  TABLA_Columna_11: string;
  estatus: boolean;
}

export const MEDIO_SERVICIO = [
  {
    encabezado: 'Fracción arancelaria',
    clave: (ele: MedioInfo): string => ele.TABLA_Columna_1,
    orden: 1,
  },
  {
    encabezado: 'Descripción de la fracción',
    clave: (ele: MedioInfo): string => ele.TABLA_Columna_2,
    orden: 2,
  },
  {
    encabezado: 'Nico',
    clave: (ele: MedioInfo): string => ele.TABLA_Columna_3,
    orden: 3,
  },
  {
    encabezado: 'Descripción Nico',
    clave: (ele: MedioInfo): string => ele.TABLA_Columna_4,
    orden: 4,
  },
  {
    encabezado: 'Unidad de medida de tarifa (UMT)',
    clave: (ele: MedioInfo): string => ele.TABLA_Columna_5,
    orden: 5,
  },
  {
    encabezado: 'Cantidad total UMT',
    clave: (ele: MedioInfo): string => ele.TABLA_Columna_6,
    orden: 6,
  },
];


export interface MedioInfo {
  TABLA_Columna_1: string;
  TABLA_Columna_2: string;
  TABLA_Columna_3: string;
  TABLA_Columna_4: string;
  TABLA_Columna_5: string;
  TABLA_Columna_6: string;
  estatus: boolean;
}

export const SECCIONES_TRAMITE_220702 = {
  PASO_1: {
    VALIDACION_SECCION_1: false,
    VALIDACION_SECCION_2: true,
    VALIDACION_SECCION_3: false,
  },
  PASO_2: {
    VALIDACION_SECCION: true,
  },
  PASO_3: {
    requiereValidacion: true,
  },
};
