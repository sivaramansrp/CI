import { Component, OnInit, ViewChild } from '@angular/core';
import {
  BtnContinuarComponent,
  DatosPasos,
  ListaPasosWizard,
  PASOS,
  WizardComponent,
} from '@ng-mf/data-access-user';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';
import { CommonModule } from '@angular/common';

/**
 * Interfaz que define la estructura de una acción de botón.
 */
interface AccionBoton {
  /**
   * La acción que se realizará.
   */
  accion: string;

  /**
   * El valor asociado a la acción.
   */
  valor: number;
}

/**
 * Componente que representa la página de solicitud.
 */
@Component({
  templateUrl: './solicitud-page.component.html',
  styles: ``,
  standalone: true,
  imports: [
    WizardComponent,
    BtnContinuarComponent,
    PasoUnoComponent,
    PasoTresComponent,
    CommonModule,
  ],
})
export class SolicitudPageComponent implements OnInit {
  ngOnInit(): void {
    this.pasos = this.pasos
      .filter((step) => step.indice !== 2)

      .map((step) => (step.indice === 3 ? { ...step, indice: 2 } : step));
  }
  nombre!: number;

  /**
   * Lista de pasos del asistente.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Índice del paso actual.
   */
  indice: number = 1;
  /**
   * Controla la visibilidad del mensaje de bienvenida.
   */
  showWelcomeAlert: boolean = false;

  /**
   * Referencia al componente del asistente.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Datos de los pasos del asistente.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Selecciona una pestaña del asistente.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Obtiene el valor del índice de la acción del botón.
   * @param e Acción del botón.
   */
  getValorIndice(e: AccionBoton): void {
    this.onChildEvent(this.nombre)
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.nombre = 1;
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }

  onChildEvent(event: number) {
    debugger
    this.nombre = event;
   
  }
}
