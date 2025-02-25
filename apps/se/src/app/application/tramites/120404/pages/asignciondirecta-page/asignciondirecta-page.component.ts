import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ASIGNHCION, PANTAPASOS, WizardComponent } from '@ng-mf/data-access-user';
import { ListaPasosWizard} from '@ng-mf/data-access-user';
// import { PANTAPASOS } from '@ng-mf/data-access-user';
// import {AANTAPASOS} from '@ng-mf/data-access-user';

@Component({
  selector: 'app-asignciondirecta-page',

  templateUrl: './asignciondirecta-page.component.html',
  styleUrl: './asignciondirecta-page.component.scss',
})
export class AsignciondirectaPageComponent {
pantallasPasos: ListaPasosWizard[] = ASIGNHCION;
  indice: number = 1;
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
}
