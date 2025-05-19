import { ConfiguracionColumna } from "@libs/shared/data-access-user/src";

export const configuracionColumnasCupoConst: ConfiguracionColumna<any>[] = [
  {
    encabezado: 'Nombre de producto',
    clave: (elemento: any) => elemento.descripcion,
    orden: 1,
  },
  {
    encabezado: 'Nombre del subproducto',
    clave: () => '',
    orden: 2,
  },
  {
    encabezado: 'Mecanismo de asignación',
    clave: (elemento: any) => elemento.tipoAsignacion,
    orden: 3,
  },
  {
    encabezado: 'Fracciones arancelarias',
    clave: (elemento: any) => Array.isArray(elemento.fracciones) ? elemento.fracciones.join(', ') : elemento.fracciones,
    orden: 4,
  },
  {
    encabezado: 'Tipo cupo',
    clave: (elemento: any) => elemento.tipoCupo,
    orden: 5,
  },
];

export const NOTA = {
  CAMPO_OBLIGATORIO_NO_ENCONTRADO: 'Seleccione la representación federal antes de realizar la búsqueda de cupos.',
  TITULO_ALERTA: 'Para continuar con el proceso del trámite deberá seleccionar un registro dando doble click'
}

export const CLASE_TEXTO_CENTRADO = 'text-center';