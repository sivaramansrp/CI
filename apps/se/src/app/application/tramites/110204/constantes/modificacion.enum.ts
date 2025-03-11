import {
  Mercancia,
} from '../models/plantas-consulta.model';

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
export enum TablaSeleccion {
  CHECKBOX = 'CHECKBOX',
  RADIO = 'RADIO',
  UNDEFINED = 'undefined',
}


export const CONFIGURACION_MERCANCIA = [
  {
    encabezado: 'Tipo modificación',
    clave: (ele: Mercancia) : string | undefined => ele.tipoModificion,
    orden: 1,
  },
  {
    encabezado: 'Fecha modificación',
    clave: (ele: Mercancia) : string | undefined => ele.fetchModificion,
    orden: 2,
  },
  {
    encabezado: 'Valores anteriores',
    clave: (ele: Mercancia) : string | undefined => ele.valoresAnteriores,
    orden: 3,
  },
  {
    encabezado: 'Valores nuevos',
    clave: (ele: Mercancia): string | undefined => ele.valoresNuevos,
    orden: 4,
  },
];

export const TITULOMENSAJE =
  'Registro de solicitud de modificación programa IMMEX (Modificación Alta a domicilio de una planta, bodega o almacén)';
export const TEXTOS_REQUISITOS =
  'La solicitud ha quedado registrada con el número temporal [202767640]. Este no tiene validez legal y sirve solamente para efectos de identificar tu Solicitud. Un folio oficial le será asignado a la solicitud al momento en que esta sea firmada.';
