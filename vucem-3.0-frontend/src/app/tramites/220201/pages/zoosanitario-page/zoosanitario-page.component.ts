import { Component } from '@angular/core';
import { PASOS } from '../../../../shared/constantes/issuance-extension-modification.enum'
import { ListaPasosWizard } from '../../../../core/models/220201/issuance-extension-modification.model';
@Component({
  selector: 'app-zoosanitario-page',
  templateUrl: './zoosanitario-page.component.html',
})
export class ZoosanitarioPageComponent {
  pasos: Array<ListaPasosWizard> = PASOS;
  indice: number = 1;

}
