import { DatosDelContenedor, GridContenedores } from "@libs/shared/data-access-user/src/core/models/11202/datos-tramite.model";
import { ConfiguracionColumna } from "@libs/shared/data-access-user/src";

/**
 * @constant PASOS
 * @description Representa los pasos del trámite 11202.
 * 
 * Cada paso contiene información sobre su índice, título, estado de actividad y estado de completado.
 * 
 * @property {number} indice - Índice del paso.
 * @property {string} titulo - Título del paso.
 * @property {boolean} activo - Indica si el paso está activo.
 * @property {boolean} completado - Indica si el paso está completado.
 */
export const PASOS = [
  {
    indice: 1,
    titulo: 'Capturar solicitud',
    activo: true,
    completado: true,
  },
  {
    indice: 2,
    titulo: 'Anexar requisitos',
    activo: false,
    completado: false,
  },
  {
    indice: 3,
    titulo: 'Firmar solicitud',
    activo: false,
    completado: false,
  },
];
/**
 * @constant TEXTOS_REQUISITOS
 * @description Contiene los textos de las instrucciones y requisitos del trámite.
 * 
 * @property {string} INSTRUCCIONES - Texto con las instrucciones para el trámite.
 */
export const TEXTOS_REQUISITOS = {
  INSTRUCCIONES: `<h6>Instrucciones</h6>
      <p>- La solicitud ha quedado registrada con el número temporal 67922457.</p>
      <p>- Éste no tiene validez legal y será solamente para efectos de identificar tu solicitud.</p>
      <p>- Un folio oficial le sera asignado a la solicitud al momento en que ésta sea firmada.</p>`,
};

/**
 * @constant ENCABEZADO_DE_TABLA
 * @description Configuración de las columnas de la tabla para mostrar información detallada de los contenedores.
 * 
 * Cada columna contiene un encabezado, una clave para acceder a los datos y un orden de visualización.
 * 
 * @property {string} encabezado - Título de la columna.
 * @property {function} clave - Función para acceder al valor de la columna.
 * @property {number} orden - Orden de visualización de la columna.
 */
export const ENCABEZADO_DE_TABLA: ConfiguracionColumna<DatosDelContenedor>[] = [
  { encabezado: '', clave: (artículo) => artículo.id, orden: 1 },
  { encabezado: 'Iniciales del equipo', clave: (artículo) => artículo.inicialesEquipo, orden: 1 },
  { encabezado: 'Número de equipo', clave: (artículo) => artículo.numeroEquipo, orden: 2 },
  { encabezado: 'Dígito Verificador', clave: (artículo) => artículo.digitoVerificador, orden: 3 },
  { encabezado: 'Tipo de equipo', clave: (artículo) => artículo.tipoEquipo, orden: 4 },
  { encabezado: 'Aduana', clave: (artículo) => artículo.aduana, orden: 5 },
  { encabezado: 'Fecha Ingreso', clave: (artículo) => artículo.fechaIngreso, orden: 6 },
  { encabezado: 'Vigencia', clave: (artículo) => artículo.vigencia, orden: 7 },
  { encabezado: 'Estado de constancia', clave: (artículo) => artículo.estadoConstancia, orden: 8 },
  { encabezado: 'Existe en VUCEM', clave: (artículo) => artículo.existeEnVUCEM, orden: 9 },
  { encabezado: 'Id constancia', clave: (artículo) => artículo.idConstancia, orden: 10 },
  { encabezado: 'Número manifiesto', clave: (artículo) => artículo.numeroManifiesto, orden: 11 },
  { encabezado: 'Id solicitud', clave: (artículo) => artículo.idSolicitud, orden: 12 },
  { encabezado: 'Fecha inicio', clave: (artículo) => artículo.fechaInicio, orden: 13 }
];
/**
 * @constant GRID_CONTENEDORES
 * @description Configuración de las columnas de la tabla para mostrar información de los contenedores en formato de grid.
 * 
 * Cada columna contiene un encabezado, una clave para acceder a los datos y un orden de visualización.
 * 
 * @property {string} encabezado - Título de la columna.
 * @property {function} clave - Función para acceder al valor de la columna.
 * @property {number} orden - Orden de visualización de la columna.
 */
export const GRID_CONTENEDORES: ConfiguracionColumna<GridContenedores>[] = [
  { encabezado: '', clave: (artículo) => artículo.id, orden: 1 },
  { encabezado: 'Iniciales del equipo', clave: (artículo) => artículo.inicialesContenedor, orden: 1 },
  { encabezado: 'Número de equipo', clave: (artículo) => artículo.numeroContenedor, orden: 2 },
  { encabezado: 'Dígito Verificador', clave: (artículo) => artículo.digitoVerificador, orden: 3 },
  { encabezado: 'Tipo de equipo', clave: (artículo) => artículo.tipoContenedor, orden: 4 },
  { encabezado: 'Aduana', clave: (artículo) => artículo.aduana, orden: 5 },
  { encabezado: 'Estado de constancia', clave: (artículo) => artículo.estadoConstancia, orden: 8 },
  { encabezado: 'Existe en VUCEM', clave: (artículo) => artículo.existeEnVUCEM, orden: 9 },
  { encabezado: 'Id constancia', clave: (artículo) => artículo.idConstancia, orden: 10 },
];