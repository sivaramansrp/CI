import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ScianTablaComponent } from '../../../../shared/components/scian-tabla/scian-tabla.component';
import { TablaScianConfig } from '../../../../shared/models/datos-solicitud.model';
import { Tramite260202Store } from '../../estados/tramite260202Store.store';


/**
 * Componente `ScianTablaContenedoraComponent` que actúa como contenedor para la tabla SCIAN.
 * 
 * Este componente es independiente (`standalone`) y utiliza los módulos `CommonModule` y `ScianTablaComponent`.
 * Su propósito principal es manejar la selección de configuraciones de la tabla SCIAN y actualizar el estado del store correspondiente.
 * 
 * @selector app-scian-tabla-contenedora
 * @standalone true
 * @imports CommonModule, ScianTablaComponent
 * @templateUrl ./scian-tabla-contenedora.component.html
 * @styleUrl ./scian-tabla-contenedora.component.scss
 * 
 * @class ScianTablaContenedoraComponent
 * @constructor
 * @param tramite260202Store - Inyección del store `Tramite260202Store` para gestionar el estado del componente.
 */
@Component({
  selector: 'app-scian-tabla-contenedora',
  standalone: true,
  imports: [CommonModule, ScianTablaComponent],
  templateUrl: './scian-tabla-contenedora.component.html',
  styleUrl: './scian-tabla-contenedora.component.scss',
})
export class ScianTablaContenedoraComponent {

  /**
   * @component ScianTablaContenedoraComponent
   * 
   * Este componente representa una tabla contenedora para la selección de SCIAN (Sistema de Clasificación Industrial de América del Norte).
   * 
   * @property {TablaScianConfig} scianSeleccionado - Configuración seleccionada de la tabla SCIAN. 
   * Este objeto contiene los datos relacionados con la selección actual realizada por el usuario en la tabla SCIAN.
   * 
   * @description
   * Este componente se utiliza para gestionar y mostrar la información relacionada con la selección de SCIAN.
   * Permite a los usuarios interactuar con una tabla que contiene clasificaciones industriales y seleccionar una opción específica.
   * La propiedad `scianSeleccionado` almacena la configuración seleccionada, que puede ser utilizada para realizar operaciones adicionales
   * como validaciones, cálculos o envío de datos a otros componentes o servicios.
   */
  public scianSeleccionado!: TablaScianConfig;

  /**
   * Constructor de la clase ScianTablaContenedoraComponent.
   * 
   * Este constructor inicializa el componente y realiza la inyección del store 
   * `Tramite260202Store` para su uso dentro del componente. El store proporciona 
   * acceso a los datos y métodos necesarios para gestionar el estado relacionado 
   * con los trámites específicos.
   * 
   * @param tramite260202Store - Instancia del store `Tramite260202Store` que se 
   * inyecta para interactuar con el estado de la aplicación.
   */
  constructor(private tramite260202Store: Tramite260202Store){
    // Constructor vacío, se inyecta el store para su uso en el componente.
  }


  /**
   * Método que actualiza el estado del store con la configuración seleccionada de la tabla SCIAN.
   * 
   * @param event - Objeto de tipo `TablaScianConfig` que contiene los datos seleccionados de la tabla.
   */
  obtenerSeleccionado(event: TablaScianConfig): void {
     this.tramite260202Store.update((state) => ({
      ...state,
      scianConfigDatos: [event]
    }))
  }
}
