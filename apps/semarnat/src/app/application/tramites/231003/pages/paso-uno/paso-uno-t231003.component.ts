import { Component, ViewChild } from '@angular/core';
import { DatosSolicitudComponent } from '../../components/datos-solicitud/datos-solicitud.component';
/**
 * Decorador que define un componente de Angular.
 * - selector: Nombre que se utilizará en el HTML para referenciar este componente.
 * - templateUrl: Ruta del archivo HTML asociado al componente.
 */
@Component({
  selector: 'app-paso-uno-t231003',
  templateUrl: './paso-uno-t231003.component.html',
})
export class PasoUnoT231003Component {
  /**
   * Índice de la pestaña seleccionada.
   * @type {number}
   */
  indice: number = 2;


  @ViewChild('solicitud', { static: false })
  datosSolicitudComponent: DatosSolicitudComponent | undefined;

  /**
   * Selecciona una pestaña específica.
   *
   * @param {number} i - El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Valida todos los formularios en el componente.
   * @returns si todos los formularios son válidos
   */
  validarTodosLosFormularios(): boolean {
    if (this.indice >= 2 && this.datosSolicitudComponent) {
      this.datosSolicitudComponent.marcarCamposcomoTocados();
      return this.datosSolicitudComponent.validaTodoLosFormularios();
    }
    this.indice = 2;
    return false;
  }
}
