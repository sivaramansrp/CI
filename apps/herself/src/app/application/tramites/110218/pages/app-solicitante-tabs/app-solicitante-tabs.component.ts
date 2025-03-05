import { Component } from '@angular/core';

@Component({
  selector: 'app-solicitante-tabs',
  templateUrl: './app-solicitante-tabs.component.html',
})
export class AppSolicitanteTabsComponent {
  indice: number = 1;
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
