import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AMBIENTES } from '@ng-mf/data-access-user';
import { TituloComponent } from "@ng-mf/data-access-user";

@Component({
  selector: 'seleccion-tramite-desde-panel',
  templateUrl: './seleccion-tramite-desde-panel.component.html',
  styleUrl: './seleccion-tramite-desde-panel.component.scss',
  imports: [TituloComponent,RouterModule],
  standalone: true
})
export class SeleccionTramiteDesdePanelComponent {

  /**
   * Variable para asingar el endpoint de la ruta
   */
  public ruta: string = '';
  
  ngOnInit(): void {
    if (window.location.host.indexOf('localhost') !== -1) {
      this.ruta = AMBIENTES.LOCALHOST;
    } else {
      this.ruta = AMBIENTES.DESARROLLO
    }
  }
  
}
