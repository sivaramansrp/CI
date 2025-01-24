import { Component, Input, input } from '@angular/core';
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
  @Input() datosPageAcuse!: DatosPageAcuse;
  @Input() folio!: string;

  txtAlerta!: string;

  ngOnInit(): void {
    this.txtAlerta = `${this.datosPageAcuse.txtAlerta} <${this.folio}>`
  }
  // @Input() txtTitulo!: string;
  // @Input() tituloSeccionAcuse!: string;
  // @Input() encabezadoTablaAcuses!: EncabezadosTabla[];
  // @Input() datosTablaAcuses!: ConfiguracionTabla[];
  // @Input() acciones!: AccionesTabla[];

}
