import { SustanciaSensible } from "../models/tramies230401.models";

export const CROSLISTA_DE_PAISES: string[] = [
    "AFGANISTÁN (EMIRATO ISLÁMICO)",
    "ALBANIA (REPÚBLICA DE)",
    "ALEMANIA (REPÚBLICA FEDERAL DE)",
    "ANDORRA (PRINCIPADO DE)",
    "ANGOLA (REPÚBLICA DE)",
    "ANGUILLA",
    "ANTIGUA Y BARBUDA",
    "ARABIA SAUDITA (COMUNIDAD ECONÓMICA EUROPEA)",
    "ARGELIA (REPÚBLICA DEMOCRÁTICA Y POPULAR DE)",
    "ARGENTINA (REPÚBLICA)",
    "AUSTRALIA (COMMONWEALTH OF)",
    "AUSTRIA (REPUBLIC OF)",
    "BAHAMAS (COMMONWEALTH OF THE)",
    "BAHRAIN (KINGDOM OF)",
    "BANGLADESH (PEOPLE'S REPUBLIC OF)",
    "BARBADOS",
    "BELGIUM (KINGDOM OF)",
    "BELIZE",
    "BENIN (REPUBLIC OF)",
    "BHUTAN (KINGDOM OF)"
  ];

export const TEXTOS_REQUISITOS = {
  INSTRUCCIONES: `<h6>Instrucciones</h6>
      <p>- De acuerdo al caso particular, algunos documentos podrían ser obligatorios</p>
      <p>- En caso de que no requieras algún documento, selecciónalo y elimínalo</p>
      <p>- Si necesitas anexar más de un documento del mismo tipo selecciónalo de la lista y presiona "Agregar nuevo".</p>`,
  ADJUNTAR: `<p>Si deseas adjuntar un nuevo documento, selecciona la opción --Adjuntar nuevo documento-- y presiona el botón "Adjuntar documentos"</p>`,
};

/**
* Interfaz para definir la acción y el valor del botón.
* @interface AccionBoton
* @property {string} accion - La acción del botón ('cont' o 'atras').
* @property {number} valor - El índice del paso al que se navega.
*/
export interface AccionBoton {
  accion: string;
  valor: number;
}

  export const LISTA_DE_ENTRADA_PERSONALIZADA: string[] = [
    "ACAPULCO, PUERTO Y AEROPUERTO",
    "ADUANA DE PANTACO",
    "AEROPUERTO INT. DE LA CD DE MEXICO",
    "AEROPUERTO INTERNACIONAL FELIPE ANGELES",
    "AGUA PRIETA",
    "AGUASCALIENTES, AGS.",
    "ALTAMIRA",
    "CANCUN, AEROPUERTO",
    "CD. CAMARGO, TAMPS.",
    "CD. DEL CARMEN, CAMP.",
    "CD. JUAREZ, CHIHUAHUA, CHIH."
  ];

/** "t" se utiliza para continuar el botón que se usa globalmente para el procedimiento 230401 */
  export const CONTINUAR: string = "t";

/**
* Secciones a mostrar dentro de cada Paso de acuerdo al trámite
*/
export const SECCIONES_TRAMITE_230401 = {
  PASO_1: {
    VALIDACION_SECCION_1: false,
    VALIDACION_SECCION_2: true,
    VALIDACION_SECCION_3: true,
  },
  PASO_2: {
    VALIDACION_SECCION: true,
  },
  PASO_3: {
    requiereValidacion: true,
  },
};

/**
 * Configuración de las sustancias sensibles utilizada para definir las propiedades
 * y el orden de las columnas en una tabla o vista relacionada con sustancias sensibles.
 * 
 * Cada objeto en la configuración representa una columna con las siguientes propiedades:
 * - `encabezado`: El título o nombre de la columna que se mostrará en la interfaz de usuario.
 * - `clave`: Una función que toma un objeto de tipo `SustanciaSensible` y devuelve el valor
 *   correspondiente para esa columna.
 * - `orden`: El número que indica la posición de la columna en la tabla o vista.
 */
export const CONFIGURACION_SUSTANCIAS_SENSIBLES = [
  {
    encabezado: 'Número CAS',
    clave: (ele: SustanciaSensible): string | undefined => ele.numeroCAS,
    orden: 1,
  },
  {
    encabezado: 'C.A.S',
    clave: (ele: SustanciaSensible): string | undefined => ele.cas,
    orden: 2,
  },
  {
    encabezado: 'Descripción no arancelaria',
    clave: (ele: SustanciaSensible): string | undefined => ele.descripcionNoArancelaria,
    orden: 3,
  },
  {
    encabezado: 'Nombre químico',
    clave: (ele: SustanciaSensible): string | undefined => ele.nombreQuimico,
    orden: 4,
  },
];