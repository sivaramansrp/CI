import { Component } from '@angular/core';

import { DatosPasos } from 'libs/shared/data-access-user/src/core/models/shared/components.model';
import { ListaPasosWizard } from 'libs/shared/data-access-user/src/core/models/5701/servicios-extraordinarios.model';

import { PASOS } from 'libs/shared/data-access-user/src/tramites/constantes/servicios-extraordinarios.enum';


@Component({
  selector: 'app-solicitante',
  templateUrl: './solicitante.component.html'
})
export class Solicitante130102Component {
   pasos: ListaPasosWizard[] = PASOS;
    indice: number = 1;
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
}
