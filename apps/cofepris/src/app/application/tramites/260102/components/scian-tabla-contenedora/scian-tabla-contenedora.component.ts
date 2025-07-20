import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ScianTablaComponent } from '../../../../shared/components/scian-tabla/scian-tabla.component';
import { TablaScianConfig } from '../../../../shared/models/datos-solicitud.model';
import { Tramite260102Store } from '../../estados/stores/tramite260102Store.store';

/**
 * @class ScianTablaContenedoraComponent
 * @description
 * Componente contenedor encargado de gestionar la interacción con el componente `ScianTablaComponent`,
 * que muestra información relacionada con el SCIAN (Sistema de Clasificación Industrial de América del Norte).
 * Su función principal es recibir la configuración seleccionada de la tabla y almacenarla en el estado
 * centralizado (`Tramite260102Store`).
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
   * @constructor
   * @param {Tramite260102Store} tramite260102Store - Servicio que actúa como store del estado
   * del trámite 260102, permitiendo almacenar y actualizar la configuración SCIAN seleccionada.
   */
  constructor(private tramite260102Store: Tramite260102Store) {}

  /**
   * @property scianSeleccionado
   * @description
   * Almacena la configuración seleccionada actualmente en la tabla SCIAN.
   * Este valor puede ser utilizado para visualizar, validar o reenviar la selección.
   *
   * @type {TablaScianConfig}
   */
  public scianSeleccionado!: TablaScianConfig;

  /**
   * @method obtenerSeleccionado
   * @description
   * Método invocado cuando se selecciona una fila en la tabla SCIAN. Actualiza el estado
   * global del trámite con la nueva configuración seleccionada.
   *
   * @param {TablaScianConfig} event - Objeto que contiene los datos de la fila seleccionada
   * en la tabla SCIAN.
   * 
   * @returns {void}
   *
   * @example
   * const seleccion = { codigo: '5416', descripcion: 'Consultoría administrativa', ... };
   * this.obtenerSeleccionado(seleccion);
   */
  obtenerSeleccionado(event: TablaScianConfig): void {
    this.tramite260102Store.update((state) => ({
      ...state,
      scianConfigDatos: [event]
    }))
  }
}
