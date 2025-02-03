/* eslint-disable sort-imports */
import { Component } from '@angular/core';
import { PANTAPASOS } from '../../../../core/services/110101/pantallas-svc.enum';
import { ListaPasosWizard } from '../../../../core/models/5701/servicios-extraordinarios.model';

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
