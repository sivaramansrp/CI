import { Component } from '@angular/core';

@Component({
  selector: 'agregar-miembros-empresa',
  templateUrl: './agregar-miembros-empresa.component.html',
  styleUrl: './agregar-miembros-empresa.component.scss'
})
export class AgregarMiembrosEmpresaComponent {
  modal: string = 'modal';
  abrirModal() {
    this.modal = 'modal-open';

  }
  cerrarModal() {
    this.modal = 'modal';
  }
}
