/**
 * Componente para la modificación de unidades de arrastre en el trámite 40103.
 *
 * Permite agregar, modificar y eliminar unidades de arrastre.
 *
 * @module ModificacionUnidadComponent
 */
import { UnidadTabla } from '../../../../models/registro-muestras-mercancias.model';
import { Component } from '@angular/core';
import { UNIDAD_TABLA_CONFIG } from '../../../../enum/transportista-terrestre.enum';
import { TablaSeleccion } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-modificacion-unidad',
  templateUrl: './modificacion-unidad.component.html',
  styleUrls: ['./modificacion-unidad.component.scss']
})
/**
 * Componente para gestionar la modificación de unidades de arrastre.
 *
 * @class
 */
export class ModificacionUnidadComponent {
  /**
   * Catálogo de tipos de unidad de arrastre.
   * @type {any[]}
   */
  tipoDeUnidadCatalogo: any[] = [];

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
   * Índice de la unidad seleccionada en la tabla.
   * @type {number | null}
   */
  selectedUnidadIndex: number | null = null;

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
   * Indica si la vista es de solo lectura.
   * @type {boolean}
   */
  isReadonly = false;

  /**
   * Maneja la selección de filas en la tabla de unidades de arrastre.
   * @param {any} event - Evento de selección de la tabla.
   * @returns {void}
   */
  onUnidadRowSelected(event: any) {
    this.selectedUnidadIndex = event && event.length > 0 ? this.unidadesArrastre.indexOf(event[0]) : null;
  }

  /**
   * Agrega una unidad actualizada desde el diálogo y la selecciona.
   * @param {UnidadTabla} updatedUnidad - Unidad actualizada.
   * @returns {void}
   */
  onUnidadDialogSave(updatedUnidad: UnidadTabla) {
    this.unidadesArrastre.push(updatedUnidad);
    this.selectedUnidadIndex = this.unidadesArrastre.length - 1;
    this.showUnidadDialog = false;
  }

  /**
   * Elimina la fila de unidad seleccionada.
   * @returns {void}
   */
  deleteUnidadRow() {
    if (this.selectedUnidadIndex !== null) {
      this.unidadesArrastre.splice(this.selectedUnidadIndex, 1);
      this.selectedUnidadIndex = null;
    }
  }
}
