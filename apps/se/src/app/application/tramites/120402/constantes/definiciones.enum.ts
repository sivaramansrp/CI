import { ConfiguracionColumna } from "@libs/shared/data-access-user/src";

interface CupoElemento {
  descripcion: string;
  tipoAsignacion: string;
  fracciones: string[] | string;
  tipoCupo: string;
}

export const CONFIGURACION_COLUMNAS_CUPO_CONST: ConfiguracionColumna<CupoElemento>[] = [
  {
    encabezado: 'Nombre de producto',
    clave: (elemento: CupoElemento) => elemento.descripcion,
    orden: 1,
  },
  {
    encabezado: 'Nombre del subproducto',
    clave: () => '',
    orden: 2,
  },
  {
    encabezado: 'Mecanismo de asignación',
    clave: (elemento: CupoElemento) => elemento.tipoAsignacion,
    orden: 3,
  },
  {
    encabezado: 'Fracciones arancelarias',
    clave: (elemento: CupoElemento) => Array.isArray(elemento.fracciones) ? elemento.fracciones.join(', ') : elemento.fracciones,
    orden: 4,
  },
  {
    encabezado: 'Tipo cupo',
    clave: (elemento: CupoElemento) => elemento.tipoCupo,
    orden: 5,
  },
];

export const NOTA = {
  CAMPO_OBLIGATORIO_NO_ENCONTRADO: 'Seleccione la representación federal antes de realizar la búsqueda de cupos.',
  TITULO_ALERTA: 'Para continuar con el proceso del trámite deberá seleccionar un registro dando doble click',
  CONTINUAR_BUTTON_ALERT: '¡Error de registro! Faltan campos por capturar.',
}

export const CLASE_TEXTO_CENTRADO = 'text-center';