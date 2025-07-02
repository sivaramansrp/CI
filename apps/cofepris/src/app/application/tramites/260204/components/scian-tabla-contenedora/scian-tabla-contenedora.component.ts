import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ScianTablaComponent } from '../../../../shared/components/scian-tabla/scian-tabla.component';
import { TablaScianConfig } from '../../../../shared/models/datos-solicitud.model';
import { Tramite260204Store } from '../../estados/stores/tramite260204Store.store';

/**
 * Componente `ScianTablaContenedoraComponent` que actúa como contenedor para la tabla SCIAN.
 * 
 * Este componente es independiente y utiliza los módulos `CommonModule` y `ScianTablaComponent`.
 * Proporciona una funcionalidad para manejar la selección de datos en la tabla SCIAN y actualizar el estado del store correspondiente.
 * 
 * @selector `app-scian-tabla-contenedora`
 * @standalone Este componente es independiente y no depende de un módulo específico.
 * @imports 
 * - `CommonModule`: Módulo común de Angular que proporciona directivas y servicios básicos.
 * - `ScianTablaComponent`: Componente que representa la tabla SCIAN.
 * @templateUrl Ruta al archivo HTML que define la estructura visual del componente.
 * @styleUrl Ruta al archivo SCSS que contiene los estilos del componente.
 * 
 * @class ScianTablaContenedoraComponent
 * @constructor
 * - `tramite260204Store`: Servicio de tipo `Tramite260204Store` utilizado para gestionar el estado de la aplicación relacionado con los trámites.
 * 
 * @property {TablaScianConfig} scianSeleccionado - Propiedad pública que almacena la configuración seleccionada de la tabla SCIAN.
 * 
 * @method obtenerSeleccionado
 * - Actualiza el estado del store con la configuración seleccionada de la tabla SCIAN.
 * - @param {TablaScianConfig} event - Objeto que contiene los datos seleccionados de la tabla SCIAN.
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
   * Constructor de la clase ScianTablaContenedoraComponent.
   * 
   * Este constructor inicializa una instancia del componente y establece la dependencia
   * del servicio `Tramite260204Store` para gestionar el estado relacionado con los trámites.
   * 
   * @param tramite260204Store - Servicio inyectado que proporciona acceso y manejo del estado
   * relacionado con el trámite 260204.
   */
  constructor(private tramite260204Store: Tramite260204Store){}

  /**
   * Representa la configuración seleccionada de la tabla SCIAN.
   * 
   * Esta propiedad almacena un objeto de tipo `TablaScianConfig` que contiene 
   * la información de la selección actual realizada en la tabla SCIAN. 
   * Es utilizada para gestionar y manipular los datos seleccionados en el contexto 
   * de los trámites dentro de la aplicación.
   * 
   * @type {TablaScianConfig}
   */
  public scianSeleccionado!: TablaScianConfig;

  /**
   * Método que actualiza el estado del store con la configuración seleccionada de la tabla SCIAN.
   * 
   * @param event - Objeto de tipo `TablaScianConfig` que contiene los datos seleccionados de la tabla.
   */
  obtenerSeleccionado(event: TablaScianConfig): void {
     this.tramite260204Store.update((state) => ({
      ...state,
      scianConfigDatos: [event]
    }))
  }
}
