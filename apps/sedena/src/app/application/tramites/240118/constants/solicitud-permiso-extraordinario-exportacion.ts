// PASOS representa las etapas que conforman el proceso del trámite
export const PASOS = [
  {
    indice: 1,
    titulo: 'Capturar solicitud', // Paso 1: Capturar la información de la solicitud
    activo: true, // Este paso está activo actualmente
    completado: true, // Ya se ha completado este paso
  },
  {
    indice: 2,
    titulo: 'Anexar requisitos', // Paso 2: Subir o anexar los documentos requeridos
    activo: false, // Este paso aún no está activo
    completado: false, // Este paso no ha sido completado
  },
  {
    indice: 3,
    titulo: 'Firmar solicitud', // Paso 3: Firmar electrónicamente la solicitud
    activo: false, // Este paso aún no está activo
    completado: false, // Este paso no ha sido completado
  },
];

// Título del mensaje principal mostrado al usuario durante el trámite
export const TITULOMENSAJE =
  'Solicitud Permiso extraordinario para la exportación de sustancias químicas';

// Texto explicativo que se muestra una vez registrada la solicitud
export const TEXTOS_REQUISITOS =
  'La solicitud ha quedado registrada con el número temporal [202767640]. Este no tiene validez legal y sirve solamente para efectos de identificar tu Solicitud. Un folio oficial le será asignado a la solicitud al momento en que esta sea firmada.';

// Identificador único del procedimiento administrativo
export const ID_PROCEDIMIENTO = 240118;
