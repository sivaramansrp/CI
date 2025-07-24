import { VehiculoTabla } from '../../../../models/registro-muestras-mercancias.model';
import { Component } from '@angular/core';
import { VEHICULOS_TABLA_CONFIG } from '../../../../enum/transportista-terrestre.enum';
import { TablaSeleccion } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-baja-vehiculo',
  templateUrl: './baja-vehiculo.component.html',
  styleUrls: ['./baja-vehiculo.component.scss']
})
export class BajaVehiculoComponent {
  // Catálogos para los dropdowns del diálogo
  tipoDeVehiculoCatalogo: any[] = [];
  paisEmisorCatalogo: any[] = [];
  anoCatalogo: any[] = [];
  tipoArrastre: any[] = [];
  vehiculosParque: VehiculoTabla[] = [];
  columnasVehiculo = VEHICULOS_TABLA_CONFIG.encabezadas;
  tipoSeleccionTabla = TablaSeleccion.RADIO;
  vehiculosParqueSelected: VehiculoTabla[] = [];
  isReadonly = false;
  showVehiculoDialog = false;
  vehiculoDialogData: VehiculoTabla | {} = {};

  onVehiculoRowSelected(event: VehiculoTabla[]) {
    this.vehiculosParqueSelected = event || [];
  }

  eliminarVehiculo() {
    if (this.vehiculosParqueSelected.length === 0) {
      return;
    }
    this.vehiculosParque = this.vehiculosParque.filter(
      v => !this.vehiculosParqueSelected.includes(v)
    );
    this.vehiculosParqueSelected = [];
  }

  // Modal dialog save handler
  onVehiculoDialogSave(updatedVehiculo: VehiculoTabla) {
    // Add new vehicle to the table (customize as needed)
    this.vehiculosParque.push(updatedVehiculo);
    // Automatically select the last row so Eliminar is enabled
    this.vehiculosParqueSelected = [this.vehiculosParque[this.vehiculosParque.length - 1]];
    this.showVehiculoDialog = false;
  }

  // For template compatibility
  deleteVehiculoRow() {
    this.eliminarVehiculo();
  }
}
