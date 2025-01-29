import { Component } from '@angular/core';
import { ListaPasosWizard } from '../../../../core/models/5701/servicios-extraordinarios.model';
import { PANTAPASOS } from '../../../../core/services/220471/servicios-pantallas.enum';

@Component({
  selector: 'app-pantallas',
  templateUrl: './pantallas.component.html'
})
/**
 * Este componente se utiliza para mostrar los pasos del asistente - 220401
 * @param pantallasPasos: Lista de pasos
 * @param indice: Índice del paso
 * @returns Lista de pasos
 * @returns Índice del paso
 */ 
export class PantallasComponent {
  /**
   * Esta variable se utiliza para almacenar la lista de pasos.
   */
  pantallasPasos: ListaPasosWizard[] = PANTAPASOS;
  /**
   * Esta variable se utiliza para almacenar el índice del paso.
   */
  indice: number = 2;
}
