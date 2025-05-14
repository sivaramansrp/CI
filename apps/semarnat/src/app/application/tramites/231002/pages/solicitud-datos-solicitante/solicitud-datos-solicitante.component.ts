import { Component } from '@angular/core';

/**
 * Componente que representa la sección de solicitud de datos del solicitante.
 * 
 * Este componente permite gestionar la información del solicitante en el formulario y 
 * proporciona la funcionalidad de selección de pestañas dentro de la interfaz.
 * 
 * - selector: Nombre que se utilizará en el HTML para referenciar este componente.
 * - templateUrl: Ruta del archivo HTML asociado al componente.
 */
@Component({
  selector: 'app-solicitud-datos-solicitante',
  templateUrl: './solicitud-datos-solicitante.component.html',
})
export class SolicitudDatosSolicitanteComponent {

  /**
   * Índice de la pestaña seleccionada.
   * 
   * Esta propiedad indica cuál de las pestañas del formulario está seleccionada en un 
   * momento dado, permitiendo controlar la navegación entre las diferentes secciones.
   * 
   * @type {number}
   */
  indice: number = 1;

  /**
   * Selecciona una pestaña específica.
   * 
   * Este método actualiza el valor de `indice` para seleccionar la pestaña correspondiente 
   * y cambiar la vista dentro del formulario.
   * 
   * @param {number} i - El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

}
