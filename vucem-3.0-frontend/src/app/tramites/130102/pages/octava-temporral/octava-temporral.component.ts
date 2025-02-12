/**
 * @fileoverview Este archivo contiene la clase OctavaTemporralComponent, que es responsable de manejar la lógica del componente Octava Temporal.
 * 
 * @module OctavaTemporralComponent
 */

import { Component } from '@angular/core';

import { ListaPasosWizard } from '../../../../core/models/5701/servicios-extraordinarios.model';
import { OCTATEMPO } from '../../../../core/services/130102/octava-temporral.enum';



/**
 * @class OctavaTemporralComponent
 * @classdesc Esta clase representa el componente Octava Temporal.
 */
@Component({
  selector: 'app-octava-temporral',
  templateUrl: './octava-temporral.component.html',
})
export class OctavaTemporralComponent {
  /**
   * @property {ListaPasosWizard[]} pantallasPasos - Array para almacenar los pasos del wizard.
   */
  pantallasPasos: ListaPasosWizard[] = OCTATEMPO;

  /**
   * @property {number} indice - El índice actual del paso.
   */
  indice: number = 1;
}