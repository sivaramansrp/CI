/** paasoextraction contiene los datos necesarios de la empresa para el formulario */
export const PASOS_EXPORTACION = [
    /** Paso 1: Captura de solicitud, activo y ya completado */
    {
      indice: 1,
      titulo: 'Capturar solicitud',
      activo: true,
      completado: true,
    },
    /** Paso 2: Anexar documentos, aún inactivo y no completado */
    {
      indice: 2,
      titulo: 'Anexar requisitos',
      activo: false,
      completado: false,
    },
    /** Paso 3: Firma electrónica de la solicitud, aún inactivo y no completado */
    {
      indice: 3,
      titulo: 'Firmar solicitud',
      activo: false,
      completado: false,
    },
  ];
  