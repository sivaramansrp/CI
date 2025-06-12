import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CHOFERES_PAGE } from '../../enum/transportista-terrestre.enum';
import { ChofereAltaDeExtranjerosComponent } from './extranjero/chofere.alta.de.extranjeros.component';
import { ChofereNacionalComponent } from './chofere.nacional/chofere.nacional.component';
import { ChofereNacionalModificacionComponent } from './chofere.nacional/chofere.nacional.modificacion/chofere.nacional.modificacion.component';
import { ChofereNacionalNotificationComponent } from './chofere.nacional.nofitication/chofere.nacional.notification.component';
import { ChofereNacionalRetiradaComponent } from './chofere.nacional/chofere.nacional.retirada/chofere.nacional.retirada.component';
import { CommonModule } from '@angular/common';
import {
  Component,
} from '@angular/core';
import { SharedModule } from '@ng-mf/data-access-user';
import { TEXTOS } from '../../enum/choferes-enum';
import { TituloComponent } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-choferes-v2',
  templateUrl: './choferesv2.component.html',
  styleUrls: ['./choferesv2.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    FormsModule,
    TituloComponent,
    ChofereNacionalComponent,
    ChofereAltaDeExtranjerosComponent,
    ChofereNacionalNotificationComponent,
    ChofereNacionalModificacionComponent,
    ChofereNacionalRetiradaComponent
  ],
})
export class ChoferesV2Component {
  CHOFERES_PAGE = CHOFERES_PAGE;
  TEXTOS = TEXTOS;

  activeTab: string = 'nacional';

  /**
   *
   */
  constructor() { }

  /**
   * Establece la pestaña activa.
   * @param tab La pestaña que se establecerá como activa.
   */
  setActiveTab(tab: string): void {
    this.activeTab = tab;
    // if (tab === 'extranjero') {
    //   // this.TEXTOS.titulo = TEXTOS.TITULO_EXTRANJERO;
    // } else {
    //   this.TEXTOS.titulo = TEXTOS.TITULO_NACIONAL;
    // }
  }
}
