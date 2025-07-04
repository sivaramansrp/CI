/**
 * PASOS_EXPORTACION
 * Contiene los pasos necesarios para completar el formulario de solicitud de exportación.
 * Cada objeto representa un paso dentro del proceso de captura y envío de información,
 * incluyendo su estado actual (`activo`) y si ya fue completado (`completado`).
 */
export const PASOS_EXPORTACION = [
  /**
   * Paso 1: Captura de la solicitud.
   * - Este paso permite al usuario ingresar los datos necesarios de la empresa.
   * - Se marca como activo y completado por defecto al iniciar el proceso.
   */
  {
    indice: 1,
    titulo: 'Capturar solicitud',
    activo: true,
    completado: true,
  },

  /**
   * Paso 2: Anexar los documentos o requisitos necesarios.
   * - Este paso aún no está activo ni completado.
   * - El usuario debe cargar la documentación requerida para continuar.
   */
  {
    indice: 2,
    titulo: 'Anexar requisitos',
    activo: false,
    completado: false,
  },

  /**
   * Paso 3: Firma electrónica de la solicitud.
   * - Último paso del proceso.
   * - Permite validar oficialmente la información ingresada mediante firma electrónica.
   */
  {
    indice: 3,
    titulo: 'Firmar solicitud',
    activo: false,
    completado: false,
  },
];
