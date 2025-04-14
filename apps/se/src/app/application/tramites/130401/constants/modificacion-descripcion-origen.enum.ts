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
    indice: 4,
    titulo: 'Firmar solicitud',
    activo: false,
    completado: false,
  },
];

export const TEXTOS = {
  TERCEROS_TEXTO_DE_ALERTA: 'La solicitud ha quedado registrada con el número temporal 202768161 Éste no tiene validez legal y sirve solamente para efectos de identificar tu solicitud. Un folio oficial le será asignado a la solicitud al momento en que ésta sea firmada.',
};

export const TERCEROS_TEXTO_DE_ALERTA = 'Para continuar con el trámite, debes agregar por lo menos una mercancía.';

export const FECHAINICIAL = {
  labelNombre: 'Fecha inicio',
  required: false,
  habilitado: true,
};

export const FECHAFINAL = {
  labelNombre: 'Fecha fin',
  required: false,
  habilitado: true,
};

export const FECHAFACTURA = {
  labelNombre: 'Fecha de factura',
  required: false,
  habilitado: true,
};