import { AccionBoton, DatosPasos, ListaPasosWizard, WizardComponent } from '@libs/shared/data-access-user/src';
import { Component, ViewChild } from '@angular/core';
import { ALERTA_COM } from '@libs/shared/data-access-user/src/tramites/constantes/110208/certificado.enum';
import { PASOS } from "@libs/shared/data-access-user/src/core/enums/110208/modificacion.enum";

/**
 * Componente para la página de solicitud.
 * Este componente gestiona el flujo de un asistente (wizard) para completar los pasos de un trámite.
 */
@Component({
  selector: 'app-solicitud-page',
  templateUrl: './solicitud-page.component.html',
})
export class SolicitudPageComponent {
  /**
   * Índice actual del paso en el asistente.
   * @type {number}
   */
  indice: number = 1;

  /**
   * Constante de alerta utilizada en el componente.
   * @type {typeof ALERTA_COM}
   */
  alerta = ALERTA_COM;

  /**
   * Referencia al componente del asistente (wizard).
   * Se utiliza para interactuar con el wizard y controlar su flujo (pasar al siguiente paso, ir al anterior, etc.).
   * @type {WizardComponent}
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Lista de pasos del asistente.
   * Contiene un arreglo con los pasos definidos en `PASOS` que será utilizado en el wizard.
   * @type {ListaPasosWizard[]}
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Datos de los pasos del asistente.
   * Incluye el número total de pasos, el índice del paso actual y los textos de los botones de navegación (Anterior, Continuar).
   * @type {DatosPasos}
   */
  datosPasos: DatosPasos = {
    /**
     * Número total de pasos en el asistente.
     */
    nroPasos: this.pasos.length,
    /**
     * Índice del paso actual.
     */
    indice: this.indice,
    /**
     * Texto del botón "Anterior".
     */
    txtBtnAnt: 'Anterior',
    /**
     * Texto del botón "Continuar".
     */
    txtBtnSig: 'Continuar',
  };

  /**
   * Obtiene el valor del índice de la acción del botón.
   * Este método controla el cambio de paso en el wizard dependiendo de la acción del botón presionado.
   * 
   * Si la acción es 'cont', pasa al siguiente paso. Si la acción es 'atras', regresa al paso anterior.
   * 
   * @param {AccionBoton} e Acción del botón (cont o atras) y el valor asociado a la acción.
   * @returns {void}
   */
  getValorIndice(e: AccionBoton): void {
    // Verifica si el valor de la acción está en el rango adecuado
    if (e.valor > 0 && e.valor < 5) {
      // Actualiza el índice del paso basado en el valor de la acción
      this.indice = e.valor;

      // Dependiendo de la acción, avanza o retrocede en el wizard
      if (e.accion === 'cont') {
        // Si la acción es 'cont', avanza al siguiente paso
        this.wizardComponent.siguiente();
      } else {
        // Si la acción es 'atras', retrocede al paso anterior
        this.wizardComponent.atras();
      }
    }
  }
}