/**
  * @constant ERROR_FORMA_ALERT
  * @type {string}
  * @description
  * Este mensaje de alerta informa al usuario sobre el proceso para agregar datos del traslado y la sede, 
  * indicando que a cada traslado le corresponde una sede con un máximo de dos itinerarios.
  */
export const ERROR_FORMA_ALERT =
`
<div class="d-flex justify-content-center text-center">
  <div>
    <div class="col-md-12">
      <strong>¡Error de registro!</strong> Faltan campos por capturar.
    </div>
  </div>
</div>
`;

/**
 * Genera el mensaje HTML que se muestra cuando una solicitud ha sido registrada exitosamente.
 * Incluye el número temporal de la solicitud y una advertencia sobre su validez legal.
 * @param numeroSolicitud Número temporal asignado a la solicitud.
 * @returns {string} Mensaje HTML de registro exitoso.
 */
export const MSG_REGISTRO_EXITOSO = (numeroSolicitud: string): string =>
  `<div class="d-flex justify-content-center text-center">
    <p>La solicitud ha quedado regitrada con el número temporal ${numeroSolicitud ?? ''}. Éste no tiene validez legal y sirve solamente para efectos de identificar tu solicitud. Un folio oficial le será asignado a la solicitud al momento en que ésta sea firmada.</p>
  </div>`;