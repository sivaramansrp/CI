/**
 * Constante que define los pasos del wizard en el trámite.
 * 
 * Esta constante contiene un array de objetos que representan los pasos del wizard,
 * incluyendo su índice, título, y estado (activo o completado).
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
    indice: 4,
    titulo: 'Firmar solicitud',
    activo: false,
    completado: false,
  },
];

/**
 * Textos utilizados en el trámite.
 * 
 * Esta constante contiene textos como instrucciones o mensajes que se muestran
 * en la interfaz del usuario.
 */
export const TEXTOS = {
  TIPO_CARGO: ` El archivo no debe exceder los 1000 registros. Para descargar plantilla del archivo de excel de click <span class="">*</span><br />
     <label><a href="javascript:void(0);"> Descargar plantilla</a></label>
        `,
  TERCEROS_TEXTO_DE_ALERTA: 'La solicitud ha quedado registrada con el número temporal 202767903 Éste no tiene validez legal y sirve solamente para efectos de identificar tu solicitud. Un folio oficial le será asignado a la solicitud al momento en que ésta sea firmada.',
  SELECTOR_DESPERDICIO: `
  <input type="checkbox" formControlName="selectorDesperdicio" /><span class="require">*</span>No es posible declarar el porcentaje que representa la mercancia a destruir, de la mercancia importada temporalmente de la que procede
  `
};
/**
 * Configuración para la fecha de ingreso.
 * 
 * Define las propiedades de la fecha de ingreso, como el nombre de la etiqueta, si es requerida y si está habilitada.
 */
export const FECHA_INGRESO = {
  labelNombre: 'Fecha de programada del traslado',
  required: true,
  habilitado: true,
};

/**
 * Tipos de aviso disponibles.
 * 
 * Define los valores y etiquetas para los tipos de aviso.
 */
export const TIPAVI = [
  {
    value: 'nohabitual',
    label: 'No habitual',
  },
  {
    value: 'periodica',
    label: 'Periodica',
  }
];
/**
 * Tipos de carga disponibles.
 * 
 * Define los valores y etiquetas para los tipos de carga.
 */
export const TIPACA = [
  {
    value: 'manual',
    label: 'Manual',
  },
  {
    value: 'carga_masiva',
    label: 'Carga Masiva',
  }
];

