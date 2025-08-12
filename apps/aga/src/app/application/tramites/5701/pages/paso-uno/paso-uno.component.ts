import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { SolicitudComponent } from '../../components/solicitud/solicitud.component';


@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  styles: ``
})
export class PasoUnoComponent {
  indice: number = 1;
  /**
   * Emite un evento cuando el formulario hijo es válido o no.
   * 
   * @type {EventEmitter<boolean>}
   */

  @Output() validFrmPadreEsValido = new EventEmitter<boolean>();

  @ViewChild(SolicitudComponent) SolicitudHijoComponent!: SolicitudComponent;

  /**
   * Selecciona una pestaña específica y actualiza el índice actual.
   *
   * @param {number} i - El índice de la pestaña a seleccionar.
   * @returns {void}
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Maneja el evento que indica si el formulario hijo es válido o no.
   * 
   * @param isValid - Valor booleano que indica si el formulario hijo es válido.
   */
  onFormularioHijoValido(isValid: boolean): void {
    this.validFrmPadreEsValido.emit(isValid);
  }
  /**
   * Método para validar el formulario del componente hijo.
   * 
   * @returns {boolean} - Retorna true si el formulario es válido, false en caso contrario.
   */
  validarFormularioPadre(): boolean {
    return this.SolicitudHijoComponent.validarFormulario();
  }

}
