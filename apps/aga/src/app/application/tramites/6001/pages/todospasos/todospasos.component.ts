/* eslint-disable sort-imports */
/* eslint-disable @nx/enforce-module-boundaries */
import { Component } from '@angular/core';
import { ListaPasosWizard, PANTA_PASOS } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-todospasos',
  templateUrl: './todospasos.component.html',
})
export class TodospasosComponent {

 /**
* Esta variable se utiliza para almacenar la lista de pasos.
*/
 pantallasPasos: ListaPasosWizard[] = PANTA_PASOS;
 /**
  * Esta variable se utiliza para almacenar el índice del paso.
  */
 indice: number = 2;

}
