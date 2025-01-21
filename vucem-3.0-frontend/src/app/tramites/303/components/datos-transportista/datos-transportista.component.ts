import { Component } from '@angular/core';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';

@Component({
  selector: 'datos-transportista',
  templateUrl: './datos-transportista.component.html',
  styleUrl: './datos-transportista.component.scss'
})
export class DatosTransportistaComponent {
  modal: string = 'modal';
  abrirModal() {
    this.modal = 'modal-open';

  }
  cerrarModal() {
    this.modal = 'modal';
  }
}
