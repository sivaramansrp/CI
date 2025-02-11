import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  AccionesTabla,
  ConfiguracionTabla,
  EncabezadosTabla,
} from '../../../core/models/shared/components.model';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../alert/alert.component';
import { TituloComponent } from '../titulo/titulo.component';
import { TablaComponent } from '../tabla/tabla.component';
import { ACUSE_SERVICIOS_EXTRAORDINARIOS } from '../../constantes/servicios-extraordinarios.enum';

@Component({
  selector: 'app-component-acuse',
  standalone: true,
  imports: [CommonModule, AlertComponent, TituloComponent, TablaComponent],
  templateUrl: './acuse.component.html',
  styleUrl: './acuse.component.scss',
})
export class AcuseComponent implements OnChanges {
  @Input() txtAlerta!: string;
  @Input() subtitulo!: string;
  encabezadoTablaAcuse = ACUSE_SERVICIOS_EXTRAORDINARIOS.encabezadoTablaAcuse;
  @Input() configuracionTabla!: ConfiguracionTabla;
  @Input() accionesTablaAcuse!: AccionesTabla[];
  datosTablaAcuse!: any[];

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
