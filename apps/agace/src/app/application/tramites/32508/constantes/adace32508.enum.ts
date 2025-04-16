import { CatalogosSelect } from "@libs/shared/data-access-user/src";

export enum AprovechamientoTextos {
  PARCIAL = 'Pago de aprovechamiento con compensación y/o disminución parcial',
  TOTAL = 'Aprovechamiento totalmente compensado y/o disminuido',
  TITULO = 'Dictamen de compensación o disminución contra el aprovechamiento a cargo de Recintos Fiscalizados (Regla 2.3.5.)'
}

/**
* Opciones de radio internas del componente.
*/
export const RADIO_OPCIONS = [
  { label: 'Disminución', value: 'disminucion' },
  { label: 'Compensación', value: 'compensacion' },
  { label: 'Disminución y Compensación', value: 'disminucionYCompensacion' },
];

export const RADIO_PARCIAL = [
  { label: 'Sí', value: 'si' },
  { label: 'No', value: 'no' },
];

export const RADIO_TOTAL = [
  { label: 'Sí', value: 'si' },
  { label: 'No', value: 'no' },
];

/**
* Configuración para la fecha inicial de vigencia.
* Contiene las propiedades necesarias para mostrar y validar el campo en el formulario.
*/
export const FECHA_INICIAL = {
  labelNombre: 'Fecha de elaboración del dictamen',
  required: true,
  habilitado: true,
};

/**
* Configuración para la fecha de pago.
* Contiene las propiedades necesarias para mostrar y validar el campo en el formulario.
*/
export const FECHA_PAGO = {
  labelNombre: 'Fecha de pago',
  required: false,
  habilitado: true,
};


export const ANO_CATALOGO: CatalogosSelect = {
  labelNombre: 'Año del periodo reportado',
  required: true,
  primerOpcion: 'Selecciona un valor',
  catalogos: [],
}

export const MES_CATALOGO: CatalogosSelect = {
  labelNombre: 'Mes del periodo reportado',
  required: true,
  primerOpcion: 'Selecciona un valor',
  catalogos: [],
}
