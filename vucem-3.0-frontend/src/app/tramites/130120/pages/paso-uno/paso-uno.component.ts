import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosDeLaSolicitudComponent } from "../../components/datos-de-la-solicitud/datos-de-la-solicitud.component";
import { SolicitanteComponent } from "../../components/solicitante/solicitante.component";

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
  imports: [CommonModule, SolicitanteComponent, DatosDeLaSolicitudComponent],
  standalone: true,
})
export class PasoUnoComponent {

  indice: number = 2;

  seleccionaTab(i: number): void {
    this.indice = i;
  }

}
