import { Component } from '@angular/core';
import { TEXTOS } from '../../../../shared/constantes/303/texto.enum';

@Component({
  selector: 'empleados-contratados',
  templateUrl: './empleados-subcontratados.component.html',
  styleUrl: './empleados-subcontratados.component.scss'
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
