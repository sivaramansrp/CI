import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConsultarequerimientosComponent } from "../consultaRequerimientos/consultarequerimientos.component";

@Component({
  selector: 'lib-requerimientospaso1',
  standalone: true,
  imports: [CommonModule, ConsultarequerimientosComponent],
  templateUrl: './requerimientospaso1.component.html',
  styleUrl: './requerimientospaso1.component.css',
})
export class Requerimientospaso1Component {
  indice: number = 1;

  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
