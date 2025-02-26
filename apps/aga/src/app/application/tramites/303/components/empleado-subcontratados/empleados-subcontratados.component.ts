import { Component } from '@angular/core';
import { TEXTOS_303 } from '@ng-mf/data-access-user';

@Component({
  selector: 'empleados-contratados',
  templateUrl: './empleados-subcontratados.component.html',
  styleUrl: './empleados-subcontratados.component.scss'
})
export class EmpleadosContratadosComponent {
  TEXTOS = TEXTOS_303;
  modal: string = 'modal';
  abrirModal() {
    this.modal = 'modal-open';

  }
  cerrarModal() {
    this.modal = 'modal';
  }
}
