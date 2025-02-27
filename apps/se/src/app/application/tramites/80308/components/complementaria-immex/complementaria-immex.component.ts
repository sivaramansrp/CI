import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosAnexosComponent } from "../datos-anexos/datos-anexos.component";
import { DatosComplimentariaComponent } from "../datos-complimentaria/datos-complimentaria.component";
import { MontoFactorComponent } from "../monto-factor/monto-factor.component";

@Component({
  selector: 'app-complementaria-immex',
  templateUrl: './complementaria-immex.component.html',
  styleUrls: ['./complementaria-immex.component.scss'],
  standalone: true,
  imports: [CommonModule, MontoFactorComponent, DatosComplimentariaComponent, DatosAnexosComponent]
})
export class ComplementariaImmexComponent {
  indice: number = 1;

  seleccionaTab(i: number): void {
    this.indice = i;
  }

}