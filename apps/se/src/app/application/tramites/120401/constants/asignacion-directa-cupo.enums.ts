import {
    SeleccionDelCupoTabla
} from '../models/asignacion-directa-cupo.model';


export const CONFIGURACION_BITACORA_TABLA = [
  {
    encabezado: 'Nombre de producto',
    clave: (ele: SeleccionDelCupoTabla) : string | undefined => ele.nombreProducto,
    orden: 1,
  },
  {
    encabezado: 'Nombre del subproducto',
    clave: (ele: SeleccionDelCupoTabla) : string | undefined => ele.nombreSubproducto,
    orden: 2,
  },
  {
    encabezado: 'Mecanismo de asignacións',
    clave: (ele: SeleccionDelCupoTabla) : string | undefined => ele.mecanismoAsignacion,
    orden: 3,
  },
  {
    encabezado: 'Fracciones arancelarias',
    clave: (ele: SeleccionDelCupoTabla): string | undefined => ele.fraccionesArancelarias,
    orden: 4,
  },
  {
    encabezado: 'Tipo cupos',
    clave: (ele: SeleccionDelCupoTabla): string | undefined => ele.tipoCupo,
    orden: 4,
  },
];
