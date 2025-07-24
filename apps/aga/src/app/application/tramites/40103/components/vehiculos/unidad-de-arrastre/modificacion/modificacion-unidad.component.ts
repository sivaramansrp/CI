
import { UnidadTabla } from '../../../../models/registro-muestras-mercancias.model';
import { Component } from '@angular/core';
import { UNIDAD_TABLA_CONFIG } from '../../../../enum/transportista-terrestre.enum';
import { TablaSeleccion } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-modificacion-unidad',
  templateUrl: './modificacion-unidad.component.html',
  styleUrls: ['./modificacion-unidad.component.scss']
})
export class ModificacionUnidadComponent {
  // Catálogos para los dropdowns del diálogo
  tipoDeUnidadCatalogo: any[] = [];
  paisEmisorCatalogo: any[] = [];
  anoCatalogo: any[] = [];
  tipoArrastre: any[] = [];
  showInfoAlert = true;
  unidadesArrastre: UnidadTabla[] = [];
  columnasUnidad = UNIDAD_TABLA_CONFIG.encabezadas;
  tipoSeleccionTabla = TablaSeleccion.RADIO;
  selectedUnidadIndex: number | null = null;
  showUnidadDialog = false;
  unidadDialogData: UnidadTabla | {} = {};
  isReadonly = false;

  onUnidadRowSelected(event: any) {
    this.selectedUnidadIndex = event && event.length > 0 ? this.unidadesArrastre.indexOf(event[0]) : null;
  }

  // Modal dialog save handler
  onUnidadDialogSave(updatedUnidad: UnidadTabla) {
    // Add new unidad to the table (customize as needed)
    this.unidadesArrastre.push(updatedUnidad);
    // Automatically select the last row so Eliminar is enabled
    this.selectedUnidadIndex = this.unidadesArrastre.length - 1;
    this.showUnidadDialog = false;
  }

  deleteUnidadRow() {
    if (this.selectedUnidadIndex !== null) {
      this.unidadesArrastre.splice(this.selectedUnidadIndex, 1);
      this.selectedUnidadIndex = null;
    }
  }
}
