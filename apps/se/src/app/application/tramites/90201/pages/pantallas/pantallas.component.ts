/* eslint-disable @nx/enforce-module-boundaries */
import { Component } from '@angular/core';
import { ListaPasosWizard } from 'libs/shared/data-access-user/src/core/models/5701/servicios-extraordinarios.model';
import { PANTAPASOS } from 'libs/shared/data-access-user/src/core/services/90201/expansion-de-productores.enum';

@Component({
  selector: 'app-pantallas',
  templateUrl: './pantallas.component.html',
})
export class PantallasComponent {

  /**
   * Esta variable se utiliza para almacenar la lista de pasos.
   */
  pantallasPasos: ListaPasosWizard[] = PANTAPASOS;
  /**
   * Esta variable se utiliza para almacenar el índice del paso.
   */
  indice: number = 1;
}
