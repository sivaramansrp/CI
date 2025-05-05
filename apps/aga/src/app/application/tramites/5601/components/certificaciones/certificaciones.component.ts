import { InputCheckComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { MENSAJE_MODAL, TITULO_MODAL } from '../../constantes/tramite5601.enum';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-certificaciones',
  standalone: true,
  imports: [CommonModule,TituloComponent,InputCheckComponent],
  templateUrl: './certificaciones.component.html',
  styleUrl: './certificaciones.component.scss',
})
export class CertificacionesComponent {
  modal: string = '';

  tituloModal!: string;

  mensajeModal!: string;
  

  mostrarModalSiSeleccionado(event: Event): void {
    const CHECKBOX = event.target as HTMLInputElement;
    if (CHECKBOX.checked) {
      this.tituloModal = TITULO_MODAL
      this.mensajeModal = MENSAJE_MODAL;
      this.abrirModal();
    }
  }

  abrirModal(): void {
    this.modal = 'show';
  }

  cerrarModal(): void {
    this.modal = '';
    this.tituloModal = '';
    this.mensajeModal = '';
  }

  confirmarAccion(): void {
    this.cerrarModal();
  }

  cancelarAccion(): void {
    this.cerrarModal();
  }

}
