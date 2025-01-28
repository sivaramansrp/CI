import { Component } from '@angular/core';
import { ListaPasosWizard } from '../../../../core/models/5701/servicios-extraordinarios.model';
import { PANTAPASOS } from '../../../../core/services/220471/servicios-pantallas.enum';

@Component({
  selector: 'app-pantallas',
  templateUrl: './pantallas.component.html'
})
export class PantallasComponent {
  pasos: Array<ListaPasosWizard> = PANTAPASOS;
  indice: number = 2;
}
