import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SolicitanteComponent } from "../solicitante/solicitante.component";
import { TercerosComponent } from "../terceros/terceros.component";

@Component({
  selector: 'lib-bandeja-paso1',
  standalone: true,
  imports: [CommonModule, SolicitanteComponent, TercerosComponent],
  templateUrl: './bandeja-paso1.component.html',
  styleUrl: './bandeja-paso1.component.css',
})
export class BandejaPaso1Component {
  indice: number = 1;

  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
