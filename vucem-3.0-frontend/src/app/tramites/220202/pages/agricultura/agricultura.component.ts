import { Component, ViewChild } from '@angular/core';
import { DatosPasos } from '../../../../core/models/shared/components.model';
import { PASOS } from '../../../../shared/constantes/220202/fitosanitario.enums';
import { WizardComponent } from '../../../../shared/components/wizard/wizard.component';

import { AccionBoton, ListaPasosWizard } from '../../../../core/models/220202/fitosanitario.model';

/**
 * @fileoverview Componente para la gestión del formulario de agricultura.
 * Este componente maneja la lógica y la presentación del formulario de agricultura,
 * incluyendo la navegación entre pasos y la gestión de los datos.
 * @module agricultura
 */

/**
 * Componente para el formulario de agricultura.
 * @class AgriculturaComponent
 */
@Component({
  selector: 'app-agricultura',
  templateUrl: './agricultura.component.html',
})
export class AgriculturaComponent {
  /**
    * @description Array de objetos que definen los pasos del formulario.
    * Cada objeto contiene información sobre un paso específico,
    * incluyendo su número, título y si está completado.
    * @type {ListaPasosWizard[]}
    */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * @description Referencia al componente Wizard.
   * Esta referencia permite acceder a los métodos y propiedades del componente Wizard,
   * como `siguiente()` y `atras()`, para controlar la navegación entre los pasos.
   * @type {WizardComponent}
   * @viewChild WizardComponent
   */
  @ViewChild(WizardComponent) componenteWizard!: WizardComponent;

  /**
   * @description Índice actual del paso en el que se encuentra el usuario.
   * Este índice se utiliza para determinar qué paso se muestra en cada momento.
   * @type {number}
   * @default 1
   */
  indice: number = 1;

  /**
   * @description Objeto que contiene los datos de los pasos del formulario.
   * Este objeto se utiliza para comunicar información entre el componente Agricultura
   * y el componente Wizard, como el número de pasos, el índice actual y los textos
   * para los botones de navegación.
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
   * Este método se llama cuando el usuario hace clic en uno de los botones de navegación.
   * Recibe un objeto `AccionBoton` que contiene la acción a realizar (`cont` o `atras`)
   * y el valor del índice del paso al que se debe navegar.
   * @param {AccionBoton} e - Objeto de acción que contiene la acción y el valor a manejar.
   * El `valor` representa el índice del paso al que ir.
   * La `accion` determina si avanzar (`cont`) o retroceder (`atras`).
   */
  getValorIndice(e: AccionBoton) {
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