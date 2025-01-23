import { Component } from '@angular/core';
import { ListaPasosWizard } from '../../../../core/models/5701/servicios-extraordinarios.model';
import { PASOS } from '../../../../shared/constantes/servicios-extraordinarios.enum';

@Component({
  selector: 'app-pantallas',
  templateUrl: './pantallas.component.html',
  styleUrl: './pantallas.component.scss'
})
export class PantallasComponent {
  pasos: Array<ListaPasosWizard> = PASOS;
  indice: number = 1;
}
