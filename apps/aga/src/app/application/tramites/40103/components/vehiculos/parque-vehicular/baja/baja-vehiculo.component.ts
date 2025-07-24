/**
 * Componente para la baja de vehículos en el trámite 40103.
 *
 * Permite seleccionar, eliminar y gestionar vehículos del parque vehicular.
 *
 * @module BajaVehiculoComponent
 */
import { VehiculoTabla } from '../../../../models/registro-muestras-mercancias.model';
import { Component } from '@angular/core';
import { VEHICULOS_TABLA_CONFIG } from '../../../../enum/transportista-terrestre.enum';
import { TablaSeleccion } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-baja-vehiculo',
  templateUrl: './baja-vehiculo.component.html',
  styleUrls: ['./baja-vehiculo.component.scss']
})
/**
 * Componente para gestionar la baja de vehículos.
 *
 * @class
 */
export class BajaVehiculoComponent {
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
   * Vehículos seleccionados en la tabla.
   * @type {VehiculoTabla[]}
   */
  vehiculosParqueSelected: VehiculoTabla[] = [];

  /**
   * Indica si la vista es de solo lectura.
   * @type {boolean}
   */
  isReadonly = false;

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
   * Maneja la selección de filas en la tabla de vehículos.
   * @param {VehiculoTabla[]} event - Vehículos seleccionados.
   * @returns {void}
   */
  onVehiculoRowSelected(event: VehiculoTabla[]) {
    this.vehiculosParqueSelected = event || [];
  }

  /**
   * Elimina los vehículos seleccionados del parque vehicular.
   * @returns {void}
   */
  eliminarVehiculo() {
    if (this.vehiculosParqueSelected.length === 0) {
      return;
    }
    this.vehiculosParque = this.vehiculosParque.filter(
      v => !this.vehiculosParqueSelected.includes(v)
    );
    this.vehiculosParqueSelected = [];
  }

  /**
   * Agrega un vehículo actualizado desde el diálogo y lo selecciona.
   * @param {VehiculoTabla} updatedVehiculo - Vehículo actualizado.
   * @returns {void}
   */
  onVehiculoDialogSave(updatedVehiculo: VehiculoTabla) {
    this.vehiculosParque.push(updatedVehiculo);
    this.vehiculosParqueSelected = [this.vehiculosParque[this.vehiculosParque.length - 1]];
    this.showVehiculoDialog = false;
  }

  /**
   * Elimina la fila de vehículo seleccionada.
   * @returns {void}
   */
  deleteVehiculoRow() {
    this.eliminarVehiculo();
  }
}
