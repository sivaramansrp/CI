import { Component } from '@angular/core';
import {
  ACCIONES_TABLA_ACUSE,
  TXT_TITULO,
} from '../../constantes/servicios-extraordinarios.enum';
import {
  AccionesTabla,
  ConfiguracionTabla,
  EncabezadosTabla,
} from '../../../core/models/shared/components.model';
import { TituloComponent } from '../../components/titulo/titulo.component';
import { TablaComponent } from '../../components/tabla/tabla.component';
import { AlertComponent } from '../../components/alert/alert.component';
import { CommonModule } from '@angular/common';

@Component({
  templateUrl: './acuse-page.component.html',
  styles: ``,
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    TablaComponent,
    AlertComponent,
  ],
})
export class AcusePageComponent {
  folio = '123456';
  txtTitulo = `${TXT_TITULO} <${this.folio}>`;

  encabezadoTablaAcuses: EncabezadosTabla[] = [
    {
      key: 'id',
      valor: 'No.',
    },
    {
      key: 'documento',
      valor: 'Documento.',
    },
  ];

  datosTablaAcuses: ConfiguracionTabla[] = [
    {
      id: 1,
      idDocumento: 'doc12',
      documento: 'Acuse de recepción de trámite',
    },
  ];

  acciones: AccionesTabla[] = ACCIONES_TABLA_ACUSE;
}
