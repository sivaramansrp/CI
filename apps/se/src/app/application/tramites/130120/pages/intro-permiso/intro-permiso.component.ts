import { AccionBoton, AlertComponent, BtnContinuarComponent, Notificacion, NotificacionesComponent } from "@ng-mf/data-access-user";
import { Component, ViewChild } from '@angular/core';
import { ALERTA } from "@libs/shared/data-access-user/src/tramites/constantes/mensajes-error-formularios";
import { CommonModule } from "@angular/common";
import { DatosPasos } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PASOS_CUATRO_STEPS } from '@ng-mf/data-access-user';
import { PasoCuatroComponent } from "../paso-cuatro/paso-cuatro.component";
import { PasoDosComponent } from "../paso-dos/paso-dos.component";
import { PasoUnoComponent } from "../paso-uno/paso-uno.component";
import { WizardComponent } from '@ng-mf/data-access-user';

/**
 * Componente contenedor para el flujo de pasos del trámite.
 *
 * Este componente administra la navegación y visualización de los pasos del trámite,
 * integrando el componente de wizard y los pasos individuales.
 *
 * @componente
 * @selector app-intro-permiso
 * @template ./intro-permiso.component.html
 * @estilo ./intro-permiso.component.scss
 * @standalone
 * @importa WizardComponent, BtnContinuarComponent, PasoUnoComponent, PasoDosComponent, PasoTresComponent, PasoCuatroComponent
 *
 * @notas
 * Utiliza el componente Wizard para gestionar la navegación entre los pasos y mantiene el estado del índice actual.
 */
@Component({
  selector: 'app-intro-permiso',
  templateUrl: './intro-permiso.component.html',
  styleUrl: './intro-permiso.component.scss',
  imports: [CommonModule, WizardComponent, BtnContinuarComponent, PasoUnoComponent, PasoDosComponent, PasoCuatroComponent, AlertComponent, NotificacionesComponent],
  standalone: true,
})
export class IntroPermisoComponent {

  /**
     * Referencia al componente del primer paso.
     * Permite acceder a los métodos y propiedades del paso uno.
     */
    @ViewChild('pasoUno') pasoUnoComponent!: PasoUnoComponent;

  /**
   * Índice actual del paso activo en el wizard.
   * @type {number}
   */
  indice = 1;

  /**
   * Folio temporal de la solicitud.
   * Se utiliza para mostrar el folio en la notificación de éxito.
   */
  public alertaNotificacion!: Notificacion;

  /**
 * Indica si el formulario es válido.
 */
  esValido = true;

  /**
  * Clase CSS para mostrar una alerta de error.
  */
  infoError = 'alert-danger';

  /**
    * Mensaje de alerta a mostrar en caso de error.
    */
  ALERTA = ALERTA;


  /**
   * Lista de pasos configurados para el wizard.
   * @type {ListaPasosWizard[]}
   */
  pasos: ListaPasosWizard[] = PASOS_CUATRO_STEPS;

  /**
   * Referencia al componente Wizard para controlar la navegación.
   * @type {WizardComponent}
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Datos de configuración para los pasos del wizard.
   * @type {DatosPasos}
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Cambia el índice del paso actual y navega en el wizard según la acción del botón.
   *
   * @param e - Objeto que contiene la acción y el valor del índice.
   */
  getValorIndice(e: AccionBoton): void {
    if (this.indice === 1) {
    const FORM_VALIDO = this.pasoUnoComponent?.validarFormulario() ?? false;
    this.esValido = FORM_VALIDO;

    if (!this.esValido) {
      this.datosPasos.indice = 1;
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
      return;
    }
  }

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