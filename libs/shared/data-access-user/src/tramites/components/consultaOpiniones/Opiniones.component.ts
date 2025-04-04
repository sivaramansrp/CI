import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DetalleOpinionComponent } from "../consultaDetalleOpinion/DetalleOpinion.component";

@Component({
  selector: 'lib-opiniones',
  standalone: true,
  imports: [CommonModule, DetalleOpinionComponent],
  templateUrl: './Opiniones.component.html',
  styleUrl: './Opiniones.component.css',
})
export class OpinionesComponent {
  indice: number = 1;

  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
