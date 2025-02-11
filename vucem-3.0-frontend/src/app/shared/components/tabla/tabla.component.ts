import { Component, Input } from '@angular/core';
import {
  AccionesTabla,
  ConfiguracionTabla,
  EncabezadosTabla,
} from '../../../core/models/shared/components.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ng-tabla',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.scss',
})
export class TablaComponent {
  @Input({ required: true }) encabezadosTabla!: EncabezadosTabla[];
  @Input({ required: true }) datosTabla!: ConfiguracionTabla[];
  @Input() accionesTabla!: AccionesTabla[];

  onAccion(): void {
    
  }
}
