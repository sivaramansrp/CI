import { Component } from '@angular/core';
import { TEXTOS } from '../../../../shared/constantes/303/texto.enum';

@Component({
  selector: 'empleados-contratados',
  templateUrl: './empleados-contratados.component.html',
  styleUrl: './empleados-contratados.component.scss'
})
export class EmpleadosContratadosComponent {
  TEXTOS = TEXTOS;
  modal: string = 'modal';
  abrirModal() {
    this.modal = 'modal-open';

  }
  cerrarModal() {
    this.modal = 'modal';
  }
}
