import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AccionesTabla, ConfiguracionTabla, DatosPageAcuse, EncabezadosTabla } from '../../../core/models/shared/components.model';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../alert/alert.component';
import { TituloComponent } from '../titulo/titulo.component';
import { TablaComponent } from '../tabla/tabla.component';


@Component({
  selector: 'c-acuse',
  standalone: true,
  imports: [
    CommonModule,
    AlertComponent,
    TituloComponent,
    TablaComponent,
  ],
  templateUrl: './acuse.component.html',
  styleUrl: './acuse.component.scss'
})
export class AcuseComponent implements OnChanges {
  @Input() txtAlerta!: string;
  @Input() subtitulo!: string;
  @Input() encabezadoTablaAcuse!: EncabezadosTabla[];
  @Input() configuracionTabla!: ConfiguracionTabla;
  @Input() accionesTablaAcuse!: AccionesTabla[];
  @Input() datosTablaAcuse!: any[];

  @Input() folio!: string;

  /**
   * Método que se ejecuta cuando uno o más inputs del componente cambian.
   * 
   * @param changes - Objeto que contiene los cambios de los inputs del componente.
   * @returns void
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['txtAlerta'].currentValue) {
      this.txtAlerta = changes['txtAlerta'].currentValue;
    }
  }
}
