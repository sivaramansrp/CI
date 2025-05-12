import { AMBIENTES, TramiteDetails } from '@ng-mf/data-access-user';
import { Component, OnInit } from '@angular/core';
import tramiteDetailsData from '@libs/shared/theme/assets/json/tramiteList.json'


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
     * Un arreglo que contiene los detalles de varios "Trámites" (procedimientos o procesos).
     * Cada elemento en el arreglo es de tipo `TramiteDetails`.
     * Estos datos se utilizan para gestionar y mostrar información relacionada con diferentes trámites.
     */
    public tramiteData: TramiteDetails[] = [];
  
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
    
    this.tramiteData = tramiteDetailsData.filter((v) => v.department === "cofepris") ;
  }
}