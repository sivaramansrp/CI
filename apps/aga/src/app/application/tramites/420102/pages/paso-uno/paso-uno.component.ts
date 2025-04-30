import { SeccionLibStore, SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConcluirRelacionComponent } from '../../components/concluir-relacion/concluir-relacion.component';

@Component({
  selector: 'app-paso-uno',
  standalone: true,
  imports: [CommonModule,
    SolicitanteComponent,
    ConcluirRelacionComponent
  ],
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
export class PasoUnoComponent {

  /**
   * @property {number} indice - Índice actual del paso.
   */
  indice: number = 1;


  constructor(private seccionStore: SeccionLibStore) {
      // Se puede agregar aquí la lógica del constructor si es necesario
  }

  /**
   * @method seleccionaTab
   * @description Selecciona una pestaña específica estableciendo el índice correspondiente.
   * @param {number} i - El índice de la pestaña a seleccionar.
   * @returns {void}
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}