import { Component, Input } from '@angular/core';
import { InspeccionFisica } from '../../../../core/models/220502/solicitud-pantallas.model';

@Component({
  selector: 'historial-inspeccion-fisica',
  templateUrl: './historial-inspeccion-fisica.component.html',
  styleUrl: './historial-inspeccion-fisica.component.scss'
})
export class HistorialInspeccionFisicaComponent {
  @Input() tablaHeadData : string[];
  @Input() tablaFilaDatos: InspeccionFisica[];
}
