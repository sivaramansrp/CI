import { Component } from '@angular/core';
import { TXT_TITULO } from '../../../../shared/constantes/servicios-extraordinarios.enum';

@Component({
  templateUrl: './acuse-page.component.html',
  styles: ``
})
export class AcusePageComponent {
  folio = '123456';
  txtTitulo = `${TXT_TITULO} <${this.folio}>`;


}
