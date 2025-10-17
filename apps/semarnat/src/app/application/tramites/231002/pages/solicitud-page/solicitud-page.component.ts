import {
  AlertComponent,
  BtnContinuarComponent,
  DatosPasos,
  ListaPasosWizard,
  Notificacion,
  NotificacionesComponent,
  WizardComponent,
} from '@ng-mf/data-access-user';
import { Component, ViewChild } from '@angular/core';
import { PAGO_DE_DERECHOS, PASOS } from '../../constantes/aviso-retorno.enum';
import { CommonModule } from '@angular/common';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';

/**
 * Interfaz que define la estructura de un objeto para manejar acciones de botones en el componente.
 */
export interface AccionBoton {
  accion: string;
  valor: number;
}

/**
 * Constante que representa el índice del primer paso en el proceso de wizard.
 */
const PASO_UNO = 1;
/**
 * Componente que gestiona el proceso de aviso de retorno mediante un sistema de pasos (wizard).
 * Controla la navegación entre diferentes pasos del proceso y maneja la lógica relacionada con:
 * - Consulta de estados
 * - Carga inicial de datos
 * - Navegación entre pasos
 * - Gestión de suscripciones
 */
@Component({
  selector: 'app-solicitud-page',
  standalone: true,
  imports: [
    CommonModule,
    WizardComponent,
    PasoUnoComponent,
    PasoDosComponent,
    BtnContinuarComponent,
    AlertComponent,
    NotificacionesComponent,
  ],
  templateUrl: './solicitud-page.component.html',
})
export class SolicitudPageComponent {
  /**
   * Contiene el mensaje de error que se muestra cuando la validación de formularios falla.
   */
  public formErrorAlert = `<div class="d-flex justify-content-center text-center">
  <div>
    <div class="col-md-12">
      Faltan campos por capturar.
    </div>
  </div>
</div>
`;
  /**
   * Notificación que se puede utilizar para mostrar mensajes emergentes (toastr).
   * Null cuando no hay notificación nueva.
   */
  public nuevaNotificacion: Notificacion | null = null;

  /**
   * Notificación tipo banner que se muestra tras operaciones exitosas.
   */
  public alertaNotificacion!: Notificacion;

  /**
   * Indica si el formulario actual es válido.
   */
  esFormaValido: boolean = true;
  /**
   * Lista de pasos configurados para el wizard.
   * @type {ListaPasosWizard[]}
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Referencia al componente wizard para controlar la navegación entre pasos.
   * @type {WizardComponent}
   */
  @ViewChild('wizard', { static: false }) wizardComponent!: WizardComponent;


  /**
   * Referencia al componente del primer paso para validar formularios.
   */
  @ViewChild(PasoUnoComponent) pasoUno!: PasoUnoComponent;

  /**
   * Clase CSS para estilizar alertas informativas.
   * @type {string}
   */
  public infoAlert = 'alert-info';

  /**
   * Textos estáticos relacionados con el pago de derechos.
   * @type {typeof PAGO_DE_DERECHOS}
   */
  TEXTOS = PAGO_DE_DERECHOS;

  /**
   * Índice del paso actual en el wizard.
   * @type {number}
   */
  indice: number = 1;

  /**
   * Datos de configuración para el componente de pasos.
   * @type {DatosPasos}
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Maneja la navegación entre pasos del wizard.
   * @param e Objeto con información de la acción del botón
   */
  getValorIndice(e: AccionBoton): void {
    if (this.indice === PASO_UNO) {
      const FORM_VALIDO = this.pasoUno?.validarTodosLosFormularios();
      this.esFormaValido = FORM_VALIDO;
      if (!FORM_VALIDO) {
        this.datosPasos.indice = this.indice;
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
        return;
      }
      console.log('aqui');
    } else {
      if (e.valor > 0 && e.valor < 5) {
        this.indice = e.valor;
        this.actualizarDatosPasos();
        if (e.accion === 'cont') {
          this.wizardComponent.siguiente();
        } else {
          this.wizardComponent.atras();
        }
      }
    }
  }

  /**
   * Actualiza los datos del componente de pasos con el índice actual y el número total de pasos.
   */
  actualizarDatosPasos(): void {
    this.datosPasos = {
      nroPasos: this.pasos.length,
      indice: this.indice,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar',
    };
  }
}
