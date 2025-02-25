interface Complimentaria {
  numerodelicitacion: string;
  fechadelicitacion: string;
  descripcion: string;
  montoadjudicado: string;
  fechainiciovigencia: string;
  fechafinvigencia: string;
}

export const CONFIGURACION_ACCIONISTAS = [
    {
        encabezado: 'Número de licitación',
        clave: (ele: Complimentaria) => ele.numerodelicitacion,
        orden: 1
      },
      {
        encabezado: 'Fecha de evento de licitación pública',
        clave: (ele: Complimentaria) => ele.fechadelicitacion,
        orden: 2
      },
      {
        encabezado: 'Descripción del producto ',
        clave: (ele: Complimentaria) => ele.descripcion,
        orden: 3
      },
      {
        encabezado: 'Monto adjudicado',
        clave: (ele: Complimentaria) => ele.montoadjudicado,
        orden: 4
      },
      {
        encabezado: 'Fecha inicio vigencia',
        clave: (ele: Complimentaria) => ele.fechainiciovigencia,
        orden: 5
      },
      {
        encabezado: 'Fecha fin vigencia',
        clave: (ele: Complimentaria) => ele.fechafinvigencia,
        orden: 6
      }
]
 