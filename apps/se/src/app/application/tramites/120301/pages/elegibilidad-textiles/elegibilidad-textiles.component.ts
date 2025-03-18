/**
 * @component ElegibilidadTextilesComponent
 * @description Este componente es responsable de manejar el flujo de pasos para la elegibilidad de textiles.
 * Incluye la lógica para la navegación entre pasos y la obtención de títulos.
 * 
 * @import { Component, ViewChild } from '@angular/core';
 * @import { ListaPasosWizard } from '../../../../core/models/120301/elegibilidad-de-textiles-routing.model';
 * @import { WizardComponent } from '../../../../shared/components/wizard/wizard.component';
 * @import { DatosPasos } from '../../../../core/models/shared/components.model';
 * @import { PASOS } from '../../../../shared/constantes/elegibilidad-de-textiles.enums';
 */

import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DatosPasos } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '../../models/elegibilidad-de-textiles.model';
import { PASOS } from '../../constantes/elegibilidad-de-textiles.enums';
import { WizardComponent } from '@ng-mf/data-access-user';

/**
 * Interfaz para definir la acción y el valor del botón. --120301
 */
interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  selector: 'app-elegibilidad-textiles',
  templateUrl: './elegibilidad-textiles.component.html',
})
export class ElegibilidadTextilesComponent {

  formGroup: FormGroup;

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

  constructor() {

    this.formGroup = new FormGroup({

      campo1: new FormControl(''),

      campo2: new FormControl('')

    });

  }

  /**
   * Maneja la acción del botón y determina la navegación (siguiente o anterior).
   *
   * @param e - Objeto de acción que contiene la acción y el valor a manejar.
   * El `valor` representa el índice del paso al que ir.
   * La `accion` determina si avanzar (cont) o retroceder (atras).  --120301
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
  static obtenerNombreDelTítulo(valor: number): string {
    return new Error('Método no implementado.').toString();
  }
}