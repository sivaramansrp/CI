
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
import { PASOS } from 'libs/shared/data-access-user/src/tramites/constantes/80208/solicitud-modalidad.enums';
import { ListaPasosWizard } from 'libs/shared/data-access-user/src/core/models/80208/solicitud-modalidad.model';
import { DatosPasos } from 'libs/shared/data-access-user/src/core/models/shared/components.model';
import { WizardComponent } from '@ng-mf/data-access-user';


/**
 * Interfaz para definir la acción y el valor del botón.
 */
interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  selector: 'app-solicitud-modalidad-page',
  templateUrl: './solicitud-modalidad-page.component.html',
  styleUrl: './solicitud-modalidad-page.component.scss'
})
export class SolicitudModalidadPageComponent {

  title(title: any) {
    throw new Error('Método no implementado.');
  }

  /**
   * @property {Array<ListaPasosWizard>} pasos - Array de pasos del wizard.
   */
  pasos: Array<ListaPasosWizard> = PASOS;

  /**
   * @property {WizardComponent} wizardComponent - Componente de wizard.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * @property {number} indice - El índice del paso actual.
   */
  indice: number = 1;

  /**
   * @property {DatosPasos} datosPasos - Datos de los pasos del wizard.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Maneja la acción del botón y determina la navegación (siguiente o anterior).
   *
   * @param e - Objeto de acción que contiene la acción y el valor a manejar.
   * El `valor` representa el índice del paso al que ir.
   * La `accion` determina si avanzar (cont) o retroceder (atras).
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

  /**
   * Obtener un título para todas las paginas.
   * @param valor - valor del índice de pagina. --80208
   */
  obtenerNombreDelTítulo(valor: number): string {
    throw new Error('Método no implementado.');
  }
}