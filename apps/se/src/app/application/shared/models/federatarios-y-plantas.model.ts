import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';

export interface FederatariosYPlantasConfiguration<T> {
  TablaSeleccion: TablaSeleccion;
  TablaEncabezado: ConfiguracionColumna<T>[];
}

export interface FederatariosEncabezado {
  NUMBORE: string;
  PRIMER_APELLIDO: string;
  SEGUNDO_APELLIDO: string;
  NUMERO_DE_ACTA: string;
  FECHA_DEL_ACTA: string;
  NUMERO_DE_NOTARIA: string;
  ENTIDAD_FEDERATIVA: string;
  MUNICIPI_O_DELEGACION: string;
}

export interface PlantasDisponibles {
  CALLE: string;
  NUMERO_EXTERIOR: string;
  NUMERO_INTERIOR: string;
  CODIGO_POSTAL: string;
  LOCALIDAD: string;
  COLONIA: string;
  MUNICIPIO_O_DELEGACION: string;
  ENTIDAD_FEDERATIVA: string;
  PAIS: string;
  REGISTRO_FEDERAL_DE_CONTRIBUYENTES: string;
  DOMICILIO_FISCAL_DEL_SOLICITANTE: string;
  RAZON_SOCIAL: string;
}

export interface PlantasImmex {
  PLANTA: string;
  CALLE: string;
  NUMERO_EXTERIOR: string;
  NUMERO_INTERIOR: string;
  CODIGO_POSTAL: string;
  LOCALIDAD: string;
  COLONIA: string;
  DELEGACION_MUNICIPIO: string;
  ENTIDAD_FEDERATIVA: string;
  PAIS: string;
  REGISTRO_FEDERAL_DE_CONTRIBUYENTES: string;
  DOMICILIO_DEL_SOLICITANTE: string;
  RAZON_SOCIAL: string;
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

export const PLANTAS_DIPONIBLES = [
  {
    encabezado: 'Calle',
    clave: (ele: PlantasDisponibles) => ele.CALLE,
    orden: 1,
  },
  {
    encabezado: 'Número exterior',
    clave: (ele: PlantasDisponibles) => ele.NUMERO_EXTERIOR,
    orden: 2,
  },
  {
    encabezado: 'Número interior',
    clave: (ele: PlantasDisponibles) => ele.NUMERO_INTERIOR,
    orden: 3,
  },
  {
    encabezado: 'Código postal',
    clave: (ele: PlantasDisponibles) => ele.CODIGO_POSTAL,
    orden: 4,
  },
  {
    encabezado: 'Localidad',
    clave: (ele: PlantasDisponibles) => ele.LOCALIDAD,
    orden: 5,
  },
  {
    encabezado: 'Colonia',
    clave: (ele: PlantasDisponibles) => ele.COLONIA,
    orden: 6,
  },
  {
    encabezado: 'Municipio o delegación',
    clave: (ele: PlantasDisponibles) => ele.MUNICIPIO_O_DELEGACION,
    orden: 7,
  },
  {
    encabezado: 'Entidad federativa',
    clave: (ele: PlantasDisponibles) => ele.ENTIDAD_FEDERATIVA,
    orden: 8,
  },
  {
    encabezado: 'País',
    clave: (ele: PlantasDisponibles) => ele.PAIS,
    orden: 9,
  },
  {
    encabezado: 'Registro federal de contribuyentes',
    clave: (ele: PlantasDisponibles) => ele.REGISTRO_FEDERAL_DE_CONTRIBUYENTES,
    orden: 10,
  },
  {
    encabezado: 'Domicilio fiscal del solicitante',
    clave: (ele: PlantasDisponibles) => ele.DOMICILIO_FISCAL_DEL_SOLICITANTE,
    orden: 11,
  },
  {
    encabezado: 'Razón social',
    clave: (ele: PlantasDisponibles) => ele.RAZON_SOCIAL,
    orden: 12,
  },
];

export const PLANTAS_IMMEX = [
  {
    encabezado: '#Planta',
    clave: (ele: PlantasImmex) => ele.PLANTA,
    orden: 1,
  },
  {
    encabezado: 'Calle',
    clave: (ele: PlantasImmex) => ele.CALLE,
    orden: 2,
  },
  {
    encabezado: 'Número exterior',
    clave: (ele: PlantasImmex) => ele.NUMERO_EXTERIOR,
    orden: 3,
  },
  {
    encabezado: 'Número interior',
    clave: (ele: PlantasImmex) => ele.NUMERO_INTERIOR,
    orden: 4,
  },
  {
    encabezado: 'Código postal',
    clave: (ele: PlantasImmex) => ele.CODIGO_POSTAL,
    orden: 5,
  },
  {
    encabezado: 'Localidad',
    clave: (ele: PlantasImmex) => ele.LOCALIDAD,
    orden: 6,
  },
  {
    encabezado: 'Colonia',
    clave: (ele: PlantasImmex) => ele.COLONIA,
    orden: 7,
  },
  {
    encabezado: 'Delegación o municipio',
    clave: (ele: PlantasImmex) => ele.DELEGACION_MUNICIPIO,
    orden: 8,
  },
  {
    encabezado: 'Entidad federativa',
    clave: (ele: PlantasImmex) => ele.ENTIDAD_FEDERATIVA,
    orden: 9,
  },
  {
    encabezado: 'País',
    clave: (ele: PlantasImmex) => ele.PAIS,
    orden: 10,
  },
  {
    encabezado: 'Registro federal de contribuyentes',
    clave: (ele: PlantasImmex) => ele.REGISTRO_FEDERAL_DE_CONTRIBUYENTES,
    orden: 11,
  },
  {
    encabezado: 'Domicilio del solicitante',
    clave: (ele: PlantasImmex) => ele.DOMICILIO_DEL_SOLICITANTE,
    orden: 12,
  },
  {
    encabezado: 'Razón social',
    clave: (ele: PlantasImmex) => ele.RAZON_SOCIAL,
    orden: 13,
  },
];

export const TEXTO_DE_ALERTA = `Si no se encuentran plantas con los criterios de búsqueda, el domicilio marcado como fiscal, será tomado para tal efecto, lo cual estará sujeto a aprobación al momento de la visita domiciliaria`;
