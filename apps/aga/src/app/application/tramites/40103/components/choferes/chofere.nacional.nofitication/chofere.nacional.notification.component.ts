import {
  CategoriaMensaje,
  Notificacion,
  NotificacionesComponent,
  TipoNotificacionEnum,
} from '@libs/shared/data-access-user/src';
import { Component, Input, OnInit } from '@angular/core';
import { TEXTOS } from '../../../enum/choferes-enum';

@Component({
  selector: 'app-chofere-nacional-notification',
  templateUrl: './chofere.nacional.notification.component.html',
  styleUrls: ['./chofere.nacional.notification.component.scss'],
  standalone: true,
  imports: [
    NotificacionesComponent
  ],
})
export class ChofereNacionalNotificationComponent implements OnInit {
  /**
   * Texto del mensaje que se mostrará en la notificación.
   * @type {string}
   */
  @Input({ required: true }) mensaje!: string;

  /**
   * Inicializa la variable de alertaNotificación con un objeto de tipo Notificacion.
   * @type {Notificacion}
   */
  public alertaNotificacion: Notificacion = {
    tipoNotificacion: TipoNotificacionEnum.BANNER,
    categoria: CategoriaMensaje.INFORMACION,
    modo: '',
    titulo: '',
    mensaje: this.mensaje,
    cerrar: true,
    txtBtnAceptar: '',
    txtBtnCancelar: '',
  }

  /**
   * Texto de la sección que se mostrará en la notificación.
   * @type {string}
   */
  ngOnInit(): void {
    this.alertaNotificacion.mensaje = this.mensaje;
  }
}
