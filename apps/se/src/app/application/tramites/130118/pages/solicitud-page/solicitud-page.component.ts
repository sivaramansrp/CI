import { AVISO, DatosPasos, ListaPasosWizard, PASOS, WizardComponent } from '@ng-mf/data-access-user';
import { Component, ViewChild } from '@angular/core';
import { ALERTA } from '@libs/shared/data-access-user/src/tramites/constantes/mensajes-error-formularios';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component'

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
})
export class SolicitudPageComponent {
  /**
   * Lista de pasos del asistente.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Índice del paso actual en el asistente.
   */
  indice: number = 1;

  /**
   * Referencia al componente del asistente (wizard).
   * Permite controlar la navegación entre los pasos.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Referencia al componente del primer paso.
   * Permite acceder a los métodos y propiedades del paso uno.
   */
  @ViewChild('pasoUno') pasoUnoComponent!: PasoUnoComponent;

  /**
   * Clase CSS para mostrar una alerta de información.
   */
  public infoAlert = 'alert-info';

  /**
   * Clase CSS para mostrar una alerta de error.
   */
  infoError = 'alert-danger';

  /**
   * Texto del aviso de privacidad simplificado.
   */
  TEXTOS = AVISO.Aviso;

  /**
   * Mensaje de alerta a mostrar en caso de error.
   */
  ALERTA = ALERTA;

  /**
   * Indica si el formulario es válido.
   */
  esValido = true;

  /**
   * Datos de los pasos del asistente, incluyendo textos de botones y el índice actual.
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
   * Obtiene el valor del índice de la acción del botón y controla la navegación del asistente.
   * Valida el formulario del primer paso antes de avanzar.
   * @param e Acción del botón.
   */
  getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 5) {
      if (this.indice === 1) {
        const SOLICITUD_COMPONENT = this.pasoUnoComponent?.solicitudComponent;
        this.esValido = SOLICITUD_COMPONENT?.validarFormulario() ?? false;
      }

      if (!this.esValido) {
        this.datosPasos.indice = 1;
        return;
      }

      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }
}