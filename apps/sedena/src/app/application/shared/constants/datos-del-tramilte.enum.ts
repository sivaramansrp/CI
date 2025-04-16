export const CROSLISTA_ADUANAS_DISPONIBLES: string[] = [
  'ACAPULCO, PUERTO Y AEROPUERT',
  'ADUANA DE PANTACO',
  'AEROPUERTO INT. DE LA CD DE MEX',
  'AEROPUERTO INTERNACIONAL FELIP',
  'AGUA PRIETA',
  'AGUASCALIENTES, AGS.',
  'ALTAMIRA',
  'CANCUN, AEROPUERTO',
  'CD. CAMARGO, TAMPS.',
  'CD. DEL CARMEN',
  'CD. JUAREZ',
  'CHIHUAHUA, CHIH.',
];

/**
 * @constant PERMISO_DEFINITIVO_TITULO
 * @description Constante que contiene un arreglo de identificadores numéricos
 * relacionados con los permisos definitivos. Estos valores representan códigos
 * específicos utilizados en el sistema para identificar tipos de permisos.
 */
export const PERMISO_DEFINITIVO_TITULO = [240119, 240118];

/**
 * Constante que representa un conjunto de identificadores numéricos 
 * asociados a etiquetas específicas de países dentro del sistema.
 * 
 * @constant
 * @type {number[]}
 * @description Utilizado para identificar y manejar etiquetas relacionadas 
 * con países en el flujo de trabajo de la aplicación.
 */
export const PAISE_DENTINO_EITIQUETA = [240119, 240118];

/**
 * Constante que representa el período del semestre habilitado.
 * 
 * @constant
 * @type {number[]}
 * @description Contiene un arreglo de números que identifican el semestre habilitado.
 * Este valor puede ser utilizado para validar o configurar funcionalidades relacionadas
 * con el período académico activo.
 */
export const PERIODO_SEMESTRE_HABILITADO = [240119, 240108];

/**
 * Constante que representa el período del primer semestre.
 * 
 * Contiene un arreglo de objetos con las siguientes propiedades:
 * - `label`: Etiqueta descriptiva del período (por ejemplo, "1° semestre").
 * - `value`: Valor asociado al período (por ejemplo, "unoSemestre").
 * 
 * Esta constante puede ser utilizada para desplegar opciones en un formulario
 * o para manejar datos relacionados con el primer semestre en la aplicación.
 */
export const PERIODO_UNO_SEMESTRE = [
  {
    label: '1° semestre',
    value: 'unoSemestre',
  }
];

/**
 * Constante que representa el período del segundo semestre.
 * Contiene un arreglo de objetos con las propiedades:
 * - `label`: Etiqueta descriptiva del período (en este caso, '2° semestre').
 * - `value`: Valor asociado al período (en este caso, 'dosSemestre').
 */
export const PERIODO_DOS_SEMESTRE = [
  {
    label: '2° semestre',
    value: 'dosSemestre',
  }
];

/**
 * Mapa que asocia claves de tipo string con arreglos de números.
 * 
 * Este mapa se utiliza para representar datos relacionados con un trámite específico.
 * Cada clave representa un identificador único del trámite, mientras que el valor asociado
 * es un arreglo de números que contiene información relevante para ese trámite.
 * 
 * Claves disponibles:
 * - 'unoSemestre': Representa datos del primer semestre.
 * - 'dosSemestre': Representa datos del segundo semestre.
 * - 'anoEnCurso': Representa datos del año en curso.
 * 
 * Ejemplo de uso:
 * ```typescript
 * const datos = DATOS_DEL_TRAMITE_MAP.get('unoSemestre');
 * console.log(datos); // [240119]
 * ```
 */
export const DATOS_DEL_TRAMITE_MAP: Map<string, number[]> = new Map([
  ['unoSemestre', [240119]],
  ['dosSemestre', [240119]],
  ['anoEnCurso', [240119]],
]);

/**
 * Lista de IDs de países en los que se debe ocultar la opción "Agregar mercancía"
 * 
 * @constant
 * @type {number[]}
 */
export const AGGREGAR_MERCANCIA_PAISE_OCULTAR = [240108];
