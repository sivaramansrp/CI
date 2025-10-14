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
  onBuscarIntento(event: {submitted: boolean, invalid: boolean,numTramite: string}): void {
    this.showBuscarError = event.submitted && event.invalid;
    this.numTramite = event.numTramite;
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
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }
}