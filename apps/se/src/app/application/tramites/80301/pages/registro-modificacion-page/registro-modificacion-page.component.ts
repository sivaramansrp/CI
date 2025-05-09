import { 
  AccionBoton, 
  DatosPasos, 
  ListaPasosWizard, 
  WizardComponent 
} from '@libs/shared/data-access-user/src';

import { Component, ViewChild } from '@angular/core';

import { PASOS_EXPORTACION } from '../../constantes/elegibilidad-de-textiles.enums';

/**
 * Componente para gestionar la página de registro y modificación.
 * Este componente utiliza un asistente (wizard) para guiar al usuario a través de los pasos necesarios.
 */
@Component({
  selector: 'app-registro-modificacion-page',
  templateUrl: './registro-modificacion-page.component.html',
})
export class RegistroModificacionPageComponent {
  /**
   * Lista de pasos que se deben completar en el asistente.
   * Se obtiene de una constante predefinida.
   */
  pasosSolicitar: ListaPasosWizard[] = PASOS_EXPORTACION;

  /**
   * Índice del paso actual en el asistente.
   * Este índice se utiliza para rastrear el progreso del usuario.
   */
  indice = 1;

  /**
   * Índice de la pestaña actualmente seleccionada.
   * Se utiliza para gestionar la navegación entre pestañas.
   */
  tabIndex = 1;

  /**
   * Referencia al componente del asistente (wizard).
   * Permite interactuar directamente con el asistente para avanzar o retroceder pasos.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Objeto que contiene información sobre el número total de pasos y los textos de los botones.
   * Este objeto se utiliza para configurar dinámicamente el asistente.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasosSolicitar.length, // Número total de pasos en el asistente.
    indice: this.indice, // Índice del paso actual.
    txtBtnAnt: 'Anterior', // Texto del botón para retroceder.
    txtBtnSig: 'Continuar', // Texto del botón para avanzar.
  };

  /**
   * Actualiza el índice del paso y navega en el asistente.
   * Este método se llama cuando el usuario interactúa con los botones del asistente.
   * 
   * @param e Objeto que contiene el índice del paso (`valor`) y la acción (`accion`).
   * - `valor`: Índice del paso al que se desea navegar.
   * - `accion`: Tipo de acción, puede ser 'cont' (continuar) o 'ant' (anterior).
   */
  getValorIndice(e: AccionBoton): void {
    // Verifica que el índice esté dentro del rango válido.
    if (e.valor >= 1 && e.valor <= this.datosPasos.nroPasos) {
      this.indice = e.valor; // Actualiza el índice del paso actual.
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente(); // Avanza al siguiente paso en el asistente.
      } else {
        this.wizardComponent.atras(); // Retrocede al paso anterior en el asistente.
      }
    }
  }
}