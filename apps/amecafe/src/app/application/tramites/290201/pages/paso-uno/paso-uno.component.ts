import { Component } from '@angular/core';
import { DatosTramiteComponent } from '../../components/datosTramite.component';
import { TercerosRelacionadosComponent } from '../../components/terceros-relacionados/terceros-relacionados.component';
@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  styles: ``,
})
export class PasoUnoComponent {
  indice: number = 1;

  seleccionaTab(i: number): void {
    this.indice = i;
  }

}
