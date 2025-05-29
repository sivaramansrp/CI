import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosDeLaSolicitudComponent } from '../../component/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { PagoDeDerechosComponent } from '../../component/pago-de-derechos/pago-de-derechos.component';
import { RevisionDocumentalComponent } from '../../component/revision-documental/revision-documental.component';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-paso-uno',
  standalone: true,
  imports: [
    CommonModule,
    SolicitanteComponent,
    DatosDeLaSolicitudComponent,
    RevisionDocumentalComponent,
    PagoDeDerechosComponent
  ],
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss'
})
export class PasoUnoComponent {
  /**
  * Índice de la pestaña seleccionada.
  */
  indice: number = 1;

  /**
   * Método para seleccionar una pestaña.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
