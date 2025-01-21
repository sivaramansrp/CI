import { Component } from '@angular/core';
import { TXT_TITULO } from '../../../../shared/constantes/servicios-extraordinarios.enum';
import { AccionesTabla, ConfiguracionTabla, EncabezadosTabla } from '../../../../core/models/shared/components.model';

@Component({
  templateUrl: './acuse-page.component.html',
  styles: ``
})
export class AcusePageComponent {
  folio = '123456';
  txtTitulo = `${TXT_TITULO} <${this.folio}>`;

  encabezadoTablaAcuses: EncabezadosTabla[] = [
    {
      key: 'id',
      valor: 'No.'
    },
    {
      key: 'documento',
      valor: 'Documento.'
    },
  ];



  datosTablaAcuses : ConfiguracionTabla[] = [
    {
      id: 1,
      documento: 'Acuse de recepción de trámite',
    },

  ]

  acciones: AccionesTabla[] = [
    {
      tipo: 'descargar',
      label: 'Descargar',
      icono: 'bi bi-arrow-bar-down bi-c'
    }
  ]


}
