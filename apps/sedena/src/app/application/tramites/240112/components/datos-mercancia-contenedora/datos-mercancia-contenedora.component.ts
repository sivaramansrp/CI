import { Component, EventEmitter, Output } from '@angular/core';
import { DatosMercanciaComponent } from '../../../../shared/components/datos-mercancia/datos-mercancia.component';
import { ID_PROCEDIMIENTO } from '../../constants/agregar-destinatario.enum';
import { MercanciaDetalle } from '../../../../shared/models/datos-del-tramite.model';
import { Tramite240112Store } from '../../estados/tramite240112Store.store';

@Component({
  selector: 'app-datos-mercancia-contenedora',
  templateUrl: './datos-mercancia-contenedora.component.html',
  styleUrl: './datos-mercancia-contenedora.component.scss',
  standalone: true,
  imports: [ DatosMercanciaComponent]
})
export class DatosMercanciaContenedoraComponent {
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
     * @property {string} idProcedimiento
     * @description Identificador del procedimiento asociado al trámite.
     */
    public readonly idProcedimiento = ID_PROCEDIMIENTO;
    /**
     * Constructor del componente.
     *
     * @method constructor
     * @param {Tramite240111Store} tramiteStore - Store de Akita para actualizar el estado de la tabla de mercancías.
     * @returns {void}
     */
    // eslint-disable-next-line no-empty-function
    constructor(private tramiteStore: Tramite240112Store) {}
  
    /**
     * Actualiza los datos de la tabla de mercancía en el store.
     *
     * @method updateMercanciaDetalle
     * @param {MercanciaDetalle[]} event - Lista de mercancías actualizada desde el formulario.
     * @returns {void}
     */
    updateMercanciaDetalle(event: MercanciaDetalle[]): void {
      this.tramiteStore.updateMercanciaTablaDatos(event);
    }
}
