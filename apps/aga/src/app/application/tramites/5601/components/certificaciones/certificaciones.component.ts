import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TITULO_MODAL } from '../../constantes/tramite5601.enum';
import { TituloComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-certificaciones',
  standalone: true,
  imports: [CommonModule,TituloComponent],
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
      this.mensajeModal = '¿Cuenta con algún documento que acredite la autorización y A vigencia de su esquema de certificación?';
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
