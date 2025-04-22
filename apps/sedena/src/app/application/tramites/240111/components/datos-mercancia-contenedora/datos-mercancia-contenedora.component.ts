import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosMercanciaComponent } from '../../../../shared/components/datos-mercancia/datos-mercancia.component';
import { ID_PROCEDIMIENTO } from '../../constants/importacion-armas-municiones.enum';
import { MercanciaDetalle } from '../../../../shared/models/datos-del-tramite.model';
import { Tramite240111Store } from '../../estados/tramite240111Store.store';

/**
 * @title Datos de la Mercancía Contenedora
 * @description Componente contenedor encargado de recibir los datos de mercancía y actualizar el estado global del trámite.
 * @summary Actúa como puente entre el componente de datos de mercancía y el store de Akita.
 */

@Component({
  selector: 'app-datos-mercancia-contenedora',
  standalone: true,
  imports: [CommonModule, DatosMercanciaComponent],
  templateUrl: './datos-mercancia-contenedora.component.html',
  styleUrl: './datos-mercancia-contenedora.component.css',
})
export class DatosMercanciaContenedoraComponent {
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
  constructor(private tramiteStore: Tramite240111Store) {}

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
