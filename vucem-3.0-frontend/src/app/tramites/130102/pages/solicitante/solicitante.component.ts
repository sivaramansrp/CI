import { Component } from '@angular/core';

import { DatosPasos } from '../../../../core/models/shared/components.model';
import { ListaPasosWizard } from '../../../../core/models/5701/servicios-extraordinarios.model';

import { PASOS } from '../../../../shared/constantes/servicios-extraordinarios.enum';


@Component({
  selector: 'app-solicitante',
  templateUrl: './solicitante.component.html'
})
export class SolicitanteComponent {
   pasos: ListaPasosWizard[] = PASOS;
    indice: number = 1;
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
}
