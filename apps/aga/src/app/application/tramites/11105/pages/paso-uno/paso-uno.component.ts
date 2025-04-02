import {
  BtnContinuarComponent,
  DatosPasos,
  FormularioDinamico,
  ListaPasosWizard,
  PASOS,
  SolicitanteComponent,
  WizardComponent,
} from '@ng-mf/data-access-user';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatosGeneralesDeLaSolicitudComponent } from '../../components/datos-generales-de-la-solicitud/datos-generales-de-la-solicitud.component';
import { DesistimientoComponent } from '../../components/desistimiento/desistimiento.component';


interface AccionBoton {
  accion: string;
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
    DatosGeneralesDeLaSolicitudComponent,
    FormsModule,
    ReactiveFormsModule,
    DesistimientoComponent,
    BtnContinuarComponent,
  ],
})
export class PasoUnoComponent {
  @Output() continuarEvento = new EventEmitter<string>();

  /**
   * Referencia al componente de solicitante.
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /**
   * Tipo de persona.
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
   * Índice de la pestaña seleccionada.
   */
  indice: number = 1;

  pasos: ListaPasosWizard[] = PASOS;

  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Selecciona la pestaña indicada por el índice.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  continuar(): void {
    this.continuarEvento.emit('');
  }

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
