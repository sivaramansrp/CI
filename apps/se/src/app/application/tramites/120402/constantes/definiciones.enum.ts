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

/**
 * Contenido del aviso de privacidad simplificado.
 * @const
 * @type {string}
 * @description
 * Este contenido se muestra al usuario para informarle sobre el tratamiento de sus datos personales.
 */
export const PRIVACY_NOTICE_CONTENT = `
  <div class="my-4">
  <div class="text-center">
    <h4 class="mb-4">Aviso de privacidad simplificado</h4>
    </div>
    <div>
    <p class="text-justify">
      El Servicio de Administración Tributaria (SAT), es el sujeto obligado y responsable del tratamiento de los datos personales que se recaban a través de la Ventanilla Digital Mexicana de Comercio Exterior (VUCEM), los datos personales podrán ser utilizados y transferidos a la autoridades competentes, con la finalidad de llevar a cabo cualquier trámite relacionado con importaciones, exportaciones y tránsito de mercancías de comercio exterior, incluyendo las regulaciones y restricciones no arancelarias que, conforme a la legislación aplicable, sea exigido por las autoridades competentes en materia de comercio exterior y/o consultar información sobre los procedimientos para la importación, exportación y tránsito de mercancías de comercio exterior, incluyendo las regulaciones y restricciones no arancelarias, así como las notificaciones que se deriven de dichos trámites y serán protegidos, incorporados y tratados en el sistema de datos personales de la VUCEM, asimismo podrán ser transmitidos a las autoridades competentes establecidas en el Decreto por el que se establece la Ventanilla Digital Mexicana de Comercio Exterior, publicado en el Diario Oficial de la Federación el 14 de enero de 2011, así como al propio titular de la información. El titular, en su caso, podrá manifestar su negativa para el tratamiento de sus datos personales para finalidades y transferencias de los mismos que requieran el consentimiento del titular. Si desea conocer nuestro aviso de privacidad integral, lo podrá consultar en el portal.
    </p>
    </div>
    <div class="text-center">
      <a class="text-primary" style="cursor: pointer;" (click)="seccionStore.establecerSeccion([false])">
        Aviso de privacidad integral
      </a>
    </div>
  </div>
`;
