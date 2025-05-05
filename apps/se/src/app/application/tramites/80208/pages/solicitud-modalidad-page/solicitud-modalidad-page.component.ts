/**
 * @description Este componente es responsable de manejar el flujo de pasos para la elegibilidad de textiles.
 * Incluye la lógica para la navegación entre pasos y la obtención de títulos.
 * 
 * @import { Component, ViewChild } from '@angular/core';
 * @import { PASOS } from 'libs/shared/data-access-user/src/tramites/constantes/80208/solicitud-modalidad.enums';
 * @import { DatosPasos } from 'libs/shared/data-access-user/src/core/models/shared/components.model';
 * @import { ListaPasosWizard } from 'libs/shared/data-access-user/src/core/models/80208/solicitud-modalidad.model';
 * @import { WizardComponent } from '@ng-mf/data-access-user';
 */

import { Component, ViewChild } from '@angular/core';
import { CambioModalidadQuery } from '../../estados/tramite80208.query';
import { DatosPasos } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PASOS } from '../../constantes/solicitud-modalidad.enums';
import { WizardComponent } from '@ng-mf/data-access-user';



/**
 * Interfaz para definir la acción y el valor del botón.
 */
interface AccionBoton {
  accion: string;
  valor: number;
}

/**
 * @description Este componente es responsable de manejar el flujo de pasos para la elegibilidad de textiles.
 * Incluye la lógica para la navegación entre pasos y la obtención de títulos.
 */
@Component({
  selector: 'app-solicitud-modalidad-page',
  templateUrl: './solicitud-modalidad-page.component.html',
  styleUrl: './solicitud-modalidad-page.component.scss'
})
export class SolicitudModalidadPageComponent {

  /**
   * @property {Array<ListaPasosWizard>} pasos
   * @description Array de pasos del asistente (wizard).
   */
  pasos: Array<ListaPasosWizard> = PASOS;

  /**
   * @property {WizardComponent} wizardComponent
   * @description Referencia al componente del asistente (wizard).
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * @property {number} indice
   * @description Índice del paso actual en el asistente.
   */
  indice: number = 1;

  /**
   * @property {DatosPasos} datosPasos
   * @description Datos relacionados con los pasos del asistente.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * @constructor
   * @description Constructor que inicializa el componente y sus dependencias.
   * @param {CambioModalidadQuery} cambioModalidadQuery - Servicio para consultar el estado del cambio de modalidad.
   */
  constructor(
    public cambioModalidadQuery: CambioModalidadQuery,
    // eslint-disable-next-line no-empty-function
  ) {
  }

  /**
   * @method getValorIndice
   * @description Maneja la acción del botón y determina la navegación (siguiente o anterior).
   * @param {AccionBoton} e - Objeto de acción que contiene la acción y el valor a manejar.
   * El `valor` representa el índice del paso al que ir.
   * La `accion` determina si avanzar (cont) o retroceder (atras).
   */
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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