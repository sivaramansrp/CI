import { Component, ViewChild } from '@angular/core';
import { DatosPasos, WizardComponent } from '@libs/shared/data-access-user/src';

import { ListaPasosWizard } from 'libs/shared/data-access-user/src/core/models/5701/servicios-extraordinarios.model';
import { solicitud_importacion } from 'libs/shared/data-access-user/src/core/services/130110/solicitud-importacion-neumaticos-comercializar.enum';

interface AccionBoton {
  accion: string;
  valor: number;
}
@Component({
  selector: 'app-solicitud-importacion-neumaticos-comercializar',
 
  templateUrl:
    './solicitud-importacion-neumaticos-comercializar.component.html',
  styleUrl: './solicitud-importacion-neumaticos-comercializar.component.css',
})
export class SolicitudImportacionNeumaticosComercializarComponent {
   @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
    
    pantallasPasos: ListaPasosWizard[] = solicitud_importacion;
  
    
    indice: number = 1;
  
    datosPasos: DatosPasos = {
      nroPasos: this.pantallasPasos.length,
      indice: this.indice,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar',
    };
    getValorIndice(e: AccionBoton) :void{
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
