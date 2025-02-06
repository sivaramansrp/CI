import { Component, Input } from '@angular/core';
import { InspeccionFisica } from '../../../../core/models/220502/solicitud-pantallas.model';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';

@Component({
  selector: 'app-historial-inspeccion-fisica',
  standalone: true,
  imports:[TituloComponent],
  templateUrl: './historial-inspeccion-fisica.component.html',
  styleUrl: './historial-inspeccion-fisica.component.scss'
})
export class HistorialInspeccionFisicaComponent {
  @Input() tablaHeadData : string[];
  @Input() tablaFilaDatos: InspeccionFisica[];
}
