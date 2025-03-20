interface compliMentaria {
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
        clave: (ele: compliMentaria) => ele.numerodelicitacion,
        orden: 1
      },
      {
        encabezado: 'Fecha de evento de licitación pública',
        clave: (ele: compliMentaria) => ele.fechadelicitacion,
        orden: 2
      },
      {
        encabezado: 'Descripción del producto ',
        clave: (ele: compliMentaria) => ele.descripcion,
        orden: 3
      },
      {
        encabezado: 'Monto adjudicado',
        clave: (ele: compliMentaria) => ele.montoadjudicado,
        orden: 4
      },
      {
        encabezado: 'Fecha inicio vigencia',
        clave: (ele: compliMentaria) => ele.fechainiciovigencia,
        orden: 5
      },
      {
        encabezado: 'Fecha fin vigencia',
        clave: (ele: compliMentaria) => ele.fechafinvigencia,
        orden: 6
      }
]
 