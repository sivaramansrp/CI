import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';

/**
 * Componente que representa el primer paso de un trámite.
 */
@Component({
  selector: 'app-paso-uno',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SolicitanteComponent],
  templateUrl: './paso-uno.component.html',
  styleUrls: ['./paso-uno.component.scss'],
})
/**
 * Componente que representa el primer paso de un trámite.
 */
export class PasoUnoComponent {
  /**
   * Índice utilizado para identificar la posición actual en un proceso o lista.
   * @type {number}
   */
  indice: number = 1;

  /**
   * Selecciona una pestaña específica.
   * @param i - El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
