/* eslint-disable @nx/enforce-module-boundaries */
/**
 * @fileoverview Este archivo contiene la clase OctavaTemporalComponent, que es responsable de manejar la lógica del componente Octava Temporal.
 * 
 * @module OctavaTemporalComponent
 */

import { Component, ViewChild } from '@angular/core';
import { DatosPasos, WizardComponent } from '@libs/shared/data-access-user/src';
import {ERROR_DE_REGISTRO_ALERT} from '../../constantes/octava-temporal.enum';
import { FormularioRegistroService } from '../../services/octava-temporal.service';
import { ListaPasosWizard } from '@libs/shared/data-access-user/src';
import { OCTA_TEMPO } from 'libs/shared/data-access-user/src/core/services/130102/octava-temporal.enum';

/**
 * @class OctavaTemporalComponent
 * @classdesc Esta clase representa el componente Octava Temporal.
 */

interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  selector: 'app-octava-temporal',
  templateUrl: './octava-temporal.component.html',
})
export class OctavaTemporalComponent {
  /**
   * Referencia al componente del asistente (wizard) para controlar su navegación.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * @property {ListaPasosWizard[]} pantallasPasos - Array para almacenar los pasos del wizard.
   */
  pantallasPasos: ListaPasosWizard[] = OCTA_TEMPO;

  /**
   * @property {number} indice - El índice actual del paso.
   */
  indice: number = 1;

  /**
   * @property {DatosPasos} datosPasos - Objeto con la información para el botón de continuar.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pantallasPasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  
  /**
   * Bandera que indica si se deben mostrar los errores del formulario.
   */
  mostrarErrorFormularios: boolean = false;

  /**
   * Alerta que se muestra en caso de error en el registro.
   */
  registroAlert = ERROR_DE_REGISTRO_ALERT;


  constructor(private formularioRegistroService: FormularioRegistroService) {}

  /**
   * Maneja el cambio de índice en el flujo del wizard.
   * Valida los formularios antes de avanzar o retroceder.
   * 
   * @param e - Objeto que contiene la acción y el nuevo valor del índice.
   */
  getValorIndice(e: AccionBoton): void {
    const TODOS_VALIDOS = this.formularioRegistroService.validarTodosFormularios();

    if (!TODOS_VALIDOS) {
      this.mostrarErrorFormularios = true;
      return;
    }

    this.mostrarErrorFormularios = false;
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
