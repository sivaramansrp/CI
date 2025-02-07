import { Component } from '@angular/core';
import { DatosPasos } from '../../../../core/models/shared/components.model';
import { PASOS } from '../../../../shared/constantes/servicios-extraordinarios.enum';
import { ListaPasosWizard } from '../../../../core/models/5701/servicios-extraordinarios.model';

@Component({
  selector: 'app-solicitante',
  templateUrl: './solicitante.component.html',
  styleUrl: './solicitante.component.scss'
})
export class SolicitanteComponent {
   pasos: Array<ListaPasosWizard> = PASOS;
    indice: number = 1;
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
}
