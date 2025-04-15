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

/**
 * @component ElegibilidadTextilesComponent
 * @description Este componente es responsable de manejar el flujo de pasos para la elegibilidad de textiles.
 * Incluye la lógica para la navegación entre pasos y la obtención de títulos.
 */
@Component({
  selector: 'app-elegibilidad-textiles',
  templateUrl: './elegibilidad-textiles.component.html',
})
export class ElegibilidadTextilesComponent {
  /**
   * @property {FormGroup} formGroup - Grupo de formularios para manejar los datos del formulario.
   */
  formGroup: FormGroup;

  /**
   * @property {Array<ListaPasosWizard>} pasos - Array de pasos del wizard.
   */
  pasos: Array<ListaPasosWizard> = PASOS;

  /**
   * @property {string | null} tituloMensaje - El título del mensaje mostrado en el wizard.
   */
  tituloMensaje: string | null = 'Zoosanitario para importación';

  /**
   * @property {WizardComponent} wizardComponent - Referencia al componente del wizard.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * @property {number} indice - Índice del paso actual en el wizard.
   */
  indice: number = 1;

  /**
   * @property {DatosPasos} datosPasos - Datos relacionados con los pasos del wizard.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * @constructor
   * @description Constructor del componente. Inicializa el grupo de formularios.
   */
  constructor() {
    this.formGroup = new FormGroup({
      campo1: new FormControl(''),
      campo2: new FormControl(''),
    });
  }

  /**
   * @method getValorIndice
   * @description Maneja la acción del botón y determina la navegación (siguiente o anterior).
   * @param {AccionBoton} e - Objeto que contiene la acción y el valor del índice del paso.
   */
  getValorIndice(e: AccionBoton): void {
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
   * @method obtenerNombreDelTítulo
   * @description Obtiene un título para todas las páginas del wizard.
   * @param {number} _valor - Índice del paso para el cual se desea obtener el título.
   * @returns {string} Título del paso.
   */
  static obtenerNombreDelTítulo(_valor: number): string {
    return new Error('Método no implementado.').toString();
  }
}