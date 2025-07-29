import {AccionBoton, AlertComponent,BtnContinuarComponent, DatosPasos, ListaPasosWizard, WizardComponent } from '@ng-mf/data-access-user';
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ERROR_FORMA_ALERT } from '../../../220201/constantes/certificado-zoosanitario.enum';
import { PASOS } from '../../constantes/importador-exportador.enum';
import { PasoDosComponent } from '../PasoDos/PasoDos.component';
import { PasoTresComponent } from '../PasoTres/PasoTres.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';

@Component({
  selector: 'app-sanidad-acuicola-certificado',
  standalone: true,
  imports: [
    CommonModule,
    WizardComponent,
    BtnContinuarComponent,
    PasoTresComponent,
    PasoDosComponent,
    PasoUnoComponent,
    AlertComponent
],
  templateUrl: './sanidadAcuicolaCertificado.component.html',
})
export class SanidadAcuicolaCertificadoComponent {

    /**
   * Referencia al componente hijo `PasoUnoComponent` para acceder a sus métodos de validación de formularios.
   * const isValid = this.pasoUnoComponent.validateForms();
   * const formsValidity = this.pasoUnoComponent.getAllFormsValidity();
   */
    @ViewChild('pasoUnoRef') pasoUnoComponent!: PasoUnoComponent;
  /** Lista de pasos para el wizard */
  pasos: ListaPasosWizard[] = PASOS;

  /** Índice actual del paso que se está visualizando */
  indice: number = 1;

    /**
     * @description Indicates whether the form is valid.
     * @type {boolean}
     * @memberof SanidadAcuicolaCertificadoComponent
     * @see https://compodoc.app/
     */
    esFormaValido: boolean = false;
    /**
   * Contiene el mensaje de error que se muestra cuando la validación de formularios falla.
   */
    public formErrorAlert = ERROR_FORMA_ALERT;

  /**
   * Objeto `datosPasos` que almacena información sobre los pasos del proceso.
   * Contiene datos como el número total de pasos, el índice actual y los textos de los botones de navegación.
   */
  datosPasos: DatosPasos = {
    /**
     * Número total de pasos en el proceso.
     * Se obtiene dinámicamente a partir de la longitud del arreglo `pasos`.
     */
    nroPasos: this.pasos.length,

    /**
     * Índice del paso actual dentro del proceso.
     */
    indice: this.indice,

    /**
     * Texto que se muestra en el botón para retroceder al paso anterior.
     */
    txtBtnAnt: 'Anterior',

    /**
     * Texto que se muestra en el botón para avanzar al siguiente paso.
     */
    txtBtnSig: 'Continuar',
  };

  /** Referencia al componente Wizard, utilizado para la navegación entre pasos */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;


  /**
   * Maneja la acción del botón y navega entre los pasos.
   * @method getValorIndice
   * @param {AccionBoton} e - Objeto con la acción (cont/atras) y el valor (índice) del botón.
   */
  getValorIndice(e: AccionBoton): void {
    this.esFormaValido = false;

    // Validar formularios antes de continuar desde el paso uno
    if (this.indice === 1 && e.accion === 'cont') {
      const ISVALID = this.validarTodosFormulariosPasoUno();
      if (!ISVALID) {
        this.esFormaValido = true;
        return; // Detener ejecución si los formularios son inválidos
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
 * Valida todos los formularios del primer paso antes de permitir continuar al siguiente paso.
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
