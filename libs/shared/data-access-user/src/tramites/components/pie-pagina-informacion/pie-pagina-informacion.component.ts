import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {
  INAI_LINK,
  JAVA_LINK,
  POLITICAS_PRIVACIDAD,
} from '../../../core/enums/politicas-privacidad.enum';
import {
  Notificacion,
  NotificacionesComponent,
} from '../notificaciones/notificaciones.component';
import {
  SIN_TITULO_MODAL,
  TEXTO_CERRAR,
} from '../../../core/enums/mensajes-modal-comunes.enum';
import { Component } from '@angular/core';
@Component({
  selector: 'lib-pie-pagina-informacion',
  standalone: true,
  imports: [NotificacionesComponent],
  templateUrl: './pie-pagina-informacion.component.html',
  styleUrl: './pie-pagina-informacion.component.scss',
})
export class PiePaginaInformacionComponent {
  /**
   * @description Objeto que representa la notificación que se mostrará al usuario.
   * @remarks Este objeto se utiliza para configurar el modal de notificación.
   */
  notificacion!: Notificacion;

  /**
   * @description URL segura utilizada para acceder a recursos Java relacionados con el componente.
   * Esta propiedad almacena una instancia de `SafeUrl` para evitar vulnerabilidades XSS
   * al manejar enlaces externos o dinámicos en la aplicación.
   */
  urlJavaSeguro: SafeUrl;

  /**
   * @param sanitizer Instancia de `DomSanitizer` que se utiliza para sanitizar URLs y evitar vulnerabilidades XSS.
   * @description Constructor del componente `PiePaginaInformacionComponent`.
   */
  constructor(private sanitizer: DomSanitizer) {
    const URL_JAVA = JAVA_LINK;
    this.urlJavaSeguro = this.sanitizer.bypassSecurityTrustUrl(URL_JAVA);
  }

  /**
   * @description Método que abre un modal de notificación con información sobre las políticas de privacidad.
   * Este método configura el objeto `notificacion` con los detalles necesarios para mostrar
   */
  abreModalNotificacion(): void {
    this.notificacion = {
      tipoNotificacion: 'alert',
      categoria: '',
      modo: 'html',
      titulo: SIN_TITULO_MODAL,
      mensaje: POLITICAS_PRIVACIDAD(INAI_LINK),
      cerrar: false,
      txtBtnAceptar: TEXTO_CERRAR,
      txtBtnCancelar: '',
      tamanioModal: 'modal-lg',
      alineacionBtonoCerrar: 'boton-final'
    };
  }
}
