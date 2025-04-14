import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ID_PROCEDIMIENTO } from '../../constants/medicamentos-destinados-uso.enum';
import { ScianTablaComponent } from '../../../../shared/components/scian-tabla/scian-tabla.component';
import { TablaScianConfig } from '../../../../shared/models/datos-solicitud.model';
import { Tramite260208Store } from '../../estados/tramite260208Store.store';


@Component({
  selector: 'app-scian-tabla-contenedora',
  standalone: true,
  imports: [CommonModule, ScianTablaComponent],
  templateUrl: './scian-tabla-contenedora.component.html',
  styleUrl: './scian-tabla-contenedora.component.scss',
})
export class ScianTablaContenedoraComponent {

  /**
   * Identificador constante del procedimiento.
   * Esta propiedad es de solo lectura y se asigna desde la constante `ID_PROCEDIMIENTO`.
   */
  public readonly idProcedimiento = ID_PROCEDIMIENTO;
  
  /**
   * Constructor que inyecta el store del trámite 260208.
   * @constructor
   * @param {Tramite260208Store} tramite260208Store - Store que maneja el estado del trámite 260208.
   */
  constructor(private tramite260208Store: Tramite260208Store) {
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
     this.tramite260208Store.update((state) => ({
      ...state,
      scianConfigDatos: [event]
    }))
  }
}
