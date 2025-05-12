import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, DatosPasos, ListaPasosWizard, PASOS, TituloComponent, WizardComponent } from '@ng-mf/data-access-user';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';

/**
 * Texto de alerta para terceros.
 * Este texto se muestra cuando se registra una solicitud de manera temporal.
 */
const TERCEROS_TEXTO_DE_ALERTA = 'La solicitud ha quedado registrada con el número temporal 202757598 Éste no tiene validez legal y sirve solamente para efectos de identificar tu solicitud. Un folio oficial le será asignado a la solicitud al momento en que ésta sea firmada.';

/**
 * Interfaz que define la estructura de una acción de botón.
 */
interface AccionBoton {
  /**
   * La acción que se realizará (por ejemplo, avanzar o retroceder en el asistente).
   */
  accion: string;

  /**
   * El valor asociado a la acción (por ejemplo, el índice del paso al que se desea ir).
   */
  valor: number;
}

/**
 * Componente que representa la página de solicitud.
 * Este componente utiliza un asistente (wizard) para guiar al usuario a través de los pasos necesarios para completar una solicitud.
 */
@Component({
  templateUrl: './solicitud-page.component.html',
  styles: ``,
  standalone: true,
  imports: [
    AlertComponent,
    AnexarDocumentosComponent,
    BtnContinuarComponent,
    CommonModule,
    FormsModule,
    PasoDosComponent,
    PasoTresComponent,
    PasoUnoComponent,
    ReactiveFormsModule,
    TituloComponent,
    WizardComponent,
  ],
})
export class SolicitudPageComponent {
  /**
   * Texto de alerta mostrado al registrar una solicitud temporal.
   */
  TEXTO_DE_ALERTA: string = TERCEROS_TEXTO_DE_ALERTA;

  /**
   * Lista de pasos del asistente.
   * Define los pasos que el usuario debe completar en el asistente.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Índice del paso actual en el asistente.
   * Este índice se utiliza para determinar qué paso está activo.
   */
  indice: number = 1;

  /**
   * Referencia al componente del asistente (wizard).
   * Permite interactuar con el asistente, como avanzar o retroceder entre los pasos.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Datos de los pasos del asistente.
   * Incluye información como el número total de pasos, el índice actual y los textos de los botones.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Selecciona una pestaña del asistente.
   * Cambia el índice del paso activo en el asistente.
   * 
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Obtiene el valor del índice de la acción del botón.
   * Cambia el paso activo en el asistente según la acción del botón (avanzar o retroceder).
   * 
   * @param e Acción del botón.
   */
  getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente(); // Avanza al siguiente paso.
      } else {
        this.wizardComponent.atras(); // Retrocede al paso anterior.
      }
    }
  }
}
