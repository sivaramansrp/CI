import { AvisoComponent } from '../../components/aviso/aviso.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SolicitanteComponent } from "@ng-mf/data-access-user";

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
  imports: [CommonModule, SolicitanteComponent, AvisoComponent],
  standalone: true,
})
export class PasoUnoComponent {
  indice: number = 1;

  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
