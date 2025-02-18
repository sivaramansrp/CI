import { Component, ViewChild } from '@angular/core';

// Importación de la interfaz ListaPasosWizard desde el modelo de servicios extraordinarios.
import { ListaPasosWizard } from '../../../../core/models/5701/servicios-extraordinarios.model';

// Importación de la constante PASOS desde el archivo de constantes de aviso.
import { PASOS } from '../../../../shared/constantes/aviso.enum';

// Importación del componente WizardComponent desde el componente compartido de wizard.
import { WizardComponent } from '../../../../shared/components/wizard/wizard.component';
/**
 *  DatosComponent
 * app-datos
 * ./datos.component.html
 * 
 * 
 * 
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
   *  Arreglo que contiene los pasos del wizard.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * @property wizardComponent
   * @type {WizardComponent}
   *  Referencia al componente del wizard.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  
  /**
   * @property indice
   * @type {number}
   *  El índice de la pestaña seleccionada.
   */
  indice: number = 1;

}