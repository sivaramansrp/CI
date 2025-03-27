import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {
  SolicitanteComponent
} from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { DatosCertificadoComponent } from '../../components/datos-certificado/datos-certificado.component';
import { DestinatarioComponent } from '../../components/destinatario/destinatario.component';
import { HistoricoProductoresComponent } from '../../components/historico-productores/historico-productores.component';
import { CertificadoOrigenComponent } from '../../components/certificado-origen/certificado-origen.component';

@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
  standalone: true,
  imports: [CommonModule, SolicitanteComponent, DatosCertificadoComponent,
    DestinatarioComponent,HistoricoProductoresComponent,CertificadoOrigenComponent]


})
export class PasoUnoComponent implements AfterViewInit {
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;
  indice: number = 1;

  ngAfterViewInit(): void {

  }

  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
