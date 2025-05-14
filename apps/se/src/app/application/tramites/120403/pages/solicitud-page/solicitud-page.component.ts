import {
  AVISO,
  DatosPasos,
} from '@ng-mf/data-access-user';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PASOS } from '@ng-mf/data-access-user';

import { WizardComponent } from '@ng-mf/data-access-user';

/**
 * Texto de alerta para terceros.
 */
const TERCEROS_TEXTO_DE_ALERTA =
  'La solicitud ha quedado registrada con el número temporal 202757598 Éste no tiene validez legal y sirve solamente para efectos de identificar tu solicitud. Un folio oficial le será asignado a la solicitud al momento en que ésta sea firmada.';

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
})
export class SolicitudPageComponent implements OnInit {
  /**
   * Texto del aviso de privacidad.
   */
  avisoPrivacidad = AVISO.Aviso;

  /**
   * Datos recibidos del componente hijo.
   */
  datos!: number;

  /**
   * Texto de alerta para terceros.
   */
  TEXTO_DE_ALERTA: string = TERCEROS_TEXTO_DE_ALERTA;

  /**
   * Lista de pasos del asistente.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Índice del paso actual.
   */
  indice: number = 1;

  /**
   * Indica si se debe mostrar la alerta.
   */
  alerta: boolean = false;

  /**
   * Referencia al componente del asistente.
   * Permite interactuar con el asistente para avanzar o retroceder entre los pasos.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Datos de los pasos del asistente.
   * Contiene información sobre el número de pasos, el índice actual y los textos de los botones.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Datos de los pasos del asistente con configuración personalizada.
   */
  datoPaso: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: '',
    txtBtnSig: 'Continuar',
  };

  /**
   * Método que se ejecuta al inicializar el componente.
   * Configura los datos iniciales del asistente.
   */
  ngOnInit(): void {
    this.receiveData(1);
  }

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
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }

  /**
   * Realiza acciones específicas al recibir un índice de acción.
   * @param e Acción del botón.
   */
  getValorIndices(e: AccionBoton): void {
    delete (this.datoPaso as { txtBtnAnt?: string }).txtBtnAnt;
    this.alerta = true;
  }

  /**
   * Recibe datos del componente hijo.
   * @param data Datos recibidos.
   */
  receiveData(data: number): void {
    this.datos = data;
  }
}