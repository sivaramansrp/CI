import { Component, Input } from '@angular/core';
import { InspeccionFisica } from '../../../../core/models/220502/solicitud-pantallas.model';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';

@Component({
  selector: 'app-historial-inspeccion-fisica',
  standalone: true,
  imports: [TituloComponent],
  templateUrl: './historial-inspeccion-fisica.component.html',
  styleUrl: './historial-inspeccion-fisica.component.scss',
})
export class HistorialInspeccionFisicaComponent {
  /** Matriz para contener etiquetas de encabezado para la tabla */
  @Input() tablaHeadData: string[];

  /** Matriz para contener datos para cada fila de la tabla */
  @Input() tablaFilaDatos: InspeccionFisica[];
}
