import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaPasosWizard, WizardComponent } from '@ng-mf/data-access-user';
// import { PANTAPASOS } from '@ng-mf/data-access-user';
import {AANTAPASOS} from '@ng-mf/data-access-user';
import { SolicitanteAsigncionComponent } from '../solicitante-asigncion/solicitante-asigncion.component';




@Component({
  selector: 'app-asignciondirecta-page',
  standalone: true,
  imports: [CommonModule,WizardComponent,SolicitanteAsigncionComponent],
  templateUrl: './asignciondirecta-page.component.html',
  styleUrl: './asignciondirecta-page.component.scss',
})
export class AsignciondirectaPageComponent {
  pantallasPasos: ListaPasosWizard[] = AANTAPASOS;
  // pasos: ListaPasosWizard[] = PASOS;
  indice: number = 1;
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
}
