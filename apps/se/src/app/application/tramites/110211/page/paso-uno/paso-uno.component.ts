/**
 * @component PasoUnoComponent
 * @description Este componente es responsable de manejar el primer paso del trámite.
 * Incluye la lógica para seleccionar una pestaña y actualizar el índice.
 * 
 * @import { Component } from '@angular/core';
 */

import { CamDatosCertificadoComponent } from '../../components/cam-datos-certificado/cam-datos-certificado.component';
import { CamDestinatarioComponent } from '../../components/cam-destinatario/cam-destinatario.component';
import { CertificadoOrigenComponent } from '../../components/certificado-origen/certificado-origen.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
  standalone:true,
  imports: [SolicitanteComponent,CertificadoOrigenComponent,CamDestinatarioComponent,CamDatosCertificadoComponent,CommonModule


  ]
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