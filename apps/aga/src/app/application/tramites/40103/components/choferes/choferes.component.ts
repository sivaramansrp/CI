import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CHOFERES_PAGE } from '../../enum/transportista-terrestre.enum';
import { ChofereAltaDeExtranjerosComponent } from './extranjero/alta-de-extranjeros/chofere.alta.de.extranjeros.component';
import { ChofereModificationDeChoferesComponent } from './extranjero/modification-de-choferes/chofere.modification.de.choferes.component';
import { ChofereNacionalComponent } from './chofere.nacional/chofere.nacional.component';
import { ChofereNacionalModificacionComponent } from './chofere.nacional/chofere.nacional.modificacion/chofere.nacional.modificacion.component';
import { ChofereNacionalNotificationComponent } from './chofere.nacional.nofitication/chofere.nacional.notification.component';
import { ChofereNacionalRetiradaComponent } from './chofere.nacional/chofere.nacional.retirada/chofere.nacional.retirada.component';
import { ChofereRetiradaDeChoferesComponent } from './extranjero/retirada-de-choferes/chofere.retirada.de.choferes.component';
import { CommonModule } from '@angular/common';
import {
  Component,
} from '@angular/core';
import { SharedModule } from '@ng-mf/data-access-user';
import { TEXTOS } from '../../enum/choferes.enum';
import { TituloComponent } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-choferes',
  templateUrl: './choferes.component.html',
  styleUrls: ['./choferes.component.scss'],
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
    ChofereNacionalRetiradaComponent,
    ChofereRetiradaDeChoferesComponent,
    ChofereModificationDeChoferesComponent
  ],
})
export class ChoferesComponent {
  CHOFERES_PAGE = CHOFERES_PAGE;
  TEXTOS = TEXTOS;

  activeTab: string = 'nacional';

  /**
   * Establece la pestaña activa.
   * @param tab La pestaña que se establecerá como activa.
   */
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}
