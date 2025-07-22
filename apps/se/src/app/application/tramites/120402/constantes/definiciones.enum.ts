import { ConfiguracionColumna } from "@libs/shared/data-access-user/src";

/**
 * Interfaz que define la estructura de un elemento de cupo.
 */
interface CupoElemento {
  /** Descripción del producto o servicio asociado al cupo */
  descripcion: string;

  /** Tipo de mecanismo de asignación del cupo (por ejemplo, subasta, asignación directa, etc.) */
  tipoAsignacion: string;

  /** Lista o cadena que representa las fracciones arancelarias asociadas al cupo */
  fracciones: string[] | string;

  /** Tipo de cupo (por ejemplo, general, específico, etc.) */
  tipoCupo: string;
}

/**
 * Configuración de las columnas utilizadas para mostrar información de los elementos de cupo en una tabla.
 * Cada objeto representa una columna con su encabezado, la clave para extraer el valor correspondiente del elemento,
 * y el orden en el que debe mostrarse.
 */
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
    clave: (elemento: CupoElemento) => 
      Array.isArray(elemento.fracciones)
        ? elemento.fracciones.join(', ')
        : elemento.fracciones,
    orden: 4,
  },
  {
    encabezado: 'Tipo cupo',
    clave: (elemento: CupoElemento) => elemento.tipoCupo,
    orden: 5,
  },
];

/**
 * Objeto que contiene mensajes constantes utilizados en el sistema para mostrar alertas o notas al usuario
 * relacionadas con la gestión de cupos.
 */
export const NOTA = {
  /** Mensaje mostrado cuando no se ha seleccionado una representación federal requerida para la búsqueda */
  CAMPO_OBLIGATORIO_NO_ENCONTRADO: 'Seleccione la representación federal antes de realizar la búsqueda de cupos.',

  /** Título de la alerta mostrada al usuario cuando se requiere seleccionar un registro para continuar */
  TITULO_ALERTA: 'Para continuar con el proceso del trámite deberá seleccionar un registro dando doble click',

  /** Texto del botón o mensaje mostrado cuando hay un error de registro debido a campos faltantes */
  CONTINUAR_BUTTON_ALERT: '¡Error de registro! Faltan campos por capturar.',
}

/**
 * Clase CSS utilizada para centrar el texto en componentes de la interfaz de usuario.
 */
export const CLASE_TEXTO_CENTRADO = 'text-center';


/**
 * @description
 * Mensaje de alerta en formato HTML que se muestra cuando faltan campos por capturar en un formulario.
 * Utiliza clases de Bootstrap para centrar y alinear el contenido visualmente.
 *
 * @example
 * // Uso típico:
 * mostrarAlerta(ERROR_FORMA_ALERT);
 */
export const ERROR_FORMA_ALERT =
  `
<div class="d-flex justify-content-center text-center">
  <div>
    <div class="col-md-12">
      <b>¡Error de registro!</b> Faltan campos por capturar.
    </div>
  </div>
</div>
`
