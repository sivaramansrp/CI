import { Component } from '@angular/core';
import { ListaPasosWizard } from '@ng-mf/data-access-user';

import { DE_PRUEBAS } from 'libs/shared/data-access-user/src/core/services/120602/de-pruebas.enum';

/**
 * @class DePruebasComponent
 * @classdesc Este componente gestiona los pasos de un asistente (wizard).
 * Muestra los pasos definidos en `DE_PRUEBAS` y controla la navegación mediante `indice`.
 */
@Component({
  selector: 'app-de-pruebas',
  templateUrl: './de-pruebas.component.html',
})
export class DePruebasComponent {
  /**
   * @constructor
   * @description Inicializa una instancia del componente DePruebasComponent.
   * Actualmente, no realiza ninguna acción adicional.
   */
  // eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
  constructor() { }

  /**
   * @property {ListaPasosWizard[]} pantallasPasos
   * @description Contiene la lista de pasos del asistente (wizard).
   * La información se obtiene de la constante `DE_PRUEBAS`.
   */
  pantallasPasos: ListaPasosWizard[] = DE_PRUEBAS;

  /**
   * @property {number} indice
   * @description Representa el índice del paso actual en el asistente.
   * Se inicializa en 2, lo que significa que el asistente comenzará en el tercer paso.
   */
  indice: number = 2;
}
