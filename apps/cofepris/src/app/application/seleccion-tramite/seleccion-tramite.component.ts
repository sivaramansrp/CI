import { Component, OnInit } from '@angular/core';
import { AMBIENTES } from '@ng-mf/data-access-user';

/**
 * Componente para la selección del trámite.
 * 
 * @export
 * @class SeleccionTramiteComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-seleccion-tramite',
  templateUrl: './seleccion-tramite.component.html',
})
export class SeleccionTramiteComponent implements OnInit {

  /**
   * Variable para asignar el endpoint de la ruta.
   * 
   * @type {string}
   * @memberof SeleccionTramiteComponent
   */
  public ruta = '';
  
  /**
   * Método que se ejecuta al iniciar el componente.
   * 
   * @memberof SeleccionTramiteComponent
   */
  ngOnInit(): void {
    if (window.location.host.indexOf('localhost') !== -1) {
      this.ruta = AMBIENTES.LOCALHOST;
    } else {
      this.ruta = AMBIENTES.DESARROLLO;
    }
  }
}