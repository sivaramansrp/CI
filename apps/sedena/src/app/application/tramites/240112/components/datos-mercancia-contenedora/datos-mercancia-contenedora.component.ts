import { Component, EventEmitter, Output } from '@angular/core';
import { DatosMercanciaComponent } from '../../../../shared/components/datos-mercancia/datos-mercancia.component';
import { ID_PROCEDIMIENTO } from '../../constants/agregar-destinatario.enum';
import { MercanciaDetalle } from '../../../../shared/models/datos-del-tramite.model';
import { Tramite240112Store } from '../../estados/tramite240112Store.store';

/**
 * Componente contenedor para gestionar los datos de mercancía en el trámite 240112.
 *
 * @component
 *
 * @remarks
 * Este componente actúa como contenedor para el componente `DatosMercanciaComponent`,
 * gestionando la interacción con el store `Tramite240112Store` y emitiendo eventos para
 * notificar el cierre del componente tras la actualización de datos.
 *
 * @example
 * ```html
 * <app-datos-mercancia-contenedora (cerrar)="onCerrar()"></app-datos-mercancia-contenedora>
 * ```
 *
 * @event cerrar Evento emitido para indicar que se debe cerrar el componente.
 * @property {string} idProcedimiento Identificador del procedimiento asociado al trámite.
 */
@Component({
  selector: 'app-datos-mercancia-contenedora',
  templateUrl: './datos-mercancia-contenedora.component.html',
  styleUrl: './datos-mercancia-contenedora.component.scss',
  standalone: true,
  imports: [DatosMercanciaComponent],
})
export class DatosMercanciaContenedoraComponent {
  /**
   * Evento emitido para indicar que se debe cerrar el componente.
   *
   * @event cerrar
   * @type {EventEmitter<void>}
   * @remarks
   * Este evento no envía ningún valor, solo notifica al componente padre para realizar la acción de cierre.
   */
  @Output() cerrar = new EventEmitter<void>();
  /**
   * Identificador del procedimiento asociado al trámite.
   *
   * @readonly
   * @type {string}
   */
  public readonly idProcedimiento = ID_PROCEDIMIENTO;

  /**
   * Constructor del componente.
   *
   * @param tramiteStore Store de Akita para administrar y actualizar el estado de la tabla de mercancías.
   */

  constructor(private tramiteStore: Tramite240112Store) {}

  /**
   * Actualiza los datos de la tabla de mercancía en el store y emite el evento para cerrar el componente.
   *
   * @param event Lista de mercancías actualizada proveniente del formulario.
   */
  updateMercanciaDetalle(event: MercanciaDetalle[]): void {
    this.tramiteStore.updateMercanciaTablaDatos(event);
    this.cerrar.emit();
  }
}
