interface Complementaria {
  numerodelicitacion: string;
  fechadelicitacion: string;
  descripcion: string;
  montoadjudicado: string;
  fechainiciovigencia: string;
  fechafinvigencia: string;
}

export const CONFIGURACION_ACCIONISTAS_TABLA = [
  {
    encabezado: 'Número de licitación',
    clave: (ele: Complementaria):string => ele.numerodelicitacion,
    orden: 1
  },
  {
    encabezado: 'Fecha de evento de licitación pública',
    clave: (ele: Complementaria):string => ele.fechadelicitacion,
    orden: 2
  },
  {
    encabezado: 'Descripción del producto ',
    clave: (ele: Complementaria): string => ele.descripcion,
    orden: 3
  },
  {
    encabezado: 'Monto adjudicado',
    clave: (ele: Complementaria):string => ele.montoadjudicado,
    orden: 4
  },
  {
    encabezado: 'Fecha inicio vigencia',
    clave: (ele: Complementaria):string => ele.fechainiciovigencia,
    orden: 5
  },
  {
    encabezado: 'Fecha fin vigencia',
    clave: (ele: Complementaria):string => ele.fechafinvigencia,
    orden: 6
  }
]
 