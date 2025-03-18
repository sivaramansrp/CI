export const FECHA_DE_FIRMA = {
  labelNombre: 'Fecha del Firma',
  required: true,
  habilitado: true,
};
export const FECHA_DE_FIN_DE_VIGENCIA = {
  labelNombre: 'Fecha de fin de vigencia',
  required: true,
  habilitado: true,
};

export interface ComplementoDePlanta {
  // #Planta
  // Permanecerá mercancía al amparo del programa
  // Tipo de documento
  // Fecha de firma
  // Fecha de fin de vigencia
  // Documento respaldo
  // Fecha de firma
  // Fecha de fin de vigencia
  PLANTA: string;
  PERMANECERA_MERCANCIA_PROGRAMA: string;
  TIPO_DOCUMENTO: string;
  FECHA_DE_FIRMA: string;
  FECHA_DE_FIN_DE_VIGENCIA: string;
  DOCUMENTO_RESPALDO: string;
  FECHA_DE_FIRMA_DOCUMENTO: string;
  FECHA_DE_FIN_DE_VIGENCIA_DOCUMENTO: string;
}
export const COMPLEMENTO_DE_PLANTA = [
  {
    encabezado: '#Planta',
    clave: (ele: ComplementoDePlanta) => ele.PLANTA,
    orden: 1,
  },
  {
    encabezado: 'Permanecerá mercancía al amparo del programa',
    clave: (ele: ComplementoDePlanta) => ele.PERMANECERA_MERCANCIA_PROGRAMA,
    orden: 2,
  },
  {
    encabezado: 'Tipo de documento',
    clave: (ele: ComplementoDePlanta) => ele.TIPO_DOCUMENTO,
    orden: 3,
  },
  {
    encabezado: 'Fecha de firma',
    clave: (ele: ComplementoDePlanta) => ele.FECHA_DE_FIRMA,
    orden: 4,
  },
  {
    encabezado: 'Fecha de fin de vigencia',
    clave: (ele: ComplementoDePlanta) => ele.FECHA_DE_FIN_DE_VIGENCIA,
    orden: 5,
  },
  {
    encabezado: 'Documento respaldo',
    clave: (ele: ComplementoDePlanta) => ele.DOCUMENTO_RESPALDO,
    orden: 6,
  },
  {
    encabezado: 'Fecha de firma',
    clave: (ele: ComplementoDePlanta) => ele.FECHA_DE_FIRMA_DOCUMENTO,
    orden: 7,
  },
  {
    encabezado: 'Fecha de fin de vigencia',
    clave: (ele: ComplementoDePlanta) => ele.FECHA_DE_FIN_DE_VIGENCIA_DOCUMENTO,
    orden: 8,
  },
];
