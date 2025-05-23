import { Component } from '@angular/core';

/**
 * component SolicitudComponent
 * description Este componente se encarga de gestionar la vista y la lógica relacionada con la solicitud en el trámite 300105.
 */
@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
})
/**
 * class SolicitudComponent
 * description Clase que representa el componente de la solicitud.
 */
export class SolicitudComponent{
/** 
* Almacena el tipo de operación seleccionado. 
*/
obtenerTipoOperacionSeleccionado!: string | number;
/** 
* Constructor del componente. 
*/
constructor(){//
  // Constructor del componente
}
/** 
 * Método que asigna el tipo de operación seleccionado recibido como evento. 
 */
public buscarTipoOperacionSeleccionado(event: string | number): void {
  if (event) {
    this.obtenerTipoOperacionSeleccionado = event;
   }
 }
} 