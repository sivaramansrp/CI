import { Component, Input, input, SimpleChanges } from '@angular/core';
import { AccionesTabla, ConfiguracionTabla, DatosPageAcuse, EncabezadosTabla } from '../../../core/models/shared/components.model';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../alert/alert.component';
import { TituloComponent } from '../titulo/titulo.component';
import { Tab } from 'bootstrap';
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
export class AcuseComponent {
  @Input() txtAlerta!: string;
  @Input() subtitulo!: string;
  @Input() encabezadoTablaAcuse!: EncabezadosTabla[];
  @Input() configuracionTabla!: ConfiguracionTabla;
  @Input() accionesTablaAcuse!: AccionesTabla[];
  @Input() datosTablaAcuse!: any[];

  // @Input() datosPageAcuse!: DatosPageAcuse;
  @Input() folio!: string;

  alerta!: string;

  // ngOnInit(): void {
  //   this.alerta = `${this.txtAlerta} <${this.folio}>`;
  // }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['folio'].currentValue) {
      console.log(changes['folio'].currentValue);

      this.alerta = `${this.txtAlerta} <${this.folio}>`;
    }
  }
}
