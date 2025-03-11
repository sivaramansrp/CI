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
  // {
  //   indice: 2,
  //   titulo: 'Requisitos necesarios',
  //   activo: false,
  //   completado: false,
  // },
  {
    indice: 2,
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
    encabezado: 'Fracción NALADI',
    clave: (ele: Mercancia) : string | undefined => ele.fraccionNaladi,
    orden: 1,
  },
  {
    encabezado: 'Fracción NALADISA93',
    clave: (ele: Mercancia) : string | undefined => ele.fraccionNaladiSa93,
    orden: 2,
  },
  {
    encabezado: 'Fracción NALADISA96',
    clave: (ele: Mercancia) : string | undefined => ele.fraccionNaladiSa96,
    orden: 3,
  },
  {
    encabezado: 'Fracción NALADISA02',
    clave: (ele: Mercancia): string | undefined => ele.fraccionNaladiSa02,
    orden: 4,
  },
  {
    encabezado:'Nombre técnico',
    clave:(ele:Mercancia):string | undefined => ele.nombreTecnico,
    orden: 5,
  },
  {
    encabezado:'Nombre comercial',
    clave:(ele:Mercancia):string | undefined => ele.nombreComercial,
    orden: 5,

  }
];
