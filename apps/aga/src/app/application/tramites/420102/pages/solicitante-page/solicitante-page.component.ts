import { AccionBoton, DatosPasos, ListaPasosWizard, Notificacion, VistaEmergente, WizardComponent } from '@ng-mf/data-access-user';
import { Component } from '@angular/core';
import { PASOS } from '../../constantes/concluir-relacion.enum';
import { ViewChild } from '@angular/core';

/**
 * @class SolicitantePageComponent
 * @description Componente que gestiona la página principal del solicitante en el trámite 420102.
 * Este componente incluye un asistente (wizard) para navegar entre los pasos del trámite
 * y manejar la interacción con el usuario.
 */
@Component({
  selector: 'app-solicitante-page',
  templateUrl: './solicitante-page.component.html',
  styleUrl: './solicitante-page.component.scss',
})
export class SolicitantePageComponent {
  /**
   * @property {WizardComponent} wizardComponent
   * @description Referencia al componente del asistente (wizard) para manejar la navegación entre pasos.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * @property {number} indice
   * @description Índice actual del paso seleccionado en el asistente.
   */
  indice: number = 1;

  /**
   * @property {VistaEmergente} vistaEmergente
   * @description Configuración para la vista emergente utilizada en la página.
   */
  vistaEmergente: VistaEmergente = {
    abierto: true,
    indice: 1,
  };

  /**
   * @property {ListaPasosWizard[]} pasos
   * @description Lista de pasos del asistente (wizard) configurados para el trámite.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * @property {boolean} continueTrigger
   * @description Indicador para habilitar o deshabilitar el botón de continuar en el asistente.
   */
  continueTrigger: boolean = false;

  /**
   * @property {DatosPasos} datosPasos
   * @description Configuración de los datos de los pasos del asistente, incluyendo textos de los botones.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * @property {Notificacion} nuevaAlertaNotificacion
   * @description Configuración para la notificación de alerta mostrada al usuario.
   */
  public nuevaAlertaNotificacion: Notificacion = {
    tipoNotificacion: 'alert',
    categoria: 'danger',
    modo: 'action',
    titulo: 'Confirmar',
    mensaje: '¿Deseas terminar relación con el proveedor?',
    cerrar: false,
    tiempoDeEspera: 2000,
    txtBtnAceptar: 'Aceptar',
    txtBtnCancelar: 'Cancelar',
  };

  /**
   * @method getValorIndice
   * @description Método para actualizar el índice del paso actual en el asistente (wizard).
   * También maneja la navegación hacia adelante o hacia atrás según la acción seleccionada.
   *
   * @param {AccionBoton} e - Objeto que contiene el valor del índice y la acción a realizar ('cont' o 'atras').
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
