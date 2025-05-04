import { AccionBoton, DatosPasos, ListaPasosWizard, WizardComponent } from '@libs/shared/data-access-user/src';
import { Component, ViewChild } from '@angular/core';
import { PAGO_DE_DERECHOS, PASOS } from '../../constantes/aviso-retorno.enum';

/**
 * Componente que representa la sección de aviso de reciclaje.
 * 
 * Este componente permite la navegación entre los pasos de un wizard y maneja la lógica relacionada con el
 * pago de derechos y la visualización de pasos.
 * 
 * - selector: Etiqueta personalizada para utilizar este componente en otras plantillas.
 * - templateUrl: Archivo de plantilla HTML que contiene el diseño visual del componente.
 */
@Component({
  selector: 'app-aviso-retorno',
  templateUrl: './aviso-retorno.component.html',
})
export class AvisoRetornoComponent {

  /**
   * Lista de pasos del wizard.
   * 
   * @type {ListaPasosWizard[]}
   * @property pasos
   * Arreglo que contiene los pasos del wizard, que se definen en la constante `PASOS`.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Componente del wizard.
   * 
   * @type {WizardComponent}
   * @property wizardComponent
   * Referencia al componente del wizard que maneja la lógica de navegación entre los pasos.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Clase CSS utilizada para mostrar una alerta de tipo informativo.
   * 
   * @type {string}
   */
  public infoAlert = 'alert-info';

  /**
   * Textos utilizados relacionados con el pago de derechos.
   * 
   * @type {typeof PAGO_DE_DERECHOS}
   */
  TEXTOS = PAGO_DE_DERECHOS;

  /**
   * Índice de la pestaña seleccionada en el wizard.
   * 
   * @type {number}
   * @property indice
   * Valor numérico que representa el índice de la pestaña actual en el wizard (por defecto en 1).
   */
  indice: number = 1;

  /**
   * Datos necesarios para gestionar los pasos del wizard.
   * 
   * @type {DatosPasos}
   * @property datosPasos
   * Objeto que contiene los datos relacionados con la navegación del wizard.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length, // Número de pasos del wizard
    indice: this.indice, // Índice actual de la pestaña
    txtBtnAnt: 'Anterior', // Texto del botón "Anterior"
    txtBtnSig: 'Continuar', // Texto del botón "Continuar"
  };

  /**
   * Actualiza el valor del índice y navega entre los pasos del wizard según la acción del botón.
   * 
   * @param e Objeto que contiene la acción y el valor del botón presionado.
   * @returns {void}
   */
  public getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        // Si la acción es 'cont', se avanza al siguiente paso
        this.wizardComponent?.siguiente();
      } else {
        // Si la acción no es 'cont', retrocedemos al paso anterior
        this.wizardComponent.atras();
      }
    }
  }
}
