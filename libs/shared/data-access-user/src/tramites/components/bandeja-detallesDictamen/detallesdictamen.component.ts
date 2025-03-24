import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DictamenesComponent } from "../bandejaDictamenes/dictamenes.component";
import { TercerosComponent } from "../terceros/terceros.component";

@Component({
  selector: 'lib-detallesdictamen',
  standalone: true,
  imports: [CommonModule, TercerosComponent, DictamenesComponent],
  templateUrl: './detallesdictamen.component.html',
  styleUrl: './detallesdictamen.component.css',
})
export class DetallesdictamenComponent {
  indice: number = 1;

  seleccionaTab(i: number): void {
    this.indice = i;
  }
}