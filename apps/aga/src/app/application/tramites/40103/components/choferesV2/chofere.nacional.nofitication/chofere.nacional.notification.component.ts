import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  CategoriaMensaje,
    Notificacion,
    NotificacionesComponent,
  TablaDinamicaComponent,
  TablaSeleccion,
  TipoNotificacionEnum,
} from '@libs/shared/data-access-user/src';
import { DatosDelChoferNacional } from '../../../models/registro-muestras-mercancias.model';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src/core/models/shared/configuracion-columna.model';
import { TituloComponent } from '../../../../../../../../../../libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { DatosDeChoferesComponent } from '../data.de.choferes.dialog/data.de.choferes.component';
import { Modal } from 'bootstrap';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CHOFERES_NACIONALES_ALTA, TEXTOS } from '../../../enum/choferes-enum';
import { Chofer40103Service } from '../../../estados/chofer40103.service';
import { Chofer40103Query } from '../../../estados/chofer40103.query';
import { map, Observable, takeUntil } from 'rxjs';

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
