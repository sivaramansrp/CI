export enum InputTypes { 
  SELECT = 'select',
  TEXT = 'text',
  BREAK_CONTENT = 'break-content',
  DATE = 'date',
  RADIO = 'radio',
}

export const SECCIONES_TRAMITE = {
  PASO_1: {
    VALIDACION_SECCION_1: false,
    VALIDACION_SECCION_2: true,
    VALIDACION_SECCION_3: false,
  },
  PASO_2: {
    VALIDACION_SECCION: false,
  }
};