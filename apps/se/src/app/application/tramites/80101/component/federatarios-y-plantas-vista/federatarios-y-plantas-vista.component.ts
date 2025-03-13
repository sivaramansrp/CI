import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TablaSeleccion } from '@ng-mf/data-access-user';

import {
  FEDERATARIOS,
  FederatariosEncabezado,
} from '../../../../shared/models/federatarios-y-plantas.model';
import { FederatariosYPlantasComponent } from '../../../../shared/components/federatarios-y-plantas/federatarios-y-plantas.component';

@Component({
  selector: 'app-federatarios-y-plantas-vista',
  standalone: true,
  imports: [CommonModule, FederatariosYPlantasComponent],
  templateUrl: './federatarios-y-plantas-vista.component.html',
  styleUrl: './federatarios-y-plantas-vista.component.css',
})
export class FederatariosYPlantasVistaComponent {
  public federatariosTablaConfiguracion = {
    FederatariosTablaSeleccion: TablaSeleccion.CHECKBOX,
    FederatariosTablaEncabezado: FEDERATARIOS,
  };

  public federatariosTablaLista: FederatariosEncabezado[] = [];
}
