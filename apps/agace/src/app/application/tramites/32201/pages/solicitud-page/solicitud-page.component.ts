import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  AlertComponent,
  AVISO,
  BtnContinuarComponent,
  DatosPasos,
  ListaPasosWizard,
  PASOS,
  SolicitanteComponent,
  WizardComponent,
} from '@ng-mf/data-access-user';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';

/**
 * Texto de alerta para terceros.
 * Este texto se muestra al usuario cuando se registra una solicitud.
 */
const TERCEROS_TEXTO_DE_ALERTA =
  'La solicitud ha quedado registrada con el número temporal 202757598 Éste no tiene validez legal y sirve solamente para efectos de identificar tu solicitud. Un folio oficial le será asignado a la solicitud al momento en que ésta sea firmada.';

/**
 * Interfaz que define la estructura de una acción de botón.
 */
interface AccionBoton {
  /**
   * La acción que se realizará (por ejemplo, "cont" para continuar o "atras" para retroceder).
   */
  accion: string;

  /**
   * El valor asociado a la acción (por ejemplo, el índice del paso).
   */
  valor: number;
}

/**
 * Componente que representa la página de solicitud.
 * Este componente gestiona el flujo de pasos del asistente y muestra información relevante al usuario.
 */
@Component({
  templateUrl: './solicitud-page.component.html',
  styles: ``,
  standalone: true,
  imports: [
    WizardComponent,
    CommonModule,
    BtnContinuarComponent,
    FormsModule,
    PasoUnoComponent,
    SolicitanteComponent,
    PasoDosComponent,
    PasoTresComponent,
    AlertComponent,
    ReactiveFormsModule,
  ],
})
export class SolicitudPageComponent {
  /**
   * Texto de alerta que se muestra al usuario.
   */
  TEXTO_DE_ALERTA: string = TERCEROS_TEXTO_DE_ALERTA;

  /**
   * Lista de pasos del asistente.
   * Contiene la configuración de cada paso del asistente.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Índice del paso actual en el asistente.
   */
  indice: number = 1;

  /**
   * Referencia al componente del asistente.
   * Se utiliza para controlar el flujo de pasos (siguiente, anterior, etc.).
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Aviso de privacidad simplificado.
   * Este texto se utiliza para mostrar el aviso de privacidad al usuario.
   */
  TEXTOS = AVISO.Aviso;

  /**
   * Clase CSS para aplicar estilo a las alertas de información.
   */
  public infoAlert = 'alert-info';

  /**
   * Datos de configuración de los pasos del asistente.
   * Incluye el número de pasos, el índice actual y los textos de los botones.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Constructor del componente.
   */
  constructor() {
    // Constructor no vacío para evitar el error de ESLint.
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
   * Actualiza el índice del paso actual y navega al siguiente o al anterior paso según la acción.
   * 
   * @param e Acción del botón, que incluye el índice y la acción a realizar.
   */
  getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente(); // Navega al siguiente paso.
      } else {
        this.wizardComponent.atras(); // Navega al paso anterior.
      }
    }
  }
}
