/**
 * @constant ERROR_FORMA_ALERT
 * @description
 * Mensaje HTML que se muestra como alerta cuando faltan campos por capturar en el formulario.
 * Se utiliza para informar al usuario que debe completar todos los campos requeridos antes de continuar.
 *
 * Este mensaje se utiliza en los componentes de trámites para validar la captura de información.
 * Si el usuario omite algún campo obligatorio, se muestra esta alerta en la interfaz de usuario.
 *
 * Ejemplo de uso:
 *   if (!formularioValido) {
 *     mostrarAlerta(ERROR_FORMA_ALERT);
 *   }
 *
 * @see PasoUnoComponent (apps/se/src/app/application/tramites/130301/pages/paso-uno/paso-uno.component.ts)
 * Este mensaje se utiliza directamente en el componente PasoUnoComponent para mostrar alertas de validación de formulario.
 * @author Equipo de desarrollo SE
 */
export const ERROR_FORMA_ALERT =
  `
<div class="d-flex justify-content-center text-center">
  <div>
    <div class="col-md-12">
      <b>¡Error de registro! Faltan campos por capturar.</b>
    </div>
  </div>
</div>
`