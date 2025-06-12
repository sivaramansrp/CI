import { Component } from '@angular/core';
import {
  CategoriaMensaje,
    Notificacion,
    NotificacionesComponent,
  TipoNotificacionEnum,
} from '@libs/shared/data-access-user/src';
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
export class ChofereNacionalNotificationComponent {

  /**
     * Inicializa la variable de alertaNotificación con un objeto de tipo Notificacion.
     * @type {Notificacion}
     */
    public alertaNotificacion: Notificacion = {
      tipoNotificacion: TipoNotificacionEnum.BANNER,
      categoria: CategoriaMensaje.INFORMACION,
      modo: '',
      titulo: '',
      mensaje: TEXTOS.INSTRUCCIONES,
      cerrar: true,
      txtBtnAceptar: '',
      txtBtnCancelar: '',
    }


}
