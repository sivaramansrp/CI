import { SolicitanteComponent, TercerosComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosDeLaSolicitudComponent } from '../../components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { PagoDeDerechosComponent } from '../../components/pago-de-derechos/pago-de-derechos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TransporteComponent } from '../../components/transporte/transporte.component';



@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.css',
  standalone: true,
  imports: [SolicitanteComponent, DatosDeLaSolicitudComponent, PagoDeDerechosComponent, TransporteComponent, TercerosComponent, ReactiveFormsModule, CommonModule],
})
export class PasoUnoComponent {
  /**
     * @property {number} indice - El índice de la pestaña seleccionada.
     */
    indice: number = 1;
  
    /**
     * @method seleccionaTab
     * @description Selecciona una pestaña y actualiza el índice.
     * @param {number} i - El índice de la pestaña seleccionada.
     */
    seleccionaTab(i: number): void {
      this.indice = i;
    }
}
