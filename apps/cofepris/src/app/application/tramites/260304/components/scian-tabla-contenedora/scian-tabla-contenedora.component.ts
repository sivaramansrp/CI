import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ID_PROCEDIMIENTO } from '../../constants/medicamentos-contengan.enum';
import { ScianTablaComponent } from '../../../../shared/components/scian-tabla/scian-tabla.component';
import { TablaScianConfig } from '../../../../shared/models/datos-solicitud.model';
import { Tramite260304Store } from '../../estados/tramite260304Store.store';

@Component({
  selector: 'app-scian-tabla-contenedora',
  standalone: true,
  imports: [CommonModule, ScianTablaComponent],
  templateUrl: './scian-tabla-contenedora.component.html',
  styleUrl: './scian-tabla-contenedora.component.scss',
})
export class ScianTablaContenedoraComponent {
  /**
   * @property {string} idProcedimiento
   * @description
   * Identificador del procedimiento.
   */
  public readonly idProcedimiento = ID_PROCEDIMIENTO;

  /**
   * Constructor de la clase que inyecta el store del trámite.
   * @param tramite260304Store {Tramite260304Store} Store asociado al trámite 260304.
   */
  constructor(private tramite260304Store: Tramite260304Store) {
    // Constructor necesario para inyectar el store del trámite
  }

  /**
   * @type {TablaScianConfig}
   * Configuración seleccionada para la tabla SCIAN
   */
  public scianSeleccionado!: TablaScianConfig;

  /**
   * Método que actualiza el estado del store con la configuración seleccionada de la tabla SCIAN.
   *
   * @param event - Objeto de tipo `TablaScianConfig` que contiene los datos seleccionados de la tabla.
   */
  obtenerSeleccionado(event: TablaScianConfig): void {
    this.tramite260304Store.update((state) => ({
      ...state,
      scianConfigDatos: [event],
    }));
  }
}
