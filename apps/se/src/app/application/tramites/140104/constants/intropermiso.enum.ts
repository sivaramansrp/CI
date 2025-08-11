/**
 * @description Constante que define los pasos del formulario.
 * Cada objeto representa un paso con su índice, título, estado activo y completado.
 * @constant {Array<Object>} PASOS
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
    }
];
/**
 * Contiene los textos HTML utilizados en la sección de requisitos del trámite.
 * Proporciona instrucciones para adjuntar, eliminar o agregar documentos según el caso.
 * Estos textos se muestran como contenido estático en el frontend.
 */
export const TEXTOS_REQUISITOS = {
    INSTRUCCIONES: `<h6>Instrucciones</h6>
    <p>- De acuerdo al caso particular, algunos documentos podrían ser obligatorios</p>
    <p>- En caso de que no requieras algún documento, selecciónalo y elimínalo</p>
    <p>- Si necesitas anexar más de un documento del mismo tipo selecciónalo de la lista y presiona "Agregar nuevo".</p>`,
    ADJUNTAR: `<p>Si deseas adjuntar un nuevo documento, selecciona la opción --Adjuntar nuevo documento-- y presiona el botón "Adjuntar documentos"</p>`,
};
/**
 * Contiene los textos que se muestran en la sección de cancelación.
 * Incluye mensajes de error en formato HTML para visualización en el frontend.
 * Los textos están estilizados con colores y centrado para una mejor experiencia de usuario.
 */
export const TEXTOS_CANCELACIONS = {
  TEXTOS_CANCELACION: `
   <div style="text-align: center;">
      <strong style="color: grey;">Corrija los siguientes errores:</strong><br>
      <span style="color: red;">Para ejecutar la búsqueda se requiere ingresar al menos el parámetro de búsqueda requerido.</span>
    </div>
  `
};
