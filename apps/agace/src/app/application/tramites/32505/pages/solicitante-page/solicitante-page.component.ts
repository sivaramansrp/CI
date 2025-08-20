import { BtnContinuarComponent, DatosPasos, ListaPasosWizard, WizardComponent } from '@ng-mf/data-access-user';
import { Component, ViewChild } from '@angular/core';
import {
  Notificacion,
  NotificacionesComponent,
} from '@libs/shared/data-access-user/src';
import { PASOS } from './../../constants/avios-procesos.enum';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
interface AccionBoton {
  accion: string;
  valor: number;
}
@Component({
  selector: 'app-solicitante-page',
  templateUrl: './solicitante-page.component.html',
  styleUrl: './solicitante-page.component.scss',
  standalone: true,
  imports: [WizardComponent,PasoUnoComponent,BtnContinuarComponent,PasoTresComponent,NotificacionesComponent],
})
export class SolicitantePageComponent {
  /**
   * Lista de pasos del wizard.
   * 
   * Esta propiedad contiene un array de objetos `ListaPasosWizard` que representan los pasos del wizard.
   */
  pasos: Array<ListaPasosWizard> = PASOS;

  /**
   * Índice del paso actual en el wizard.
   * 
   * Esta propiedad indica el índice del paso actual en el wizard, comenzando desde 1.
   */
  indice: number = 1;


  /**
   * Referencia al componente del wizard.
   * 
   * Esta propiedad utiliza `@ViewChild` para obtener una referencia al componente `WizardComponent`.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Referencia al componente paso uno.
   */
  @ViewChild(PasoUnoComponent) pasoUnoComponent!: PasoUnoComponent;

  /**
   * Referencia al componente de notificaciones.
   */
  @ViewChild(NotificacionesComponent) notificacionesComponent!: NotificacionesComponent;

  /**
   * Notificación para confirmaciones.
   */
  public confirmacionNotificacion!: Notificacion;

  /**
   * Datos de los pasos del wizard.
   * 
   * Esta propiedad contiene un objeto `DatosPasos` que almacena información sobre el número de pasos,
   * el índice actual, y los textos de los botones "Anterior" y "Continuar".
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };


  /**
  * Método para seleccionar una pestaña específica en el wizard.
  * 
  * @param {number} i - El índice de la pestaña a seleccionar.
  */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
  /**
   * Método para obtener el valor del índice y actualizar el wizard.
   * 
   * @param {AccionBoton} e - El objeto que contiene la acción y el valor del índice.
   */
  getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 6) {
      if (e.accion === 'cont' && this.indice === 1 && this.pasoUnoComponent?.indice === 2) {
        this.confirmacionNotificacion = {
          tipoNotificacion: 'alert',
          categoria: 'danger',
          modo: 'action',
          titulo: '',
          mensaje: 'Debes agregar Datos del Aviso',
          cerrar: false,
          tiempoDeEspera: 2000,
          txtBtnAceptar: 'Aceptar',
          txtBtnCancelar: ''
        };
      } else {
        this.proceedWithNavigation(e);
      }
    }
  }

  /**
   * Maneja la respuesta de confirmación del modal.
   * 
   * @param {boolean} respuesta - Respuesta del usuario (true o false).
   */
  manejarConfirmacion(respuesta: boolean): void {
    if (respuesta) {
      const EVENT: AccionBoton = { accion: 'cont', valor: this.indice + 1 };
      this.proceedWithNavigation(EVENT);
    }
    // If false, do nothing - stay on current tab
  }

  /**
   * Método para proceder con la navegación del wizard.
   * 
   * @param {AccionBoton} e - El objeto que contiene la acción y el valor del índice.
   */
  private proceedWithNavigation(e: AccionBoton): void {
    this.indice = e.valor;
    this.datosPasos.indice = this.indice;
    if (e.accion === 'cont') {
      this.wizardComponent.siguiente();
    } else {
      this.wizardComponent.atras();
    }
  }


}
