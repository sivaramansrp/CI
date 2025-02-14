import { Component, ViewChild } from '@angular/core';
import { ListaPasosWizard } from '../../../../core/models/5701/servicios-extraordinarios.model';
import { PASOS } from '../../../../shared/constantes/aviso.enum';
import { WizardComponent } from '../../../../shared/components/wizard/wizard.component';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styles: ``,
})
export class DatosComponent {

  pasos: ListaPasosWizard[] = PASOS;
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  
  indice: number = 1;
  
 

}
