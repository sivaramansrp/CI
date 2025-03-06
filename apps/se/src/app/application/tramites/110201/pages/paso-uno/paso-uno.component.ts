import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule, SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { CertificadoDeOrigenComponent } from '../../components/certificado-de-origen/certificado-de-origen.component';
import { DatosCertificadoComponent } from '../../components/datos-certificado/datos_certificado.component';
import { DestinatarioComponent } from '../../components/destinatario/destinatario.component';


@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  styles: ``,
  standalone: true,
  imports:[SharedModule, CommonModule, SolicitanteComponent, CertificadoDeOrigenComponent,DatosCertificadoComponent,DestinatarioComponent]
})
export class PasoUnoComponent {
  indice: number = 1;

  seleccionaTab(i: number): void {
    this.indice = i;
  }

}
