import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ScianTablaComponent } from '../../../../shared/components/scian-tabla/scian-tabla.component';
import { TablaScianConfig } from '../../../../shared/models/datos-solicitud.model';
import { Tramite260217Store } from '../../estados/tramite260217Store.store';


@Component({
  selector: 'app-scian-tabla-contenedora',
  standalone: true,
  imports: [CommonModule, ScianTablaComponent],
  templateUrl: './scian-tabla-contenedora.component.html',
  styleUrl: './scian-tabla-contenedora.component.scss',
})
export class ScianTablaContenedoraComponent {
  
  /**
   * Constructor que inyecta el store del trámite 260217.
   * @constructor
   * @param {Tramite260217Store} tramite260217Store - Store que maneja el estado del trámite 260217.
   */
  constructor(private tramite260217Store: Tramite260217Store) {
        // No se necesita lógica de inicialización adicional.
  }

  /**
   * Configuración del SCIAN (Sistema de Clasificación Industrial de América del Norte) seleccionado.
   * @type {TablaScianConfig}
   * @public
   */
  public scianSeleccionado!: TablaScianConfig;

  /**
   * Método que actualiza el estado del store con la configuración seleccionada de la tabla SCIAN.
   * 
   * @param event - Objeto de tipo `TablaScianConfig` que contiene los datos seleccionados de la tabla.
   */
  obtenerSeleccionado(event: TablaScianConfig): void {
     this.tramite260217Store.update((state) => ({
      ...state,
      scianConfigDatos: [event]
    }))
  }
}
