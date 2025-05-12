import {
  BtnContinuarComponent,
  DatosPasos,
  FormularioDinamico,
  ListaPasosWizard,
  SolicitanteComponent,
  WizardComponent,
} from '@ng-mf/data-access-user';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PASOS } from '@libs/shared/data-access-user/src/tramites/constantes/11106/pasos.enum';
import { SolicitudComponent } from '../../components/solicitud/solicitud.component';

interface AccionBoton {
  /**
   * Acción a realizar (e.g., 'cont' para continuar, 'ant' para retroceder).
   */
  accion: string;

  /**
   * Índice del paso al que se desea navegar.
   */
  valor: number;
}

/**
 * Componente que representa el paso uno del trámite.
 */
@Component({
  standalone: true,
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  imports: [
    SolicitanteComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SolicitudComponent,
    BtnContinuarComponent,
  ],
})
export class PasoUnoComponent {
  /**
   * Evento que se emite al continuar con el flujo del trámite.
   */
  @Output() continuarEvento = new EventEmitter<string>();

  /**
   * Referencia al componente de solicitante.
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /**
   * Tipo de persona (e.g., física o moral).
   */
  tipoPersona!: number;

  /**
   * Datos del formulario dinámico de la persona.
   */
  persona: FormularioDinamico[] = [];

  /**
   * Datos del formulario dinámico del domicilio fiscal.
   */
  domicilioFiscal: FormularioDinamico[] = [];

  /**
   * Índice de la pestaña seleccionada en el wizard.
   */
  indice: number = 1;

  /**
   * Lista de pasos del wizard.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Referencia al componente del wizard.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Datos de configuración para los pasos del wizard.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Selecciona la pestaña indicada por el índice.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Emite el evento para continuar con el flujo del trámite.
   */
  continuar(): void {
    this.continuarEvento.emit('');
  }

  /**
   * Cambia el índice del wizard según la acción recibida.
   * @param e Objeto que contiene la acción ('cont' o 'ant') y el índice del paso.
   */
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
