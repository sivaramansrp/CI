import { Component, ViewChild } from '@angular/core';


import { ListaPasosWizard } from '../../../../core/models/5701/servicios-extraordinarios.model';
import { PASOS } from '../../../../shared/constantes/aviso.enum';
import { WizardComponent } from '../../../../shared/components/wizard/wizard.component';

/**
 * @component DatosComponent
 * @selector app-datos
 * @templateUrl ./datos.component.html
 * @styles
 * 
 * @description
 * Componente Angular para manejar los datos del wizard.
 */
@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styles: ``,
  
})
export class DatosComponent {

  /**
   * @property pasos
   * @type {ListaPasosWizard[]}
   * @description Arreglo que contiene los pasos del wizard.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * @property wizardComponent
   * @type {WizardComponent}
   * @description Referencia al componente del wizard.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  
  /**
   * @property indice
   * @type {number}
   * @description El índice de la pestaña seleccionada.
   */
  indice: number = 1;

}