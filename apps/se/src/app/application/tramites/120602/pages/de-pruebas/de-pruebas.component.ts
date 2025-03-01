import { Component } from '@angular/core';
import { ListaPasosWizard } from '@ng-mf/data-access-user';

import { DE_PRUEBAS } from 'libs/shared/data-access-user/src/core/services/120602/de-pruebas.enum';

/**
 * @class DePruebasComponent
 * @classdesc Esta clase representa el componente De Pruebas.
 */
@Component({
  selector: 'app-de-pruebas',
  templateUrl: './de-pruebas.component.html',
})
export class DePruebasComponent {
  /**
    * @property {ListaPasosWizard[]} pantallasPasos - Array para almacenar los pasos del wizard.
    */
  pantallasPasos: ListaPasosWizard[] = DE_PRUEBAS;

  /**
   * @property {number} indice - El índice actual del paso.
   */
  indice: number = 2;
}
