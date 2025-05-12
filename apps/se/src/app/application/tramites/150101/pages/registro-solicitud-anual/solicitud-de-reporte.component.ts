import { Component } from '@angular/core';
import { DatosPasos } from '@libs/shared/data-access-user/src';
import { ListaPasosWizard } from '@libs/shared/data-access-user/src';
import { REPORTE_ANUAL_PASOS } from '../../enums/registro-solicitud-anual.enum';
import { ViewChild } from '@angular/core';
import { WizardComponent } from '@libs/shared/data-access-user/src';

/**
 * Interfaz que representa la acción de un botón dentro del asistente.
 * 
 * @interface AccionBoton
 * @property {string} accion - Acción a realizar ('cont' para continuar, 'atras' para retroceder).
 * @property {number} valor - Valor del índice del paso al que se desea mover.
 */
interface AccionBoton {
  /**
   * Fecha de accion
   */
  accion: string;
  /**
   * Fecha de valor
   */
  valor: number;
}

/**
 * Componente que representa la solicitud de reporte dentro del asistente de trámites.
 * Este componente utiliza un asistente (wizard) para guiar al usuario a través de los pasos necesarios.
 *
 * @selector app-solicitud-de-reporte
 * @templateUrl ./solicitud-de-reporte.component.html
 * @styleUrl ./solicitud-de-reporte.component.scss
 */
@Component({
  selector: 'app-solicitud-de-reporte',
  templateUrl: './solicitud-de-reporte.component.html',
  styleUrl: './solicitud-de-reporte.component.scss',
})
export class SolicitudDeReporteComponent {
  /**
   * Referencia al componente del asistente (wizard) utilizado en este componente.
   * 
   * @type {WizardComponent}
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Lista de pasos que conforman el asistente para la solicitud de reporte anual.
   * 
   * @type {ListaPasosWizard[]}
   */
  pantallasPasos: ListaPasosWizard[] = REPORTE_ANUAL_PASOS;

  /**
   * Índice del paso actual dentro del asistente.
   *
   * @type {number}
   * @default 1
   */
  indice: number = 1;

  /**
   * @property {number} nroPasos - Número total de pasos en el flujo, calculado a partir de la longitud de `pantallasPasos`.
   * @property {number} indice - Índice actual del paso en el flujo.
   * @property {string} txtBtnAnt - Texto que se muestra en el botón para retroceder al paso anterior.
   * @property {string} txtBtnSig - Texto que se muestra en el botón para avanzar al siguiente paso.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pantallasPasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Método que actualiza el índice del paso actual basado en la acción del botón.
   * 
   * @param {AccionBoton} e - Objeto que contiene la acción ('cont' para continuar, 'atras' para retroceder) y el valor del índice del paso.
   * @returns {void}
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
