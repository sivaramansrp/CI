import { LicitacionResponse, ParticipanteLicitacion } from "../models/solicitud.model";

export const ID_PROCEDIMIENTO = 120501;

export const CONFIGURACION_ACCIONISTAS_TABLA = [
    {
    encabezado: '',
    clave: (ele: LicitacionResponse):number => ele.idAsignacion,
    orden: 1
  },
  {
    encabezado: 'Número de licitación',
    clave: (ele: LicitacionResponse):string => ele.numeroLicitacion,
    orden: 1
  },
  {
    encabezado: 'Fecha de evento de licitación pública',
    clave: (ele: LicitacionResponse):string => ele.fechaConcurso,
    orden: 2
  },
  {
    encabezado: 'Descripción del producto ',
    clave: (ele: LicitacionResponse): string => ele.nombreProducto,
    orden: 3
  },
  {
    encabezado: 'Monto adjudicado',
    clave: (ele: LicitacionResponse):number => ele.montoAdjudicado,
    orden: 4
  },
  {
    encabezado: 'Fecha inicio vigencia',
    clave: (ele: LicitacionResponse):string => ele.fechaInicioVigencia,
    orden: 5
  },
  {
    encabezado: 'Fecha fin vigencia',
    clave: (ele: LicitacionResponse):string => ele.fechaFinVigenciaAprobada,
    orden: 6
  }
]
 
export const CONFIGURACION_ACCIONISTAS = [
  {
    encabezado: 'Registro Federal de Contribuyentes ',
    clave: (ele: ParticipanteLicitacion):string => ele.rfc,
    orden: 1
  },
]