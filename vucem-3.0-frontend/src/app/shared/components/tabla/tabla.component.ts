import {
  AccionesTabla,
  ConfiguracionTabla,
  EncabezadosTabla,
} from '../../../core/models/shared/components.model';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabla',
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
    // console.log('Abre pdf');
    // const urlPdf = this.datosTabla.length > 0 ? this.datosTabla[0]['urlPdf'] : null;
    // if (urlPdf) {
    //   window.open(urlPdf, '_blank');
    // }
    

  }
}
