import { Component } from '@angular/core';
import { AMBIENTES } from '../core/ambientes';

@Component({
  selector: 'seleccion-tramite',
  templateUrl: './seleccion-tramite.component.html',
})
export class SeleccionTramiteComponent {

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
