import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { ViewChild } from '@angular/core';
import {
  BtnContinuarComponent,
  DatosPasos,
  ListaPasosWizard,
  RenovacionesPasos,
  WizardComponent,
} from '@ng-mf/data-access-user';
import { ToastrModule } from 'ngx-toastr';

/**
 * Interfaz que representa el botón de acción.
 */
interface AccionBoton {
  /**
   * La acción a realizar.
   */
  accion: string;
  /**
   * El valor asociado con la acción.
   */
  valor: number;
}

/**
 * Componente de renovaciones.
 *
 * Este componente maneja el flujo de pasos para el proceso de renovaciones.
 *
 * @selector 'app-renovaciones'
 * @standalone true
 * @imports [
 *   CommonModule,
 *   WizardComponent,
 *   BtnContinuarComponent,
 *   PasoUnoComponent,
 *   PasoDosComponent,
 *   PasoTresComponent,
 *   BtnContinuarComponent
 * ]
 * @templateUrl './renovaciones.component.html'
 * @styleUrl './renovaciones.component.scss'
 */
@Component({
  selector: 'app-renovaciones',
  standalone: true,
  imports: [
    CommonModule,
    WizardComponent,
    BtnContinuarComponent,
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
    BtnContinuarComponent,
    ToastrModule
  ],
  templateUrl: './renovaciones.component.html',
  styleUrl: './renovaciones.component.scss',
})
export class RenovacionesComponent {
  /**
   * Esta variable se utiliza para almacenar la lista de pasos.
   */
  pasos: ListaPasosWizard[] = RenovacionesPasos;
  /**
   * Esta variable se utiliza para almacenar el índice del paso actual.
   */
  indice: number = 1;

  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Datos relacionados con los pasos.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Maneja la navegación entre los pasos del asistente según las acciones de los botones.
   * @param e - La acción del botón que contiene el tipo de acción y el valor del índice.
   */
  getValorIndice(evento: AccionBoton): void {
    this.indice = evento.valor;
    this.wizardComponent[evento.accion === 'cont' ? 'siguiente' : 'atras']();
  }
}
