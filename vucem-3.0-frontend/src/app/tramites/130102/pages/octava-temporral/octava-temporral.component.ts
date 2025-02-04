import { Component } from '@angular/core';
import { ListaPasosWizard } from '../../../../core/models/5701/servicios-extraordinarios.model';
import { OCTATEMPO } from '../../../../core/services/130102/octava-temporral.enum';

@Component({
  selector: 'app-octava-temporral',
  templateUrl: './octava-temporral.component.html',
})
export class OctavaTemporralComponent {
  pantallasPasos: ListaPasosWizard[] = OCTATEMPO;
  indice: number = 1;
}
