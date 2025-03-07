import { Component } from '@angular/core';

@Component({
  selector: 'app-capturar-solicitud',
  templateUrl: './capturar-solicitud.component.html'
})
export class CapturarSolicitudComponent {
  
  indice: number=1;

  
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
