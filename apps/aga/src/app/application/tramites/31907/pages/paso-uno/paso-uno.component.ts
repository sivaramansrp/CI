import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-paso-uno',
  standalone: true,
  imports: [CommonModule, SolicitanteComponent],
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent {
  /**
   * Índice actual del tab mostrado.
   */
  indice: number = 2;
  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  /**
   * metodo para seleccionar el tab actual
   * @param i numero de tab a seleccionar
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
