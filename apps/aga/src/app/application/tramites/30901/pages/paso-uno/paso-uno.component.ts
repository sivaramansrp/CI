import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosProrrogaMuestrasMercanciasComponent } from '../../components/datos-prorroga-muestras-mercancias/datos-prorroga-muestras-mercancias.component';
import { PagoLineaDeCapturaComponent } from '../../components/pago-linea-de-captura/pago-linea-de-captura.component';
import { RegistroRenovacionesMuestrasMercanciasComponent } from '../../components/registro-renovaciones-muestras-mercancias/registro-renovaciones-muestras-mercancias.component';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { ViewChild } from '@angular/core';

/**
 * Componente que representa el primer paso de un trámite.
 */
@Component({
  selector: 'app-paso-uno',
  standalone: true,
  imports: [
    SolicitanteComponent,
    PagoLineaDeCapturaComponent,
    RegistroRenovacionesMuestrasMercanciasComponent,
    DatosProrrogaMuestrasMercanciasComponent,
    CommonModule,
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
   * Referencia al componente PagoLineaDeCapturaComponent
   */
  @ViewChild(PagoLineaDeCapturaComponent)
  pagoLineaDeCapturaComponent!: PagoLineaDeCapturaComponent;

  /**
   * Selecciona una pestaña específica.
   * @param i - El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
