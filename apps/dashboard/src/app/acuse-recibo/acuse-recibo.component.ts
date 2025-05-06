import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TablaAcciones, TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { ACUSE_NOTIFICACION_REQUERIMIENTO_ENCABEZADO_DE_TABLA } from '../constants/confirmar-notificacion.enum';

@Component({
  selector: 'app-acuse-recibo',
  standalone: true,
  imports: [CommonModule, TituloComponent, TablaDinamicaComponent],
  templateUrl: './acuse-recibo.component.html',
  styleUrl: './acuse-recibo.component.css',
})
export class AcuseReciboComponent {
  acciones: TablaAcciones[] = [TablaAcciones.VER, TablaAcciones.DESCARGAR];
  acuseReciboTablaDatos = [
    {
      numero: '1',
      documento: 'Documento 1',
    },
    {
      numero: '2',
      documento: 'Documento 2',
    },
    {
      numero: '3',
      documento: 'Documento 3',
    },
  ];
  public acuseReciboTablaConfiguracion = {
    configuracionTabla: ACUSE_NOTIFICACION_REQUERIMIENTO_ENCABEZADO_DE_TABLA,
    acciones: this.acciones,
  };
}
