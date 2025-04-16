import { Component } from '@angular/core';
// Importación del componente Solicitante desde la librería compartida
/**
 * Componente DatosComponent.
 * 
 * Este componente se encarga de gestionar la lógica relacionada con los datos
 * en la página correspondiente. Incluye funcionalidades para interactuar con
 * componentes hijos y manejar la selección de pestañas.
 */
@Component({
  selector: 'app-datos', // Selector del componente
  templateUrl: './datos.component.html' // Ruta del archivo HTML asociado al componente
})
export class DatosComponent {
  /**
   * Índice del subtítulo actual.
   * 
   * Esta variable se utiliza para almacenar el índice de la pestaña seleccionada.
   * Por defecto, se inicializa con el valor 1.
   */
  indice: number = 1;

  /**
   * Método para seleccionar una pestaña específica.
   * 
   * Este método actualiza el índice de la pestaña seleccionada, permitiendo
   * cambiar entre diferentes vistas o secciones de la interfaz.
   * 
   * @param i - Índice de la pestaña que se desea seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
