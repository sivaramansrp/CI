import { UnidadTabla } from '../../../../models/registro-muestras-mercancias.model';
import { Component, Input, OnInit } from '@angular/core';
import { UNIDAD_TABLA_CONFIG } from '../../../../enum/transportista-terrestre.enum';
import { TablaSeleccion } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-baja-unidad',
  templateUrl: './baja-unidad.component.html',
  styleUrls: ['./baja-unidad.component.scss'],
})
export class BajaUnidadComponent implements OnInit {
  showInfoAlert = true;
  ngOnInit(): void {
    // Optionally, check if catalogs are empty and log a warning
    if (
      this.tipoDeUnidadCatalogo.length === 0 ||
      this.paisEmisorCatalogo.length === 0 ||
      this.anoCatalogo.length === 0 ||
      this.tipoArrastre.length === 0
    ) {
      console.warn('Some catalog arrays are empty. Ensure parent loads them before opening the modal.');
    }
  }
  @Input() tipoDeUnidadCatalogo: any[] = [];
  @Input() paisEmisorCatalogo: any[] = [];
  @Input() anoCatalogo: any[] = [];
  @Input() tipoArrastre: any[] = [];

  unidadesArrastre: UnidadTabla[] = [];
  columnasUnidad = UNIDAD_TABLA_CONFIG.encabezadas;
  tipoSeleccionTabla = TablaSeleccion.RADIO;
  selectedUnidadIndex: number | null = null;
  isReadonly = false;
  unidadesArrastreSelected: UnidadTabla[] = [];
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
}
