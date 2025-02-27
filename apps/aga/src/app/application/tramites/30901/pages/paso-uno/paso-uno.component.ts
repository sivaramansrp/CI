import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosProrrogaMuestrasMercanciasComponent } from '../../components/datos-prorroga-muestras-mercancias/datos-prorroga-muestras-mercancias.component';
import { PagoLCComponent } from '../../components/pago-lc/pago-lc.component';
import { RegistroRenovacionesMuestrasMercanciasComponent } from '../../components/registro-renovaciones-muestras-mercancias/registro-renovaciones-muestras-mercancias.component';
import { SolicitanteComponent } from '@ng-mf/data-access-user';

/**
 * Componente que representa el primer paso de un trámite.
 */
@Component({
  selector: 'app-paso-uno',
  standalone: true,
  imports: [
    CommonModule,
    SolicitanteComponent,
    RegistroRenovacionesMuestrasMercanciasComponent,
    PagoLCComponent,
    DatosProrrogaMuestrasMercanciasComponent,
  ],
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
  seleccionaTab(i:number): void {
    this.indice = i;
  }
}
