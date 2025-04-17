import { AVISO } from '@libs/shared/data-access-user/src/tramites/constantes/aviso-privacidad.enum';
import { Component, ViewChild } from '@angular/core';

import { AccionBoton } from '@libs/shared/data-access-user/src/core/models/140103/cancelacion.model';
import { DatosPasos } from '@libs/shared/data-access-user/src';
import { ListaPasosWizard } from '@libs/shared/data-access-user/src';
import { PASOS } from '@libs/shared/data-access-user/src/tramites/constantes/303/pasos.enums';
import { WizardComponent } from '@libs/shared/data-access-user/src';


@Component({

  selector: 'app-permiso-de-exportacion',
  templateUrl: './permiso-de-exportacion.component.html',
})


export class PermisoDeExportacionComponent {
  
  pantallasPasos: ListaPasosWizard[] = PASOS;

  
  indice: number = 1;

  public TEXTOS = AVISO;


  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;


  datosPasos: DatosPasos = {
    
    nroPasos: this.pantallasPasos.length,

    
    indice: this.indice,


    txtBtnAnt: 'Anterior',

    
    txtBtnSig: 'Continuar',
  };

 
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
}
