import { AccionBoton, BtnContinuarComponent, DatosPasos, ListaPasosWizard, WizardComponent } from '@ng-mf/data-access-user';
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PASOS } from "../../constantes/importador-exportador.enum"
import { PasoDosComponent } from "../PasoDos/PasoDos.component"
import { PasoTresComponent } from "../PasoTres/PasoTres.component";
import { PasoUnoComponent } from "../paso-uno/paso-uno.component"

@Component({
  selector: 'app-sanidad-acuicola-certificado',
  standalone: true,
  imports: [CommonModule, WizardComponent, BtnContinuarComponent, PasoTresComponent, PasoDosComponent, PasoUnoComponent],
  templateUrl: './sanidadAcuicolaCertificado.component.html',
})
export class SanidadAcuicolaCertificadoComponent {
   /** Lista de pasos para el wizard */
    pasos: ListaPasosWizard[] = PASOS;
  
    /** Índice actual del paso que se está visualizando */
    indice: number = 1;
  
  
    datosPasos: DatosPasos = {
      nroPasos: this.pasos.length, 
      indice: this.indice, 
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar', 
    };
  
    /** Referencia al componente Wizard, utilizado para la navegación entre pasos */
    @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  
      /** Método para manejar el cambio de índice según la acción del botón (anterior o siguiente) */
      getValorIndice(e: AccionBoton): void {
        // Validación de valor y acción para actualizar el índice
        if (e.valor > 0 && e.valor < 5) {
          this.indice = e.valor;
          
          // Acción de continuar
          if (e.accion === 'cont') {
            this.wizardComponent.siguiente(); // Avanzar al siguiente paso
          } else {
            this.wizardComponent.atras(); // Volver al paso anterior
          }
        }
      }
}
