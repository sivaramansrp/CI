/**
 * @fileoverview Componente para la gestión de la página de asignación directa.
 * Este componente maneja la lógica y la presentación de la página de asignación directa,
 * incluyendo la inicialización y la gestión de los pasos del wizard.
 * @module AsignciondirectaPageComponent
 */
import { ASIGNACION, TEXTOS_BUSCAR } from '../../constants/asignacion.enum';
import { AVISO_CONTRNIDO, DatosPasos, WizardComponent } from '@ng-mf/data-access-user';
import { Component, ViewChild } from '@angular/core';
import { ListaPasosWizard } from '@ng-mf/data-access-user';

interface AccionBoton {
  /**
   * La acción a realizar.
   */
  accion: string;
  /**
   * El valor asociado con la acción.
   */
  valor: number;
}

@Component({
  selector: 'app-asignciondirecta-page',
  templateUrl: './asignciondirecta-page.component.html',
  styleUrls: ['./asignciondirecta-page.component.scss'],
})
export class AsignciondirectaPageComponent {
  /**
   * Lista de pasos del wizard.
   */
  pasos: ListaPasosWizard[] = ASIGNACION;
  
  /**
   * Índice del paso actual.
   */
  indice: number = 1;

  /**
   * Los datos para los pasos del wizard.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Referencia al componente Wizard.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Propiedad para mostrar/ocultar el mensaje de error de búsqueda
   */
  public showBuscarError = false;

  /**
   * Propiedad para mostrar/ocultar el mensaje de error de validación del formulario
   */
  public showValidationError = false;

  /**
   * Propiedad para almacenar los errores de validación
   */
  public validationErrors: string[] = [];

  /**
   * Número de trámite actual.  
   * Identifica y almacena el valor asociado al formulario.  
   */
  numTramite: string = '';
     /**
   * Contiene los textos que se muestran al usuario cuando ocurre una cancelación.
   * Los textos provienen del archivo de constantes TEXTOS_CANCELACIONS.
   */
   TEXTOS = TEXTOS_BUSCAR;
     /**
   * Clase CSS para la alerta de información.
   */
  infoAlert = 'alert-danger';
 /**
 * Contiene el texto del aviso de privacidad simplificado.
 * 
 * @constant {string} avisoContrnido
 * Se inicializa con la propiedad `aviso` del objeto `AVISO_CONTRNIDO`.
 * 
 * Uso:
 * - Mostrar el aviso de privacidad en la interfaz de usuario.
 * - Reutilizar el contenido del aviso en distintos componentes.
 */
avisoContrnido = AVISO_CONTRNIDO.aviso;

  /**
   * Método para manejar el evento de intento de búsqueda desde componentes hijos.
   * Establece la propiedad `showBuscarError` según el estado de enviado e inválido del formulario.
   *
   * @param {Object} event - El objeto de evento que contiene las propiedades `submitted` e `invalid`.
   */
  onBuscarIntento(event: {submitted: boolean, invalid: boolean, numTramite: string}): void {
    this.showBuscarError = event.submitted && event.invalid;
    this.numTramite = event.numTramite;
  }

  /**
   * Método para manejar la validación del formulario desde componentes hijos
   * @param event - Objeto que contiene el estado de validación del formulario
   */
  onFormValidation(event: {isValid: boolean, errors: string[]}): void {
    this.showValidationError = !event.isValid;
    this.validationErrors = event.errors || [];
  }

  /**
   * Genera el contenido HTML para mostrar mensajes de error de validación
   */
  get validationAlertContent(): string {
    if (this.validationErrors.length === 0) return '';
    
    const ERRORLIST = this.validationErrors
      .map((error, index) => `<span style="color: #d1776b">${index + 1}. ${error}</span>`)
      .join('<br>');
    
    return `
      <div style="text-align: center;">
        <strong style="color: #585051ff">Corrija los siguientes errores:</strong><br>
      </div>
      <div style="text-align: left; margin-top: 5px;">
        ${ERRORLIST}
      </div>
    `;
  }

  /**
 * Genera el contenido HTML para mostrar un mensaje de error
 * que incluye el número de trámite con estilo personalizado.
 * Se usa para alertar sobre valores inválidos en el formulario.
 */
get alertContent(): string {
  return `
    <div style="text-align: center;">
      <strong style="color: #585051ff"> Corrija los siguientes errores:</strong><br>
    </div>
    <div style="text-align: left; margin-top: 5px;">
      <span style="color: #d1776b">
        1.<span style="padding-left: 320px;">El valor (<strong>${this.numTramite}</strong>) debe ser un número válido.</span>
      </span>
    </div>
  `;
}

  /**
   * Maneja la acción del botón de navegación en el wizard.
   * @param e - Objeto que contiene la acción y el valor asociado.
   */
  public getValorIndice(e: AccionBoton): void {
    this.showBuscarError = false;
    this.showValidationError = false;

    // Validate current step before proceeding
    if (e.accion === 'cont') {
      if (!this.validateCurrentStep()) {
        return; // Stop navigation if validation fails
      }
    }

    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }

  /**
   * Valida el paso actual del wizard
   * @returns {boolean} - true si el paso es válido, false en caso contrario
   */
  private validateCurrentStep(): boolean {
    this.validationErrors = [];
    let isValid = true;

    switch (this.indice) {
      case 1:
        isValid = this.validateStep1();
        break;
      case 2:
        isValid = this.validateStep2();
        break;
      case 3:
        isValid = this.validateStep3();
        break;
      default:
        isValid = true;
    }

    this.showValidationError = !isValid;
    return isValid;
  }

  /**
   * Valida el paso 1 (Solicitante/Entidad)
   * @returns {boolean} - true si es válido, false en caso contrario
   */
  private validateStep1(): boolean {
    let isValid = true;
    
    // Add validation logic for step 1
    if (!this.numTramite || this.numTramite.trim() === '') {
      this.validationErrors.push('El número de trámite es requerido.');
      isValid = false;
    }
    
    // Add more validation rules as needed for step 1
    // Example: Check if entity is selected, required fields are filled, etc.
    
    return isValid;
  }

  /**
   * Valida el paso 2
   * @returns {boolean} - true si es válido, false en caso contrario
   */
  private validateStep2(): boolean {
    let isValid = true;
    
    // Add validation logic for step 2
    // Example: Check required fields, selections, etc.
    
    return isValid;
  }

  /**
   * Valida el paso 3
   * @returns {boolean} - true si es válido, false en caso contrario
   */
  private validateStep3(): boolean {
    let isValid = true;
    
    // Add validation logic for step 3
    // Example: Check required fields, confirmations, etc.
    
    return isValid;
  }
}