import { AccionBoton, ListaPasosWizard, } from '../../models/220201/certificado-zoosanitario.model';
import { AlertComponent, BtnContinuarComponent, DatosPasos, WizardComponent } from '@ng-mf/data-access-user';
import { Component, ViewChild } from '@angular/core';
import { ERROR_FORMA_ALERT, MENSAJE_DE_EXITO_ETAPA_UNO, PASOS, PRIVACY_NOTICE_CONTENT } from '../../constantes/certificado-zoosanitario.enum';
import { CommonModule } from '@angular/common';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';

/**
 * @fileoverview Componente principal para el formulario de certificado zoosanitario.
 * Este componente gestiona el flujo del formulario a través de un asistente (wizard),
 * controlando la navegación entre los pasos y la información mostrada en cada uno.
 * @module ZoosanitarioPageComponent
 */

/**
 * Componente principal para el formulario de certificado zoosanitario.
 * Gestiona el flujo del wizard, la navegación entre pasos y la visualización de mensajes.
 * @component ZoosanitarioPageComponent
 * @selector app-zoosanitario-page
 * @templateUrl ./zoosanitario-page.component.html
 * @styleUrls ./zoosanitario-page.component.scss
 */
@Component({
  selector: 'app-zoosanitario-page',
  templateUrl: './zoosanitario-page.component.html',
  standalone: true,
  imports: [WizardComponent, CommonModule, PasoDosComponent, PasoUnoComponent, PasoTresComponent, BtnContinuarComponent, AlertComponent],
})
export class ZoosanitarioPageComponent {
  /**
   * Array de pasos del asistente.
   * @property {ListaPasosWizard[]} pasos - Lista de los pasos del asistente, incluyendo título y componente asociado.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Título del mensaje principal.
   * @property {string | null} tituloMensaje - Título que se muestra en la parte superior del formulario.
   */
  tituloMensaje: string | null = 'Captura del certificado zoosanitario para importación';

  /**
   * Componente Wizard.
   * @property {WizardComponent} wizardComponent - Referencia al componente Wizard para controlar la navegación.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
 * Referencia al componente hijo `PasoUnoComponent` para acceder a sus métodos de validación de formularios.
 * const isValid = this.pasoUnoComponent.validateForms();
 * const formsValidity = this.pasoUnoComponent.getAllFormsValidity();
 */
  @ViewChild('pasoUnoRef') pasoUnoComponent!: PasoUnoComponent;

  /**
   * Índice actual del paso.
   * @property {number} indice - Índice del paso actual en el que se encuentra el usuario.
   */
  indice: number = 1;
  /**
 * Contiene el mensaje de error que se muestra cuando la validación de formularios falla.
 */
  public formErrorAlert = ERROR_FORMA_ALERT;
  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  /**
   * Datos para la configuración de los botones del asistente.
   * @property {DatosPasos} datosPasos - Configuración para los botones "Anterior" y "Siguiente".
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Guardar',
    txtBtnSig: 'Continuar',
  };

  /**
   * Mensaje de éxito para el primer paso.
   * @property {string} mensajeDeTextoDeExito - Mensaje que se muestra si el primer paso se completa con éxito.
   */
  mensajeDeTextoDeExito: string = MENSAJE_DE_EXITO_ETAPA_UNO;
/**
 * Indica si el formulario actual es válido o no.
 *
 * @property esFormaValido
 * @type {boolean}
 * @default false
 * @example
 * if (this.esFormaValido) {
 *   // Continuar con el envío
 * }
 */
  esFormaValido: boolean = false;
   /**
     * Contenido del aviso de privacidad utilizado en el componente.
     * @public
     * @readonly
     * @type {string}
     * @memberof SanidadCertificadoComponent
     */
    readonly PRIVACY_NOTICE_CONTENT: string = PRIVACY_NOTICE_CONTENT;
  

  /**
   * Constructor del componente. Inicializa los pasos del asistente.
   * @method constructor
   */
  constructor() {
    this.pasos = PASOS;
  }

  /**
   * Maneja la acción del botón y navega entre los pasos.
   * @method getValorIndice
   * @param {AccionBoton} e - Objeto con la acción (cont/atras) y el valor (índice) del botón.
   */
  getValorIndice(e: AccionBoton): void {
    this.esFormaValido = false;

    // Validar formularios antes de continuar desde el paso uno
    if (this.indice === 1 && e.accion === 'cont') {
      const ISVALID = this.validarTodosFormulariosPasoUno();
      if (!ISVALID) {
        this.esFormaValido = true;
        return; // Detener ejecución si los formularios son inválidos
      }
    }
    // Calcular el nuevo índice basado en la acción
    let indiceActualizado = e.valor;
    if (e.accion === 'cont') {
      indiceActualizado = e.valor + 1;
    } else if (e.accion === 'ant') {
      indiceActualizado = e.valor - 1;
    }

    // Validar que el nuevo índice esté dentro de los límites permitidos
    if (indiceActualizado > 0 && indiceActualizado <= this.pasos.length) {

      // Actualizar el índice y datosPasos
      this.indice = indiceActualizado;
      this.datosPasos.indice = indiceActualizado;

      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else if (e.accion === 'ant') {
        this.wizardComponent.atras();
      }
    }
  }

  /**
   * Cambia el título del mensaje según la pestaña seleccionada.
   * @method enTabChange
   * @param {number} selectedTab - El índice de la pestaña seleccionada.
   */
  enTabChange(selectedTab: number): void {
    switch (selectedTab) {
      case 1:
        this.tituloMensaje = 'Captura del certificado zoosanitario para importación';
        break;
      case 2:
        this.tituloMensaje =
          'Captura del certificado zoosanitario para importación';
        break;
      case 3:
        this.tituloMensaje = 'Captura del certificado zoosanitario para importación';
        break;
      case 4:
        this.tituloMensaje = 'Captura del certificado zoosanitario para importación';
        break;
      case 5:
        this.tituloMensaje =
          'Captura del certificado zoosanitario para importación';
        break;
      default:
        this.tituloMensaje = 'Captura del certificado zoosanitario para importación';
        break;
    }
  }
  /**
 * Valida todos los formularios del primer paso antes de permitir continuar al siguiente paso.
 */
  private validarTodosFormulariosPasoUno(): boolean {
    if (!this.pasoUnoComponent) {
      return true;
    }
    const ISFORM_VALID_TOUCHED = this.pasoUnoComponent.validarFormularios();
    if (!ISFORM_VALID_TOUCHED) {
      return false;
    }
    return true;
  }
}