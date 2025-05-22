
import { BtnContinuarComponent, SolicitanteComponent } from '@ng-mf/data-access-user';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


/**
 * Componente para el paso uno del wizard.
 */
@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  styles: ``,
   standalone: true,
   imports: [BtnContinuarComponent,FormsModule,ReactiveFormsModule,CommonModule,SolicitanteComponent],
})
export class PasoUnoComponent {
  /**
   * Índice del paso actual.
   */
  indice: number = 1;

  /**
   * Selecciona una pestaña del wizard.
   * @param {number} i - Índice de la pestaña.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
