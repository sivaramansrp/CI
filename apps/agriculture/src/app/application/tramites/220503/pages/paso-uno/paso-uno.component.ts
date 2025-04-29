import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RevisionDocumentalComponent } from '../../components/revision-documental/revision-documental.component';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { SolicitudDatosComponent } from '../../components/SolicitudDatos/SolicitudDatos.component';
/** Componente para gestionar el primer paso del trámite */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  imports: [
    CommonModule,
    SolicitanteComponent,
    SolicitudDatosComponent,
    RevisionDocumentalComponent,
  ],
  standalone: true,
})
/** Componente para gestionar el primer paso del trámite */
export class PasoUnoComponent {
  /** Realiza un seguimiento del índice de la pestaña seleccionada actualmente */
  indice: number = 1;
  /**
   * Actualiza el índice de la pestaña seleccionada.
   * @param i - The index of the selected tab
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
