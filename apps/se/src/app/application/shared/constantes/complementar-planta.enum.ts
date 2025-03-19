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
  planta: string;
  permaneceraMercanciaPrograma: string;
  tipoDocumento: string;
  fechaDeFirma: string;
  fechaDeFinDeVigencia: string;
  documentoRespaldo: string;
  fechaDeFirmaDocumento: string;
  fechaDeFinDeVigenciaDocumento: string;
}
export const COMPLEMENTO_DE_PLANTA = [
  {
    encabezado: '#Planta',
    clave: (ele: ComplementoDePlanta): string => ele.planta,
    orden: 1,
  },
  {
    encabezado: 'Permanecerá mercancía al amparo del programa',
    clave: (ele: ComplementoDePlanta): string =>
      ele.permaneceraMercanciaPrograma,
    orden: 2,
  },
  {
    encabezado: 'Tipo de documento',
    clave: (ele: ComplementoDePlanta): string => ele.tipoDocumento,
    orden: 3,
  },
  {
    encabezado: 'Fecha de firma (programa)',
    clave: (ele: ComplementoDePlanta): string => ele.fechaDeFirma,
    orden: 4,
  },
  {
    encabezado: 'Fecha de fin de vigencia (programa)',
    clave: (ele: ComplementoDePlanta): string => ele.fechaDeFinDeVigencia,
    orden: 5,
  },
  {
    encabezado: 'Documento respaldo',
    clave: (ele: ComplementoDePlanta): string => ele.documentoRespaldo,
    orden: 6,
  },
  {
    encabezado: 'Fecha de firma (documento)',
    clave: (ele: ComplementoDePlanta): string => ele.fechaDeFirmaDocumento,
    orden: 7,
  },
  {
    encabezado: 'Fecha de fin de vigencia (documento)',
    clave: (ele: ComplementoDePlanta): string =>
      ele.fechaDeFinDeVigenciaDocumento,
    orden: 8,
  },
];
