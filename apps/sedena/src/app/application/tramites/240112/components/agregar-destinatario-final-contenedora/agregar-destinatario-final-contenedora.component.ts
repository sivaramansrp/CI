import { Component, EventEmitter, Output } from '@angular/core';
import { AgregarDestinatarioFinalComponent } from '../../../../shared/components/agregar-destinatario-final/agregar-destinatario-final.component';
import { DestinoFinal } from '../../../../shared/models/terceros-relacionados.model';
import { ID_PROCEDIMIENTO } from '../../constants/agregar-destinatario.enum';
import { Tramite240112Store } from '../../estados/tramite240112Store.store';

/**
 * Componente contenedor para agregar destinatarios finales.
 *
 * Este componente actúa como un contenedor para el componente `AgregarDestinatarioFinalComponent`,
 * gestionando la interacción con el store del trámite y emitiendo eventos para cerrar el componente.
 *
 * @componente
 * @selector app-agregar-destinatario-final-contenedora
 * @template ./agregar-destinatario-final-contenedora.component.html
 * @estilo ./agregar-destinatario-final-contenedora.component.scss
 * @standalone
 * @importa AgregarDestinatarioFinalComponent
 *
 * @notas
 * Utiliza el store `Tramite240112Store` para administrar el estado de los destinatarios finales.
 */
@Component({
  selector: 'app-agregar-destinatario-final-contenedora',
  templateUrl: './agregar-destinatario-final-contenedora.component.html',
  styleUrl: './agregar-destinatario-final-contenedora.component.scss',
  standalone: true,
  imports: [AgregarDestinatarioFinalComponent]
})
export class AgregarDestinatarioFinalContenedoraComponent {
    /**
   * @event cerrar
   * @description Evento emitido para indicar que se debe cerrar el componente.
   * @remarks
   * Este evento no envía ningún valor, simplemente notifica a los componentes padres que se debe realizar la acción de cierre.
   * 
   * @eventType void
   * @es
   * Evento que se dispara para cerrar el componente actual.
   */
  @Output() cerrar = new EventEmitter<void>();
  /**
   * @readonly
   * @description Obtiene el identificador del procedimiento actual.
   * @remarks
   * Esta propiedad es de solo lectura y almacena el valor constante de `ID_PROCEDIMIENTO`.
   * 
   * @returns El identificador único del procedimiento.
   */
  public readonly idProcedimiento = ID_PROCEDIMIENTO;
    /**
     * Constructor del componente.
     *
     * @method constructor
     * @param {Tramite240111Store} tramiteStore - Store que administra el estado del trámite.
     * @returns {void}
     */
    // eslint-disable-next-line no-empty-function
    constructor(public tramiteStore: Tramite240112Store) {}
  
    /**
     * Actualiza la lista de destinatarios finales en el store del trámite.
     *
     * @method updateDestinatarioFinalTablaDatos
     * @param {DestinoFinal[]} event - Lista de destinatarios finales actualizada.
     * @returns {void}
     */
    updateDestinatarioFinalTablaDatos(event: DestinoFinal[]): void {
      this.tramiteStore.updateDestinatarioFinalTablaDatos(event);
    }
}
