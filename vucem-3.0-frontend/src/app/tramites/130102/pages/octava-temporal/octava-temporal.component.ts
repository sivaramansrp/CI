/**
 * @fileoverview Este archivo contiene la clase OctavaTemporalComponent, que es responsable de manejar la lógica del componente Octava Temporal.
 * 
 * @module OctavaTemporalComponent
 */

import { Component } from '@angular/core';

import { ListaPasosWizard } from '../../../../core/models/5701/servicios-extraordinarios.model';
import { OctaTempo } from '../../../../core/services/130102/octava-temporal.enum';



/**
 * @class OctavaTemporalComponent
 * @classdesc Esta clase representa el componente Octava Temporal.
 */
@Component({
  selector: 'app-octava-temporal',
  templateUrl: './octava-temporal.component.html',
})
export class OctavaTemporalComponent {
  /**
   * @property {ListaPasosWizard[]} pantallasPasos - Array para almacenar los pasos del wizard.
   */
  pantallasPasos: ListaPasosWizard[] = OctaTempo;

  /**
   * @property {number} indice - El índice actual del paso.
   */
  indice: number = 1;
}