import { AVISO, DatosPasos, ListaPasosWizard, PASOS, WizardComponent } from '@ng-mf/data-access-user';
import { Component, ViewChild } from '@angular/core';
import { ALERTA } from '@libs/shared/data-access-user/src/tramites/constantes/mensajes-error-formularios';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';

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
   * Índice del paso actual.
   */
  indice: number = 1;

  /**
   * Referencia al componente del asistente.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Referencia al componente de solicitud.

   */
  @ViewChild('pasoUno') pasoUnoComponent!: PasoUnoComponent;

  /**
   * 
   * Una cadena que representa la clase CSS para una alerta de información.
   * Esta clase se utiliza para aplicar estilo a los mensajes de información en el componente.
   */
  public infoAlert = 'alert-info';

  /**
   * Una cadena que representa la clase CSS para una alerta de error.
   */
  infoError = 'alert-danger';

  /**
   * Asigna el aviso de privacidad simplificado al atributo `TEXTOS`.
   */
  TEXTOS = AVISO.Aviso;

  /**
   * Asigna el mensaje de error a mostrar al atributo `ALERTA`.
   */
  ALERTA = ALERTA;

  /**
   * Mensaje de error a mostrar.
   */
  esValido = true;

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
