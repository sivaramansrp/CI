import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ContenedorDeDatosSolicitudComponent } from '../../components/contenedor-de-datos-solicitud/contenedor-de-datos-solicitud.component';
import { PagoDeDerechosComponent } from '../../../../shared/components/pago-de-derechos/pago-de-derechos.component';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { TercerosRelacionadosVistaComponent } from '../../components/terceros-relacionados-vista/terceros-relacionados-vista.component';

@Component({
  selector: 'app-paso-uno',
  standalone: true,
  imports: [
    CommonModule,
    SolicitanteComponent,
    ContenedorDeDatosSolicitudComponent,
    TercerosRelacionadosVistaComponent,
    PagoDeDerechosComponent,
  ],
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
export class PasoUnoComponent {
  // Variable que mantiene el índice de la pestaña seleccionada.
  indice: number = 1;

  /**
   * Método para seleccionar la pestaña activa según el índice proporcionado.
   * @param indice El índice de la pestaña que se desea seleccionar.
   */
  seleccionaTab(indice: number): void {
    // Asigna el valor del índice seleccionado a la propiedad 'indice'.
    this.indice = indice;
  }
}
