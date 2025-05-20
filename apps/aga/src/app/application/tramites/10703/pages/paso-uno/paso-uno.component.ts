import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ExencionDeImpuestosComponent } from '../../components/exencionDeImpuestos/exencionDeImpuestos.component';
import { SolicitanteComponent } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-paso-uno',
  standalone: true,
  imports: [CommonModule, SolicitanteComponent, ExencionDeImpuestosComponent],
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent {
  /**
   * Índice de la pestaña seleccionada.
   */
  indice: number = 1;

  /**
   * Selecciona la pestaña especificada.
   *
   * @param i - El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
