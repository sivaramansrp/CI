export interface NicoInfo {
  clave_Scian: string;
  descripcion_Scian: string;
}

export const NICO_TABLA = [
  {
    encabezado: 'Clave S.C.I.A.N.',
    clave: (ele: NicoInfo): string => ele.clave_Scian,
    orden: 1,
  },
  {
    encabezado: 'Descripción del S.C.I.A.N.',
    clave: (ele: NicoInfo): string => ele.descripcion_Scian,
    orden: 2,
  },
];

export interface MercanciasInfo {
  nombreComercial: string;
  nombreComun: string;
  nombreCientifico: string;
  porcentajeConcentracion: string;
  clasificacionToxicologica: string;
  objetoImportacion: string;
  fraccionArancelaria: string;
  descripcionFraccion: string;
  unidadMedidaTarifa: string;
  cantidadUmt: string;
  cantidadUmc: string;
  paisProduccionIngredienteActivo: string;
  paisElaboracionProducto: string;
  paisProcedenciaUltimoPuerto: string;
  paisOrigen: string;
  numeroRegistroSanitario: string;
  numeroCas: string;
  estadoFisico: string;
  usoEspecifico: string;
  umc: string;
}

export const MERCANCIAS_DATA = [
  {
    encabezado: 'nombre comercial',
    clave: (ele: MercanciasInfo): string => ele.nombreComercial,
    orden: 1,
  },
  {
    encabezado: 'nombre común',
    clave: (ele: MercanciasInfo): string => ele.nombreComun,
    orden: 2,
  },
  {
    encabezado: 'nombre científico',
    clave: (ele: MercanciasInfo): string => ele.nombreCientifico,
    orden: 3,
  },
  {
    encabezado: 'porcentaje de concentración',
    clave: (ele: MercanciasInfo): string => ele.porcentajeConcentracion,
    orden: 4,
  },
  {
    encabezado: 'clasificación toxicológica',
    clave: (ele: MercanciasInfo): string => ele.clasificacionToxicologica,
    orden: 5,
  },
  {
    encabezado: 'objeto de importación',
    clave: (ele: MercanciasInfo): string => ele.objetoImportacion,
    orden: 6,
  },
  {
    encabezado: 'fracción arancelaria',
    clave: (ele: MercanciasInfo): string => ele.fraccionArancelaria,
    orden: 7,
  },
  {
    encabezado: 'descripción de la fracción',
    clave: (ele: MercanciasInfo): string => ele.descripcionFraccion,
    orden: 8,
  },
  {
    encabezado: 'unidad de medida de tarifa (umt)',
    clave: (ele: MercanciasInfo): string => ele.unidadMedidaTarifa,
    orden: 9,
  },
  {
    encabezado: 'cantidad umt',
    clave: (ele: MercanciasInfo): string => ele.cantidadUmt,
    orden: 10,
  },
  {
    encabezado: 'cantidad umc',
    clave: (ele: MercanciasInfo): string => ele.cantidadUmc,
    orden: 11,
  },
  {
    encabezado: 'país donde se produce o fabrica el ingrediente activo',
    clave: (ele: MercanciasInfo): string => ele.paisProduccionIngredienteActivo,
    orden: 12,
  },
  {
    encabezado: 'país donde se elabora el producto',
    clave: (ele: MercanciasInfo): string => ele.paisElaboracionProducto,
    orden: 13,
  },
  {
    encabezado: 'país de procedencia (último puerto embarque)',
    clave: (ele: MercanciasInfo): string => ele.paisProcedenciaUltimoPuerto,
    orden: 14,
  },
  {
    encabezado: 'país de orígen',
    clave: (ele: MercanciasInfo): string => ele.paisOrigen,
    orden: 15,
  },
  {
    encabezado: 'número de registro sanitario',
    clave: (ele: MercanciasInfo): string => ele.numeroRegistroSanitario,
    orden: 16,
  },
  {
    encabezado: 'número cas',
    clave: (ele: MercanciasInfo): string => ele.numeroCas,
    orden: 17,
  },
  {
    encabezado: 'estado físico',
    clave: (ele: MercanciasInfo): string => ele.estadoFisico,
    orden: 18,
  },
  {
    encabezado: 'uso específico',
    clave: (ele: MercanciasInfo): string => ele.usoEspecifico,
    orden: 19,
  },
  {
    encabezado: 'umc',
    clave: (ele: MercanciasInfo): string => ele.umc,
    orden: 20,
  },
];
export interface PermisoModel {
  Nombre: string;
  RFC: string;
  CURP: string;
  Telefono: number;
  CorreoElectronico: string;
  calle: string;
}
