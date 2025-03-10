import { Component } from '@angular/core';
import { ListaPasosWizard } from '@libs/shared/data-access-user/src';
import { PANTA_PASOS } from 'libs/shared/data-access-user/src/core/services/31601/servicios-pantallas.enum';

@Component({
  selector: 'app-pantallas',
  templateUrl: './pantallas.component.html',
})
export class PantallasComponent {
  pantallasPasos: ListaPasosWizard[] = PANTA_PASOS;
  /**
   * Esta variable se utiliza para almacenar el índice del paso.
   */
  indice: number = 1;

}
