import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { historialInspeccionFisica } from '../../../../core/models/220502/solicitud-pantallas.model';

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
  @Input() tablaFilaDatos: historialInspeccionFisica[];
}
