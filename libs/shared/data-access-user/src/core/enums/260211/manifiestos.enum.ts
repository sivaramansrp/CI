/**
* Mensaje de alerta que el usuario debe aceptar antes de continuar con el trámite.
*
* Este mensaje indica que el solicitante declara cumplir con los requisitos y normatividad aplicable,
* sin que esto lo exima de posibles verificaciones por parte de la autoridad sanitaria.
* También advierte sobre las sanciones por falsedad de declaraciones.
*
* El solicitante acepta que la notificación del trámite se realice a través de la
* Ventanilla Única de Comercio Exterior utilizando los mecanismos correspondientes.
*/
export const MENSAJE_DE_ALERTA: string =
  " * Cumplo con los requisitos y normatividad aplicable, sin que me eximan de que la autoridad sanitaria verifique su cumplimiento, esto sin perjuicio de las sanciones en que puedo incurrir por falsedad de declaraciones dadas a una autoridad. Asimismo acepto que la notificación de este trámite, sea a través de la Ventanilla Única de Comercio Exterior por los mecanismos de la misma.";

export const FECHA_DE_PAGO = {
  labelNombre: 'Fecha de caducidad',
  required: false,
  habilitado: false,
};

/**
 * @const ALERTA_DE_MANIFESTO_Y_DECLARACIONES
 * @description
 * Este constante contiene una plantilla HTML que representa un mensaje de alerta
 * relacionado con manifiestos y declaraciones. Incluye un checkbox para la selección
 * del manifiesto y un párrafo que describe los requisitos y normatividad aplicable.
 *
 * @detalle
 * - El checkbox permite al usuario confirmar que cumple con los requisitos y normatividad aplicable.
 * - El párrafo informa al usuario sobre las posibles verificaciones de la autoridad sanitaria
 *   y las sanciones por falsedad de declaraciones.
 * - También se menciona que la notificación del trámite se realizará a través de la Ventanilla
 *   Única de Comercio Exterior.
 *
 * @uso
 * Esta constante puede ser utilizada en componentes o vistas donde se requiera mostrar
 * esta alerta como parte de un formulario o proceso de declaración.
 */
export const ALERTA_DE_MANIFESTO_Y_DECLARACIONES = `<div class="row align-items-center justify-content-start py-2" style="background-color: #d9edf7;">
  <div class="col-auto d-flex align-items-start pt-1">
    <input class="form-check-input mt-1 me-3" type="checkbox" value="" id="manifiestosCasillaDeVerificacion">
    <label class="form-check-label ms-2" for="manifiestosCasillaDeVerificacion" (click)="manifestoSellecionado()"> *</label>
  </div>
 
  <div class="col" style="margin-left: 59px;">
    <p class="mb-0">
      Cumplo con los requisitos y normatividad aplicable, sin que me eximan de que la autoridad sanitaria verifique su
      cumplimiento, esto sin perjuicio de las sanciones en que puedo incurrir por falsedad de declaraciones dadas a una
      autoridad. Asimismo acepto que la notificación de este trámite, sea a través de la Ventanilla Única de Comercio
      Exterior por los mecanismos de la misma.
    </p>
  </div>
</div>
`;
