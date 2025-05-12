import { Component, ViewChild } from '@angular/core';

import { DatosPasos, ListaPasosWizard, WizardComponent } from '@ng-mf/data-access-user';
import { PERMISO_MAQUILA } from '../../constantes/permiso-importacion-biologica.enum';

/**
 * Representa una acción asociada a un botón con un valor numérico.
 *
 * @interface AccionBoton
 * @property {string} accion - Describe la acción que se realizará al interactuar con el botón.
 * @property {number} valor - Representa un valor numérico asociado a la acción del botón.
 */
interface AccionBoton {
  accion: string;
  valor: number;
}
/**
 * @descripción
 * Este componente se encarga de gestionar la funcionalidad del asistente (wizard) "Permiso Maquila".
 * Proporciona la lista de pasos del asistente y administra el índice del paso actual.
 */

@Component({
  selector: 'app-permiso-importacion-biologica',
  standalone: false,
  templateUrl: './permiso-importacion-biologica.component.html',
})
export class PermisoImportacionBiologicaComponent {
  /**
   * @comdoc
   * Referencia al componente WizardComponent utilizado en este componente.
   * 
   * @decorador {ViewChild} - Permite acceder a una instancia del componente hijo `WizardComponent`.
   * @prop {WizardComponent} wizardComponent - Instancia del componente wizard que se utiliza para manejar la navegación entre pasos.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  /**
     * Esta variable se utiliza para almacenar la lista de pasos.
     */
  pantallasPasos: ListaPasosWizard[] = PERMISO_MAQUILA;

  /**
   * Esta variable se utiliza para almacenar el índice del paso.
   */
  indice = 1;

  /**
   * @comdoc
   * Representa los datos relacionados con los pasos de un proceso o flujo en la aplicación.
   * 
   * @prop {number} nroPasos - Número total de pasos en el flujo, calculado a partir de la longitud de `pantallasPasos`.
   * @prop {number} indice - Índice actual del paso en el flujo.
   * @prop {string} txtBtnAnt - Texto que se muestra en el botón para retroceder al paso anterior.
   * @prop {string} txtBtnSig - Texto que se muestra en el botón para avanzar al siguiente paso.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pantallasPasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };


  /**
   * Obtiene el valor del índice basado en la acción del botón y realiza una acción en el componente wizard.
   *
   * @param e - Objeto de tipo `AccionBoton` que contiene el valor y la acción a realizar.
   *   - `valor`: Número que debe estar entre 1 y 4 (inclusive) para ser considerado válido.
   *   - `accion`: Cadena que indica la acción a realizar, puede ser 'cont' para avanzar o cualquier otro valor para retroceder.
   *
   * Si el valor está en el rango permitido, actualiza el índice y llama al método correspondiente
   * del componente wizard (`siguiente` o `atras`) según la acción especificada.
   */
  getValorIndice(e: AccionBoton):void {
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
