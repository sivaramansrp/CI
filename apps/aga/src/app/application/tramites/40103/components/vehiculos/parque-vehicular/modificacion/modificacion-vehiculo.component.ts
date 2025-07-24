import { VehiculoTabla } from '../../../../models/registro-muestras-mercancias.model';
import { Component } from '@angular/core';
import { VEHICULOS_TABLA_CONFIG } from '../../../../enum/transportista-terrestre.enum';
import { TablaSeleccion } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-modificacion-vehiculo',
  templateUrl: './modificacion-vehiculo.component.html',
  styleUrls: ['./modificacion-vehiculo.component.scss']
})
export class ModificacionVehiculoComponent {
  // Catálogos para los dropdowns del diálogo
  tipoDeVehiculoCatalogo: any[] = [];
  paisEmisorCatalogo: any[] = [];
  anoCatalogo: any[] = [];
  tipoArrastre: any[] = [];
  showInfoAlert = true;
  vehiculosParque: VehiculoTabla[] = [];
  columnasVehiculo = VEHICULOS_TABLA_CONFIG.encabezadas;
  tipoSeleccionTabla = TablaSeleccion.RADIO;
  selectedVehiculoIndex: number | null = null;
  showVehiculoDialog = false;
  vehiculoDialogData: VehiculoTabla | {} = {};
  isReadonly = false;

  onVehiculoRowSelected(event: any) {
    this.selectedVehiculoIndex = event && event.length > 0 ? this.vehiculosParque.indexOf(event[0]) : null;
  }


  // Modal dialog save handler
  onVehiculoDialogSave(updatedVehiculo: VehiculoTabla) {
    // Add new vehicle to the table (customize as needed)
    this.vehiculosParque.push(updatedVehiculo);
    // Automatically select the last row so Eliminar is enabled
    this.selectedVehiculoIndex = this.vehiculosParque.length - 1;
    this.showVehiculoDialog = false;
  }

  deleteVehiculoRow() {
    if (this.selectedVehiculoIndex !== null) {
      this.vehiculosParque.splice(this.selectedVehiculoIndex, 1);
      this.selectedVehiculoIndex = null;
    }
  }
}
