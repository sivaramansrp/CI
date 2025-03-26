import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosCertificadoComponent } from '../../components/datos-certificado/datos-certificado.component';
import { DestinatarioComponent } from '../../components/destinatario/destinatario.component';
import { HistoricoProductoresComponent } from '../../components/historico-productores/historico-productores.component';
import { SolicitanteComponent } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
  standalone: true,
  imports: [CommonModule, SolicitanteComponent, DatosCertificadoComponent, HistoricoProductoresComponent, DestinatarioComponent]

})
export class PasoUnoComponent {
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;
  indice: number = 4;



  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
