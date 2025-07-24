/**
 * Componente para la baja de unidades de arrastre en el trámite 40103.
 *
 * Permite seleccionar, eliminar y gestionar unidades de arrastre.
 *
 * @module BajaUnidadComponent
 */
import { UnidadTabla } from '../../../../models/registro-muestras-mercancias.model';
import { Component } from '@angular/core';
import { UNIDAD_TABLA_CONFIG } from '../../../../enum/transportista-terrestre.enum';
import { TablaSeleccion } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-baja-unidad',
  templateUrl: './baja-unidad.component.html',
  styleUrls: ['./baja-unidad.component.scss']
})
/**
 * Componente para gestionar la baja de unidades de arrastre.
 *
 * @class
 */
export class BajaUnidadComponent {
  /**
   * Catálogo de tipos de unidad de arrastre.
   * @type {UnidadTabla[]}
   */
  tipoDeUnidadCatalogo: UnidadTabla[] = [];

  /**
   * Catálogo de países emisores.
   * @type {UnidadTabla[]}
   */
  paisEmisorCatalogo: UnidadTabla[] = [];

  /**
   * Catálogo de años.
   * @type {UnidadTabla[]}
   */
  anoCatalogo: UnidadTabla[] = [];

  /**
   * Catálogo de tipos de arrastre.
   * @type {UnidadTabla[]}
   */
  tipoArrastre: UnidadTabla[] = [];

  /**
   * Lista de unidades de arrastre.
   * @type {UnidadTabla[]}
   */
  unidadesArrastre: UnidadTabla[] = [];

  /**
   * Configuración de columnas para la tabla de unidades.
   * @type {*}
   */
  columnasUnidad = UNIDAD_TABLA_CONFIG.encabezadas;

  /**
   * Tipo de selección de la tabla (radio, checkbox, etc).
   * @type {TablaSeleccion}
   */
  tipoSeleccionTabla = TablaSeleccion.RADIO;

  /**
   * Unidades de arrastre seleccionadas en la tabla.
   * @type {UnidadTabla[]}
   */
  unidadesArrastreSelected: UnidadTabla[] = [];

  /**
   * Indica si la vista es de solo lectura.
   * @type {boolean}
   */
  isReadonly = false;

  /**
   * Indica si se muestra el diálogo de unidad.
   * @type {boolean}
   */
  showUnidadDialog = false;

  /**
   * Datos para el diálogo de unidad.
   * @type {UnidadTabla | {}}
   */
  unidadDialogData: UnidadTabla | {} = {};

  /**
   * Maneja la selección de filas en la tabla de unidades de arrastre.
   * @param {UnidadTabla[]} event - Unidades seleccionadas.
   * @returns {void}
   */
  onUnidadRowSelected(event: UnidadTabla[]) {
    this.unidadesArrastreSelected = event || [];
  }

  /**
   * Elimina las unidades seleccionadas del listado.
   * @returns {void}
   */
  eliminarUnidad() {
    if (this.unidadesArrastreSelected.length === 0) {
      return;
    }
    this.unidadesArrastre = this.unidadesArrastre.filter(
      u => !this.unidadesArrastreSelected.includes(u)
    );
    this.unidadesArrastreSelected = [];
  }

  /**
   * Agrega una unidad actualizada desde el diálogo y la selecciona.
   * @param {UnidadTabla} updatedUnidad - Unidad actualizada.
   * @returns {void}
   */
  onUnidadDialogSave(updatedUnidad: UnidadTabla) {
    this.unidadesArrastre.push(updatedUnidad);
    this.unidadesArrastreSelected = [this.unidadesArrastre[this.unidadesArrastre.length - 1]];
    this.showUnidadDialog = false;
  }

  /**
   * Elimina la fila de unidad seleccionada.
   * @returns {void}
   */
  deleteUnidadRow() {
    this.eliminarUnidad();
  }
}
