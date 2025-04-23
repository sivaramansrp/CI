import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ID_PROCEDIMIENTO } from '../../constants/exporticon-estupefacientes.enum';
import { ScianTablaComponent } from '../../../../shared/components/scian-tabla/scian-tabla.component';
import { TablaScianConfig } from '../../../../shared/models/datos-solicitud.model';
import { Tramite260302Store } from '../../estados/tramite260302Store.store';


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
    
  constructor(private tramite260302Store: Tramite260302Store){
    // Constructor necesario para inyectar el store del trámite
  }

  /**
   * @property {TablaScianConfig} scianSeleccionado
   * @description
   * Almacena la configuración seleccionada de la tabla SCIAN.
   * Se usa el operador `!` para indicar que la variable no es nula ni indefinida en el momento de su uso.
   */
  public scianSeleccionado!: TablaScianConfig;

  /**
   * Método que actualiza el estado del store con la configuración seleccionada de la tabla SCIAN.
   * 
   * @param event - Objeto de tipo `TablaScianConfig` que contiene los datos seleccionados de la tabla.
   */
  obtenerSeleccionado(event: TablaScianConfig): void {
     this.tramite260302Store.update((state) => ({
      ...state,
      scianConfigDatos: [event]
    }))
  }
}
