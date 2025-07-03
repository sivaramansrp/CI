import { ALERT_TEXTO, PASOS } from '../../constantes/220202/fitosanitario.enums';
import { AccionBoton, ListaPasosWizard } from '../../models/220202/fitosanitario.model';
import { Component, ViewChild } from '@angular/core';
import { DatosPasos, WizardComponent } from '@ng-mf/data-access-user';

/**
 * @fileoverview Componente para la gestión del formulario de agricultura.
 * Este componente maneja la lógica y la presentación del formulario de agricultura,
 * incluyendo la navegación entre pasos y la gestión de los datos.
 * @module agricultura
 */

/**
 * Componente para el formulario de agricultura.
 * Este componente se encarga de gestionar el formulario de agricultura, incluyendo
 * la navegación entre los pasos del formulario y la actualización de datos.
 * @class AgriculturaComponent
 * @selector app-agricultura
 * @templateUrl ./agricultura.component.html
 */
@Component({
  selector: 'app-agricultura',
  templateUrl: './agricultura.component.html',
})
export class AgriculturaComponent {

  /**
   * @description Texto que se muestra en la alerta del formulario.
   * Este texto es utilizado para proporcionar información al usuario sobre el propósito del formulario.
   * @type {string}
   */
  public readonly alertText = ALERT_TEXTO;

  /**
   * @description Array de objetos que definen los pasos del formulario.
   * Cada objeto contiene información sobre un paso específico,
   * incluyendo su número, título y si está completado.
   * Este array permite la gestión de las secciones o pasos dentro del formulario.
   * @type {ListaPasosWizard[]}
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * @description Referencia al componente Wizard.
   * Esta referencia permite acceder a los métodos y propiedades del componente Wizard,
   * como `siguiente()` y `atras()`, para controlar la navegación entre los pasos.
   * 
   * @type {WizardComponent}
   * @viewChild WizardComponent
   */
  @ViewChild(WizardComponent) componenteWizard!: WizardComponent;

  /**
   * @description Índice actual del paso en el que se encuentra el usuario.
   * Este índice se utiliza para determinar qué paso se muestra en cada momento.
   * Los valores posibles de `indice` corresponden a los pasos definidos en el arreglo `pasos`.
   * 
   * @type {number}
   * @default 1
   */
  indice: number = 1;

  /**
   * @description Objeto que contiene los datos de los pasos del formulario.
   * Este objeto se utiliza para comunicar información entre el componente Agricultura
   * y el componente Wizard, como el número total de pasos, el índice del paso actual
   * y los textos de los botones de navegación (anterior y siguiente).
   * 
   * @type {DatosPasos}
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Guardar',
    txtBtnSig: 'Continuar',
  };

  /**
   * @description Maneja la acción del botón y determina la navegación (siguiente o anterior).
   * Este método se llama cuando el usuario hace clic en uno de los botones de navegación
   * del formulario.
   * 
   * Recibe un objeto `AccionBoton` que contiene la acción a realizar (`cont` o `atras`)
   * y el valor del índice del paso al que se debe navegar.
   * 
   * @param {AccionBoton} e - Objeto que contiene la acción y el valor a manejar.
   *   El `valor` representa el índice del paso al que ir. La `accion` determina si avanzar
   *   (valor `cont`) o retroceder (valor `atras`).
   * 
   * @returns {void}
   */
  getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.componenteWizard.siguiente();
      } else {
        this.componenteWizard.atras();
      }
    }
  }
}
