/* eslint-disable @nx/enforce-module-boundaries */
import { Component, ViewChild } from '@angular/core';
import { DatosPasos } from '../../../../../../../../../libs/shared/data-access-user/src/core/models/shared/components.model';
import { ListaPasosWizard } from '../../../../../../../../../libs/shared/data-access-user/src/core/models/forma-render.model';
import { PASOS } from '../../../../../../../../../libs/shared/data-access-user/src/core/enums/constantes-alertas.enum';
import { WizardComponent } from '../../../../../../../../../libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';

/**
* ProcesoCompletoComponent proceso completo del registro
* 
* @component
*/
@Component({
  selector: 'proceso-completo',
  templateUrl: './proceso-completo.component.html',
  styles: ``
})

/**
 * Componente que representa el flujo completo de un proceso utilizando un asistente (wizard).
 * 
 * Este componente permite al usuario navegar a través de varios pasos definidos en la constante `PASOS`.
 * Proporciona métodos para seleccionar un paso específico, avanzar, retroceder y actualizar el índice actual.
 * También utiliza un componente hijo `WizardComponent` para manejar las acciones del asistente.
 */
export class ProcesoCompletoComponent {

  /** Definimos los pasos del asistente utilizando la constante PASOS importada 
   * @type {Array<ListaPasosWizard>}
   * @memberof ProcesoCompletoComponent
  */
  public pasos: Array<ListaPasosWizard> = PASOS;

  /**Inicializamos el índice del paso actual en 1 
   * @type {number}
   * @memberof ProcesoCompletoComponent
  */
  public indice: number = 1;

  /**Referencia al componente WizardComponent utilizando el decorador @ViewChild
   * @memberof ProcesoCompletoComponent
  */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**Definimos un objeto de tipo DatosPasos que contiene información sobre el número de pasos,
   el índice actual y los textos de los botones "Anterior" y "Continuar"
   * @type {DatosPasos}
   * @memberof ProcesoCompletoComponent 
   */
   public datosPasos: DatosPasos = {
    /** Número total de pasos en el asistente */
    nroPasos: this.pasos.length,
    /** Índice del paso actual */
    indice: this.indice,
    /** Texto del botón para retroceder */
    txtBtnAnt: 'Anterior',
    /** Texto del botón para avanzar */
    txtBtnSig: 'Continuar',
  };

  /**
   * Selecciona una pestaña específica en el asistente (wizard).
   * 
   * Este método actualiza el índice del paso actual al valor proporcionado,
   * permitiendo al usuario navegar directamente a un paso específico.
   * 
   * @param i - Número que representa el índice del paso al que se desea navegar.
   */
  public seleccionaTab(i: number): void {
    /** Actualiza el índice del paso actual al valor proporcionado */
    this.indice = i;
  }

  /**
   * Actualiza el índice basado en el valor proporcionado y realiza una acción en el componente asistente.
   * 
   * @param e - Objeto de tipo `AccionBoton` que contiene el valor y la acción a realizar.
   *   - `valor`: Número que debe estar entre 1 y 4 (inclusive) para actualizar el índice.
   *   - `accion`: Cadena que indica la acción a realizar, puede ser 'cont' para avanzar o cualquier otro valor para retroceder.
   * 
   * Si el valor está dentro del rango permitido, se actualiza el índice y se ejecuta la acción correspondiente:
   * - 'cont': Llama al método `siguiente()` del componente asistente.
   * - Otro valor: Llama al método `atras()` del componente asistente.
   */
  public getValorIndice(e: AccionBoton): void {
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

/**
 * Representa la estructura de una acción de botón.
 *
 * @interface AccionBoton
 * @property {string} accion - Nombre de la acción que se ejecutará.
 * @property {number} valor - Valor asociado a la acción.
 */
interface AccionBoton {
  accion: string;
  valor: number;
}
