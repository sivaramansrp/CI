import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';

export interface FederatariosYPlantasConfiguration<T> {
  FederatariosTablaSeleccion: TablaSeleccion;
  FederatariosTablaEncabezado: ConfiguracionColumna<T>[];
}

export interface FederatariosEncabezado {
  //Nombre(s)  Primer apellido  Segundo apellido  Número de acta  Fecha del acta  Número de notaría  Entidad federativa  Municipio o delegación

  NUMBORE: string;
  PRIMER_APELLIDO: string;
  SEGUNDO_APELLIDO: string;
  NUMERO_DE_ACTA: string;
  FECHA_DEL_ACTA: string;
  NUMERO_DE_NOTARIA: string;
  ENTIDAD_FEDERATIVA: string;
  MUNICIPI_O_DELEGACION: string;
}

export const FEDERATARIOS = [
  {
    encabezado: 'Nombre(s)',
    clave: (ele: FederatariosEncabezado) => ele.NUMBORE,
    orden: 1,
  },
  {
    encabezado: 'Primer apellido',
    clave: (ele: FederatariosEncabezado) => ele.PRIMER_APELLIDO,
    orden: 2,
  },
  {
    encabezado: 'Segundo apellido',
    clave: (ele: FederatariosEncabezado) => ele.SEGUNDO_APELLIDO,
    orden: 3,
  },
  {
    encabezado: 'Número de acta',
    clave: (ele: FederatariosEncabezado) => ele.NUMERO_DE_ACTA,
    orden: 4,
  },
  {
    encabezado: 'Fecha del acta',
    clave: (ele: FederatariosEncabezado) => ele.FECHA_DEL_ACTA,
    orden: 5,
  },
  {
    encabezado: 'Número de notaría',
    clave: (ele: FederatariosEncabezado) => ele.NUMERO_DE_NOTARIA,
    orden: 6,
  },
  {
    encabezado: 'Entidad federativa',
    clave: (ele: FederatariosEncabezado) => ele.ENTIDAD_FEDERATIVA,
    orden: 7,
  },
  {
    encabezado: 'Municipio o delegación',
    clave: (ele: FederatariosEncabezado) => ele.MUNICIPI_O_DELEGACION,
    orden: 8,
  },
];
