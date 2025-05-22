import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ID_PROCEDIMIENTO } from '../../constants/medicamentos-contengan.enum';
import { ScianTablaComponent } from '../../../../shared/components/scian-tabla/scian-tabla.component';
import { TablaScianConfig } from '../../../../shared/models/datos-solicitud.model';
import { Tramite260304Store } from '../../estados/tramite260304Store.store';

/**
 * @component ScianTablaContenedoraComponent
 * @description
 * Componente contenedor encargado de mostrar la tabla SCIAN y gestionar la selección
 * de configuraciones SCIAN, actualizando el estado asociado en el store del trámite.
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
   * @property {string} idProcedimiento
   * @description
   * Identificador del procedimiento.
   */
  public readonly idProcedimiento = ID_PROCEDIMIENTO;

  /**
   * @property {TablaScianConfig} scianSeleccionado
   * @description
   * Configuración seleccionada para la tabla SCIAN.
   */
  public scianSeleccionado!: TablaScianConfig;

  /**
   * @constructor
   * @description
   * Constructor de la clase que inyecta el store del trámite.
   * @param tramite260304Store {Tramite260304Store} Store asociado al trámite 260304.
   */
  constructor(private tramite260304Store: Tramite260304Store) {
    // Constructor necesario para inyectar el store del trámite
  }

  /**
   * @method obtenerSeleccionado
   * @description
   * Método que actualiza el estado del store con la configuración seleccionada de la tabla SCIAN.
   * Agrega la nueva selección al arreglo de configuraciones SCIAN.
   * 
   * @param event - Objeto de tipo `TablaScianConfig` que contiene los datos seleccionados de la tabla.
   */
  obtenerSeleccionado(event: TablaScianConfig): void {
    this.tramite260304Store.update((state) => ({
      ...state,
      scianConfigDatos: [...state.scianConfigDatos, event],
    }));
  }
}