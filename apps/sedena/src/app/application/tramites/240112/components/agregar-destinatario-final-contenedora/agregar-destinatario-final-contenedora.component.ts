import { Component } from '@angular/core';
import { DestinoFinal } from '../../../../shared/models/terceros-relacionados.model';
import { ID_PROCEDIMIENTO } from '../../constants/agregar-destinatario.enum';
import { Tramite240112Store } from '../../estados/tramite240112Store.store';

@Component({
  selector: 'app-agregar-destinatario-final-contenedora',
  templateUrl: './agregar-destinatario-final-contenedora.component.html',
  styleUrl: './agregar-destinatario-final-contenedora.component.scss',
})
export class AgregarDestinatarioFinalContenedoraComponent {
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
