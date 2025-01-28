import { Component, Input, input, SimpleChanges } from '@angular/core';
import { AccionesTabla, ConfiguracionTabla, DatosPageAcuse, EncabezadosTabla } from '../../../core/models/shared/components.model';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../alert/alert.component';
import { TituloComponent } from '../titulo/titulo.component';
import { TablaComponent } from '../tabla/tabla.component';
import { DocumentoService } from '../../../core/services/shared/documento/documento.service';


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

  constructor() {
    console.log('Constructor acuse component');

  }

  ngOninit(): void {
  }



  ngOnChanges(changes: SimpleChanges): void {

    if (changes['txtAlerta'].currentValue) {
      this.txtAlerta = changes['txtAlerta'].currentValue;
      console.log(this.txtAlerta);
    }
  }
}
