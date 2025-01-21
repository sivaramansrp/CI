import { Component } from '@angular/core';
import { TEXTOS } from '../../../../shared/constantes/303/texto.enum';

@Component({
  selector: 'agentes-agencias-aduanales',
  templateUrl: './agentes-agencias-aduanales.component.html',
  styleUrl: './agentes-agencias-aduanales.component.scss'
})
export class AgentesAgenciasAduanalesComponent {
  TEXTOS = TEXTOS;
  modal: string = 'modal';
  abrirModal() {
    this.modal = 'modal-open';

  }
  cerrarModal() {
    this.modal = 'modal';
  }
}
