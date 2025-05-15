/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @component ImmexRegistroSolicitudModalityComponent
 * @description Este componente es responsable de manejar el flujo de pasos para el registro de solicitud IMMEX.
 * Incluye la lógica para la navegación entre pasos y la obtención de títulos.
 */
import { Component, ViewChild } from '@angular/core';
import { DatosPasos } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PASOS } from '../../constantes/immex-registro-de-solicitud-modality.enums';
import { WizardComponent } from '@ng-mf/data-access-user';

/**
 * @interface AccionBoton
 * @description Interfaz para definir la acción y el valor del botón.
 *
 * @property {string} accion - Determina la acción a realizar (por ejemplo, avanzar o retroceder).
 * @property {number} valor - Representa el índice del paso al que se desea navegar.
 */
interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  selector: 'app-immex-registro-solicitud-modality',
  templateUrl: './immex-registro-solicitud-modality.component.html',
})
export class ImmexRegistroSolicitudModalityComponent {
  /**
   * @property {any} asistenteSolicitud
   * @description Variable para manejar el asistente de solicitud.
   */
  asistenteSolicitud: any;

  /**
   * @property {Array<ListaPasosWizard>} pasos
   * @description Array que contiene los pasos del asistente (wizard).
   */
  pasos: Array<ListaPasosWizard> = PASOS;

  /**
   * @property {string | null} tituloMensaje
   * @description Título del mensaje mostrado en el asistente.
   */
  tituloMensaje: string | null = 'Zoosanitario para importación';

  /**
   * @property {WizardComponent} wizardComponent
   * @description Referencia al componente del asistente (wizard) para manejar la navegación.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * @property {number} indice
   * @description Índice del paso actual en el asistente.
   */
  indice: number = 1;

  /**
   * @property {DatosPasos} datosPasos
   * @description Datos relacionados con los pasos del asistente, como el número total de pasos y los textos de los botones.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * @method getValorIndice
   * @description Maneja la acción del botón y determina la navegación (siguiente o anterior).
   *
   * @param {AccionBoton} e - Objeto que contiene la acción (`accion`) y el índice (`valor`) del paso al que se desea navegar.
   * La acción puede ser:
   * - `cont`: Avanzar al siguiente paso.
   * - `atras`: Retroceder al paso anterior.
   */
  getValorIndice(e: AccionBoton) {
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