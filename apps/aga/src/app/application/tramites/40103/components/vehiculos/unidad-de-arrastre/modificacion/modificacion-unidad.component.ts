import { UnidadTabla } from '../../../../models/registro-muestras-mercancias.model';
import { Component, Input } from '@angular/core';
import { UNIDAD_TABLA_CONFIG } from '../../../../enum/transportista-terrestre.enum';
import { TablaSeleccion } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-modificacion-unidad',
  templateUrl: './modificacion-unidad.component.html',
  styleUrls: ['./modificacion-unidad.component.scss'],
})
export class ModificacionUnidadComponent {
  @Input() tipoDeUnidadCatalogo: any[] = [];
  @Input() paisEmisorCatalogo: any[] = [];
  @Input() anoCatalogo: any[] = [];
  @Input() tipoArrastre: any[] = [];

  showInfoAlert = true;
  tipoSeleccionTabla = TablaSeleccion.RADIO;
  unidadesArrastre: UnidadTabla[] = [];
  columnasUnidad = UNIDAD_TABLA_CONFIG.encabezadas;
  selectedUnidadIndex: number | null = null;
  isReadonly = false;
  unidadesArrastreSelected: UnidadTabla[] = [];
  showUnidadDialog = false;
  unidadDialogData: UnidadTabla | {} = {};

  onUnidadRowClick(event: any) {
    this.selectedUnidadIndex = event && event.length > 0 ? event[0].index : null;
  }

  onUnidadRowSelected(event: UnidadTabla[]) {
    this.unidadesArrastreSelected = event || [];
  }

  eliminarUnidad() {
    if (this.unidadesArrastreSelected.length === 0) {
      return;
    }
    this.unidadesArrastre = this.unidadesArrastre.filter(
      unidad => !this.unidadesArrastreSelected.includes(unidad)
    );
    this.unidadesArrastreSelected = [];
  }

  // For template compatibility
  deleteUnidadRow() {
    this.eliminarUnidad();
  }

  // Modal dialog save handler
  onUnidadDialogSave(updatedUnidad: UnidadTabla) {
    // Add new unidad to the table (customize as needed)
    this.unidadesArrastre.push(updatedUnidad);
    this.showUnidadDialog = false;
  }

  // Dialog cancel handler
  onUnidadDialogCancel() {
    this.showUnidadDialog = false;
  }

  limpiarTabla() {
    this.unidadesArrastre = [];
    this.selectedUnidadIndex = null;
  }

  guardarTabla() {
    // Implementar lógica de guardado aquí
    // Por ejemplo, enviar this.unidadesArrastre al backend
  }
}
