/**
 * @fileoverview Componente para la gestión de la página de asignación directa.
 * Este componente maneja la lógica y la presentación de la página de asignación directa,
 * incluyendo la inicialización y la gestión de los pasos del wizard.
 * @module AsignciondirectaPageComponent
 */

import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ASIGNHCION, PANTAPASOS, WizardComponent } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '@ng-mf/data-access-user';

/**
 * Componente para la gestión de la página de asignación directa.
 * @selector app-asignciondirecta-page
 * @templateUrl ./asignciondirecta-page.component.html
 * @styleUrl ./asignciondirecta-page.component.scss
 */
@Component({
  selector: 'app-asignciondirecta-page',
  templateUrl: './asignciondirecta-page.component.html',
  styleUrls: ['./asignciondirecta-page.component.scss'],
})
export class AsignciondirectaPageComponent {
  /**
   * Lista de pasos del wizard.
   */
  pantallasPasos: ListaPasosWizard[] = ASIGNHCION;

  /**
   * Índice del paso actual.
   */
  indice: number = 1;

  /**
   * Referencia al componente Wizard.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
}