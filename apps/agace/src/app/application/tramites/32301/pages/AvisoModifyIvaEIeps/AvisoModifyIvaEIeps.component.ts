import { Component, ViewChild } from '@angular/core';
import { AccionBoton } from '@ng-mf/data-access-user';
import { BtnContinuarComponent } from "@ng-mf/data-access-user";
import { CommonModule } from '@angular/common';
import { DatosPasos } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PASOS } from "../../constantes/importador-exportador.enum"
import { PasoDosComponent } from '../paso-dos/PasoDos.component';
import { PasoTresComponent } from '../paso-tres/PasoTres.component';
import { PasoUnoComponent } from '../peso-uno/PasoUno.component';
import { WizardComponent } from '@ng-mf/data-access-user';


// Componente principal para el aviso de modificación de IVA y EI/EPs
@Component({
  selector: 'app-aviso-modify-iva-eieps', // Selector del componente
  standalone: true, // El componente es independiente, sin necesidad de un módulo externo
  imports: [CommonModule, WizardComponent, PasoUnoComponent, PasoDosComponent, PasoTresComponent, BtnContinuarComponent], // Componentes importados para el wizard y botones
  templateUrl: './AvisoModifyIvaEIeps.component.html', // Ruta al archivo HTML
})
export class AvisoModifyIvaEIepsComponent {
  /** Lista de pasos para el wizard */
  pasos: ListaPasosWizard[] = PASOS;

  /** Índice actual del paso que se está visualizando */
  indice: number = 1;

  /** Datos para la navegación entre pasos, como el número total de pasos y los textos de los botones */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length, // Número total de pasos
    indice: this.indice, // Índice del paso actual
    txtBtnAnt: 'Anterior', // Texto para el botón de "anterior"
    txtBtnSig: 'Continuar', // Texto para el botón de "continuar"
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

