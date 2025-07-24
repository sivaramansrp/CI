import { UnidadTabla } from '../../../../models/registro-muestras-mercancias.model';
import { Component } from '@angular/core';
import { UNIDAD_TABLA_CONFIG } from '../../../../enum/transportista-terrestre.enum';
import { TablaSeleccion } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-baja-unidad',
  templateUrl: './baja-unidad.component.html',
  styleUrls: ['./baja-unidad.component.scss']
})
export class BajaUnidadComponent {
  // Catálogos para los dropdowns del diálogo
    tipoDeUnidadCatalogo: UnidadTabla[] = [];
    paisEmisorCatalogo: UnidadTabla[] = [];
    anoCatalogo: UnidadTabla[] = [];
    tipoArrastre: UnidadTabla[] = [];
    unidadesArrastre: UnidadTabla[] = [];
    columnasUnidad = UNIDAD_TABLA_CONFIG.encabezadas;
    tipoSeleccionTabla = TablaSeleccion.RADIO;
    unidadesArrastreSelected: UnidadTabla[] = [];
    isReadonly = false;
    showUnidadDialog = false;
    unidadDialogData: UnidadTabla | {} = {};

  onUnidadRowSelected(event: UnidadTabla[]) {
    this.unidadesArrastreSelected = event || [];
  }

  eliminarUnidad() {
    if (this.unidadesArrastreSelected.length === 0) {
      return;
    }
    this.unidadesArrastre = this.unidadesArrastre.filter(
      u => !this.unidadesArrastreSelected.includes(u)
    );
    this.unidadesArrastreSelected = [];
  }

  // Modal dialog save handler
  onUnidadDialogSave(updatedUnidad: UnidadTabla) {
    // Add new unidad to the table (customize as needed)
    this.unidadesArrastre.push(updatedUnidad);
    // Automatically select the last row so Eliminar is enabled
    this.unidadesArrastreSelected = [this.unidadesArrastre[this.unidadesArrastre.length - 1]];
    this.showUnidadDialog = false;
  }

  // For template compatibility
  deleteUnidadRow() {
    this.eliminarUnidad();
  }
}
