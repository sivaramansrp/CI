import { AlertComponent, BtnContinuarComponent, DatosPasos, ListaPasosWizard, WizardComponent } from '@ng-mf/data-access-user';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ERROR_FORMA_ALERT } from '../../../110204/constantes/modificacion.enum';
import { PASOS } from '../../enums/constantes-alertas.enum';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
// Ensure PasoDosComponent and PasoUnoComponent are standalone components or declared in an NgModule

/**
 * TEXTO DE ALERTA PARA TERCEROS.
 */
const TERCEROS_TEXTO_DE_ALERTA =
  'La solicitud ha quedado registrada con el número temporal 202757598. Éste no tiene validez legal y sirve solamente para efectos de identificar tu solicitud. Un folio oficial le será asignado a la solicitud al momento en que ésta sea firmada.';

/**
 * Interfaz que define la estructura de una acción de botón.
 */
interface AccionBoton {
  /**
   * La acción que se realizará.
   */
  accion: string;

  /**
   * El valor asociado a la acción.
   */
  valor: number;
}

/**
 * Componente que representa la página de solicitud.
 */
@Component({
  templateUrl: './solicitud-page.component.html',
  styles: ``,
  standalone:true,
  imports: [
    WizardComponent,
    CommonModule,
    BtnContinuarComponent,
    FormsModule,
    PasoDosComponent,
    PasoUnoComponent, 
    ReactiveFormsModule,
    AlertComponent,
  ]
})
export class SolicitudPageComponent {
      /**
   * Referencia al componente hijo `PasoUnoComponent` para acceder a sus métodos de validación de formularios.
   * const isValid = this.pasoUnoComponent.validateForms();
   * const formsValidity = this.pasoUnoComponent.getAllFormsValidity();
   */
    @ViewChild('pasoUnoRef') pasoUnoComponent!: PasoUnoComponent;
    esFormaValido: boolean = false;
  /**
   * Texto de alerta para terceros.
   */
  TEXTO_DE_ALERTA: string = TERCEROS_TEXTO_DE_ALERTA;
      /**
   * Contiene el mensaje de error que se muestra cuando la validación de formularios falla.
   */
    public formErrorAlert = ERROR_FORMA_ALERT;

  /**
   * Lista de pasos del asistente.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Índice del paso actual.
   */
  indice: number = 1;

  /**
   * Referencia al componente del asistente.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Datos de los pasos del asistente.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Selecciona una pestaña del asistente.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Obtiene el valor del índice de la acción del botón.
   * @param e Acción del botón.
   */
getValorIndice(e: AccionBoton): void {
  this.esFormaValido = false;

  // Validar formularios antes de continuar desde el paso uno
  if (this.indice === 1 && e.accion === 'cont') {
    const IS_VALID = this.validarTodosFormulariosPasoUno();
    if (!IS_VALID) {
      this.esFormaValido = true;
      return; // Si no es válido, no avanza de página
    }
  }

  // Calcular el nuevo índice basado en la acción
  let indiceActualizado = e.valor;
  if (e.accion === 'cont') {
    indiceActualizado = e.valor + 1;
  } else if (e.accion === 'ant') {
    indiceActualizado = e.valor - 1;
  }

  // Validar que el nuevo índice esté dentro de los límites permitidos
  if (indiceActualizado > 0 && indiceActualizado <= this.pasos.length) {
    // Actualizar el índice y datosPasos
    this.indice = indiceActualizado;
    this.datosPasos.indice = indiceActualizado;

    if (e.accion === 'cont') {
      this.wizardComponent.siguiente();
    } else if (e.accion === 'ant') {
      this.wizardComponent.atras();
    }
  }
}
/**
 * @descripcion
 * Valida todos los formularios contenidos en el componente `pasoUnoComponent`.
 * 
 * - Si el componente no está inicializado (`pasoUnoComponent` es `null` o `undefined`), 
 *   se asume que no hay formularios por validar y retorna `true`.
 * - Si existe, ejecuta la función `validarFormularios()` del componente 
 *   y retorna `false` en caso de que alguno no sea válido.
 *
 * @returns {boolean}  
 * Retorna `true` si todos los formularios son válidos o si el componente no existe,  
 * de lo contrario retorna `false`.
 *
 * @ejemplo
 * ```ts
 * const esValido = this.validarTodosFormulariosPasoUno();
 * if (!esValido) {
 *   console.warn('El paso uno tiene formularios inválidos');
 * }
 * ```
 */
   private validarTodosFormulariosPasoUno(): boolean {
    if (!this.pasoUnoComponent) {
      return true;
    }
    const ISFORM_VALID_TOUCHED = this.pasoUnoComponent.validarFormularios();
    if (!ISFORM_VALID_TOUCHED) {
      return false;
    }
    return true;
  }
}
