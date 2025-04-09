import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ScianTablaComponent } from '../../../../shared/components/scian-tabla/scian-tabla.component';
import { TablaScianConfig } from '../../../../shared/models/datos-solicitud.model';
import { Tramite260218Store } from '../../estados/tramite260218Store.store';

@Component({
  selector: 'app-scian-tabla-contenedora',
  standalone: true,
  imports: [CommonModule, ScianTablaComponent],
  templateUrl: './scian-tabla-contenedora.component.html',
  styleUrl: './scian-tabla-contenedora.component.scss',
})
export class ScianTablaContenedoraComponent {
  /**
   * @property {TablaScianConfig} scianSeleccionado
   * Contiene la configuración seleccionada de la tabla SCIAN.
   * Este objeto es utilizado para almacenar la información de la selección actual en la tabla.
   */
  public scianSeleccionado!: TablaScianConfig;

  /**
   * @constructor
   * Inyecta el servicio `Tramite260218Store` para actualizar el estado del store
   * con los datos seleccionados de la tabla SCIAN.
   *
   * @param tramite260218Store - Store que maneja el estado de la información del trámite.
   */
  constructor(private tramite260218Store: Tramite260218Store) {
        // no realizar ninguna acción
  }

  /**
   * @method obtenerSeleccionado
   * @description Este método se llama cuando se selecciona un nuevo elemento en la tabla SCIAN.
   * 
   * Actualiza el estado del store con la configuración seleccionada de la tabla SCIAN.
   * El estado `scianConfigDatos` se actualiza con el objeto `event`, que contiene la
   * configuración de la tabla seleccionada.
   *
   * @param {TablaScianConfig} event - Objeto que contiene los datos seleccionados de la tabla SCIAN.
   * El objeto `event` es de tipo `TablaScianConfig` y contiene la configuración actual seleccionada.
   */
  obtenerSeleccionado(event: TablaScianConfig): void {
    // Actualiza el estado del store con la configuración seleccionada de la tabla SCIAN
    this.tramite260218Store.update((state) => ({
      ...state,
      scianConfigDatos: [event] // Asigna el nuevo valor de la configuración seleccionada
    }));
  }
}
