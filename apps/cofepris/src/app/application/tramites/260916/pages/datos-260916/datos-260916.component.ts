import { Component } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject } from 'rxjs';
/**
 * @descripción
 * Componente `Datos260916Component` encargado de manejar las pestañas (tabs) 
 * en la interfaz de usuario. Proporciona la funcionalidad de selección de pestañas.
 */
@Component({
  selector: 'app-datos-260916',
  templateUrl: './datos-260916.component.html',
})
export class Datos260916Component {
 /**
     * Indica si se están mostrando los datos de respuesta.
     */
    public esDatosRespuesta: boolean = false;
    /**
     * Estado actual de la consulta.
     */
    public consultaState!: ConsultaioState;
    /**
     * Notificador para destruir las suscripciones y evitar fugas de memoria.
     */
    private destroyNotifier$: Subject<void> = new Subject();
   /**
     * showPreFillingOptions
     * Indica si se deben mostrar las opciones de prellenado.
     */
 showPreFillingOptions: boolean = false; 
constructor( private consultaQuery: ConsultaioQuery,
      
          private solocitudService: ModificacionPermisoImportacionSanitario,
    ){
  
    }
  /**
 * Índice de la pestaña actualmente seleccionada.
 * Inicializado a 1 por defecto.
 */
  indice = 1;

  /**
   * Método para seleccionar una pestaña específica.
   *
   * @param i El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
