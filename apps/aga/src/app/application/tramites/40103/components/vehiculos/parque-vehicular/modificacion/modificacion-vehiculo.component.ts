/**
 * Componente para la modificación de vehículos en el trámite 40103.
 *
 * Permite agregar, modificar y eliminar vehículos del parque vehicular.
 *
 * @module ModificacionVehiculoComponent
 */
import { VehiculoTabla } from '../../../../models/registro-muestras-mercancias.model';
import { Component } from '@angular/core';
import { VEHICULOS_TABLA_CONFIG } from '../../../../enum/transportista-terrestre.enum';
import { TablaSeleccion } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-modificacion-vehiculo',
  templateUrl: './modificacion-vehiculo.component.html',
  styleUrls: ['./modificacion-vehiculo.component.scss']
})
/**
 * Componente para gestionar la modificación de vehículos.
 *
 * @class
 */
export class ModificacionVehiculoComponent {
  /**
   * Catálogo de tipos de vehículo.
   * @type {any[]}
   */
  tipoDeVehiculoCatalogo: any[] = [];

  /**
   * Catálogo de países emisores.
   * @type {any[]}
   */
  paisEmisorCatalogo: any[] = [];

  /**
   * Catálogo de años.
   * @type {any[]}
   */
  anoCatalogo: any[] = [];

  /**
   * Catálogo de tipos de arrastre.
   * @type {any[]}
   */
  tipoArrastre: any[] = [];

  /**
   * Indica si se muestra la alerta informativa.
   * @type {boolean}
   */
  showInfoAlert = true;

  /**
   * Lista de vehículos en el parque vehicular.
   * @type {VehiculoTabla[]}
   */
  vehiculosParque: VehiculoTabla[] = [];

  /**
   * Configuración de columnas para la tabla de vehículos.
   * @type {*}
   */
  columnasVehiculo = VEHICULOS_TABLA_CONFIG.encabezadas;

  /**
   * Tipo de selección de la tabla (radio, checkbox, etc).
   * @type {TablaSeleccion}
   */
  tipoSeleccionTabla = TablaSeleccion.RADIO;

  /**
   * Índice del vehículo seleccionado en la tabla.
   * @type {number | null}
   */
  selectedVehiculoIndex: number | null = null;

  /**
   * Indica si se muestra el diálogo de vehículo.
   * @type {boolean}
   */
  showVehiculoDialog = false;

  /**
   * Datos para el diálogo de vehículo.
   * @type {VehiculoTabla | {}}
   */
  vehiculoDialogData: VehiculoTabla | {} = {};

  /**
   * Indica si la vista es de solo lectura.
   * @type {boolean}
   */
  isReadonly = false;

  /**
   * Maneja la selección de filas en la tabla de vehículos.
   * @param {any} event - Evento de selección de la tabla.
   * @returns {void}
   */
  onVehiculoRowSelected(event: any) {
    this.selectedVehiculoIndex = event && event.length > 0 ? this.vehiculosParque.indexOf(event[0]) : null;
  }

  /**
   * Agrega un vehículo actualizado desde el diálogo y lo selecciona.
   * @param {VehiculoTabla} updatedVehiculo - Vehículo actualizado.
   * @returns {void}
   */
  onVehiculoDialogSave(updatedVehiculo: VehiculoTabla) {
    this.vehiculosParque.push(updatedVehiculo);
    this.selectedVehiculoIndex = this.vehiculosParque.length - 1;
    this.showVehiculoDialog = false;
  }

  /**
   * Elimina la fila de vehículo seleccionada.
   * @returns {void}
   */
  deleteVehiculoRow() {
    if (this.selectedVehiculoIndex !== null) {
      this.vehiculosParque.splice(this.selectedVehiculoIndex, 1);
      this.selectedVehiculoIndex = null;
    }
  }
}
