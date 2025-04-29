import {
  AccionBoton,
  BtnContinuarComponent,
  DatosPasos,
  ListaPasosWizard,
  WizardComponent,
} from '@ng-mf/data-access-user';
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PASOS } from '../../constantes/importador-exportador.enum';
import { PasoDosComponent } from '../PasoDos/PasoDos.component';
import { PasoTresComponent } from '../PasoTres/PasoTres.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';

@Component({
  selector: 'app-sanidad-acuicola-certificado',
  standalone: true,
  imports: [
    CommonModule,
    WizardComponent,
    BtnContinuarComponent,
    PasoTresComponent,
    PasoDosComponent,
    PasoUnoComponent,
  ],
  templateUrl: './sanidadAcuicolaCertificado.component.html',
})
export class SanidadAcuicolaCertificadoComponent {
  /** Lista de pasos para el wizard */
  pasos: ListaPasosWizard[] = PASOS;

  /** Índice actual del paso que se está visualizando */
  indice: number = 1;

  /**
   * Objeto `datosPasos` que almacena información sobre los pasos del proceso.
   * Contiene datos como el número total de pasos, el índice actual y los textos de los botones de navegación.
   */
  datosPasos: DatosPasos = {
    /**
     * Número total de pasos en el proceso.
     * Se obtiene dinámicamente a partir de la longitud del arreglo `pasos`.
     */
    nroPasos: this.pasos.length,

    /**
     * Índice del paso actual dentro del proceso.
     */
    indice: this.indice,

    /**
     * Texto que se muestra en el botón para retroceder al paso anterior.
     */
    txtBtnAnt: 'Anterior',

    /**
     * Texto que se muestra en el botón para avanzar al siguiente paso.
     */
    txtBtnSig: 'Continuar',
  };

  /** Referencia al componente Wizard, utilizado para la navegación entre pasos */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /** Método para manejar el cambio de índice según la acción del botón (anterior o siguiente) */
  getValorIndice(e: AccionBoton): void {
    // Validación de valor y acción para actualizar el índice
    /**
     * Validación del valor recibido y actualización del índice si cumple con las condiciones.
     */
    if (e.valor > 0 && e.valor < 5) {
      /**
       * Se actualiza el índice con el valor recibido.
       */
      this.indice = e.valor;

      /**
       * Se verifica la acción a realizar.
       * Si la acción es 'cont', se avanza al siguiente paso.
       * En caso contrario, se retrocede al paso anterior.
       */
      if (e.accion === 'cont') {
        /**
         * Llama al método `siguiente()` para avanzar al siguiente paso en el componente de asistente.
         */
        this.wizardComponent.siguiente();
      } else {
        /**
         * Llama al método `atras()` para volver al paso anterior en el componente de asistente.
         */
        this.wizardComponent.atras();
      }
    }
  }
}
