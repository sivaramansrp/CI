/**
 * @component ImmexRegistroSolicitudModalityComponent
 * @description Este componente es responsable de manejar el flujo de pasos para el registro de solicitud IMMEX.
 * Incluye la lógica para la navegación entre pasos y la obtención de títulos.
 */
import { Component, ViewChild } from '@angular/core';
import { DatosPasos } from 'libs/shared/data-access-user/src/core/models/shared/components.model';
import { ListaPasosWizard } from 'libs/shared/data-access-user/src/core/models/80203/immex-registro-de-solicitud-modality-routing.module';
import { PASOS } from 'libs/shared/data-access-user/src/tramites/constantes/immex-registro-de-solicitud-modality.enums';
import { WizardComponent } from '@ng-mf/data-access-user';

/**
 * Interfaz para definir la acción y el valor del botón.
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
  componenteWizard: any;

  title(title: any) {
    throw new Error('Método no implementado.');
  }

  /**
   * @property {Array<ListaPasosWizard>} pasos - Array de pasos del wizard.
   */
  pasos: Array<ListaPasosWizard> = PASOS;

  /**
   * @property {string | null} tituloMensaje - El título del mensaje.
   */
  tituloMensaje: string | null = 'Zoosanitario para importación';

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
   * Obtener un título para todas las páginas.
   * @param valor - valor del índice de página. --120301
   */
  obtenerNombreDelTítulo(valor: number): string {
    throw new Error('Método no implementado.');
  }
}