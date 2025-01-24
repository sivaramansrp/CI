import { Component } from '@angular/core';
import { ListaPasosWizard } from '../../../../core/models/5701/servicios-extraordinarios.model';
import { PANTAPASOS } from '../../../../core/services/220471/servicios-pantallas.enum';
import { SolicitudComponent } from '../datos/solicitud/solicitud.component';
import { DatosDelComponent } from '../datos/datos-del/datos-del.component';
import { NavComponent } from '../../../../shared/components/nav/nav.component';
import { WizardComponent } from '../../../../shared/components/wizard/wizard.component';
import { DatosComponent } from '../datos/datos.component';

@Component({
  selector: 'app-pantallas',
  standalone: true,
  templateUrl: './pantallas.component.html',
  styleUrl: './pantallas.component.scss',
  imports: [
    NavComponent,
    WizardComponent,
    DatosComponent
  ]
})
export class PantallasComponent {
  pasos: Array<ListaPasosWizard> = PANTAPASOS;
  indice: number = 2;
}
