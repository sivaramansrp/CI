import { Component } from '@angular/core';
import { ListaPasosWizard } from '../../../../core/models/5701/servicios-extraordinarios.model';
import { PANTAPASOS } from '../../../../core/services/31601/servicios-pantallas.enum';

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
  indice: number = 3;

}
