import { AMBIENTES, TituloComponent } from '@ng-mf/data-access-user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seleccion-modulo',
  templateUrl: './seleccion-modulo.component.html',
  imports: [TituloComponent],
  standalone: true
})
export class SeleccionModuloComponent implements OnInit {

  /**
   * Variable para asingar el endpoint de la ruta
   */
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  public ruta: string = '';
  
  ngOnInit(): void {
    if (window.location.host.indexOf('localhost') !== -1) {
      this.ruta = AMBIENTES.LOCALHOST;
    } else {
      this.ruta = AMBIENTES.DESARROLLO
    }
  }
  
}
