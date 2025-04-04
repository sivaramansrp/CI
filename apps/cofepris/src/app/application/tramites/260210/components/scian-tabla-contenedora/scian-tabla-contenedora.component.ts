import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ScianTablaComponent } from '../../../../shared/components/scian-tabla/scian-tabla.component';
import { TablaScianConfig } from '../../../../shared/models/datos-solicitud.model';
import { Tramite260214Store } from '../../estados/tramite260210Store.store';

@Component({
  selector: 'app-scian-tabla-contenedora',
  standalone: true,
  imports: [CommonModule, ScianTablaComponent],
  templateUrl: './scian-tabla-contenedora.component.html',
  styleUrl: './scian-tabla-contenedora.component.scss',
})
export class ScianTablaContenedoraComponent {
  constructor(private tramite260214Store: Tramite260214Store) {}

  public scianSeleccionado!: TablaScianConfig;

  /**
   * Método que actualiza el estado del store con la configuración seleccionada de la tabla SCIAN.
   *
   * @param event - Objeto de tipo `TablaScianConfig` que contiene los datos seleccionados de la tabla.
   */
  obtenerSeleccionado(event: TablaScianConfig): void {
    this.tramite260214Store.update((state) => ({
      ...state,
      scianConfigDatos: [event],
    }));
  }
}
