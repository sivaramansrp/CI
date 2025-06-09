import { ALERTA_DE_APLICACION_REGISTRADA, ERROR_FORMA_ALERT } from '../../constants/programa-seleccionado.enum';
import { Component, ViewChild, inject } from '@angular/core';
import { DatosPasos, ListaPasosWizard, WizardComponent } from '@libs/shared/data-access-user/src';
import { AVISO } from '@libs/shared/data-access-user/src';
import { AccionBoton } from '@ng-mf/data-access-user';
import { PANTA_PASOS } from '@ng-mf/data-access-user';
import { ValidacionDeFormularioService } from '../../services/forma-servicio/validacion-de-formulario.service';
import { WizardService } from '@ng-mf/data-access-user';

/**
 * @description
 * Componente principal para gestionar el flujo de pasos en un wizard.
 * Este componente permite navegar entre diferentes pasos utilizando un componente de wizard.
 */
@Component({
  selector: 'app-pantallas',
  templateUrl: './pantallas.component.html',
})
export class PantallasComponent {
  /**
   * @description
   * Lista de pasos del wizard cargados desde una constante.
   * Cada paso contiene información relevante para el flujo del wizard.
   */
  pantallasPasos: ListaPasosWizard[] = PANTA_PASOS;

  /**
   * @description
   * Índice actual del paso seleccionado en el wizard.
   * Por defecto, el índice inicial es `1`.
   */
  indice: number = 1;

  /**
   * @description
   * Referencia al componente del wizard para controlar la navegación entre pasos.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * @description
   * Datos relacionados con los pasos del wizard, como el número total de pasos,
   * el índice actual y los textos de los botones de navegación.
   * @property {number} nroPasos - Número total de pasos en el wizard.
   * @property {number} indice - Índice actual del paso seleccionado.
   * @property {string} txtBtnAnt - Texto del botón para retroceder.
   * @property {string} txtBtnSig - Texto del botón para avanzar.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pantallasPasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * @description
   * Clase CSS para mostrar alertas de información.
   */
  public infoAlert = 'alert-info';

  /**
   * @description
   * Texto de aviso cargado desde una constante.
   */
  TEXTOS = AVISO.Aviso;

  /**
   * @description
   * Mensaje de alerta para una aplicación registrada.
   */
  public applicacionRegistradaAlerta = ALERTA_DE_APLICACION_REGISTRADA.message;

  /**
   * @description
   * Mensaje de error para formularios incompletos.
   */
  public formErrorAlert = ERROR_FORMA_ALERT;

  /**
   * @description
   * Indica si se debe mostrar la alerta de aplicación registrada.
   */
  public mostrarAplicacionRegistradaAlerta: boolean = false;

  /**
   * @description
   * Indica si el formulario es válido.
   */
  public esFormaValido!: boolean;

  /**
   * @description
   * Índice de la subpestaña seleccionada.
   */
  public subpestanaSeleccionada!: number;

  /**
   * @description
   * Indica si el formulario de la pestaña dos es válido.
   */
  public pestanaDosFormularioValido: boolean = false;

  /**
   * @description
   * Servicio del wizard para manejar cambios de índice.
   */
  wizardService = inject(WizardService);

     /**
  * compo doc
  * Mensaje relacionado con el aviso de privacidad simplificado.
  * 
  * @type {string}
  * @memberof PantallasComponent
  */
  public avisoPrivacidadAlert: string = AVISO.Aviso;
 /**
  * compo doc
  * variable para contener el índice de la pestaña seleccionada
  * @type {number}
  */
  public indiceDePestanaSeleccionada: number = 1;
  /**
   * @description
   * Constructor del componente.
   * Inyecta el servicio de validación de formularios.
   * @param validacionDeFormularioService Servicio para manejar la validación de formularios.
   */
  constructor(
    public validacionDeFormularioService: ValidacionDeFormularioService
  ) {
    //
  }

  /**
   * @description
   * Método que verifica la validez del formulario.
   * @returns {boolean} Retorna `true` si el formulario es válido, de lo contrario `false`.
   */
  verificarLaValidezDelFormulario(): boolean {
    return (
      this.validacionDeFormularioService.isFormValid('programaSeleccionadoForm') ?? false
    );
  }

  /**
   * @description
   * Getter que verifica si el formulario del programa seleccionado es válido.
   * @returns {boolean} Retorna `true` si el formulario es válido, de lo contrario `false`.
   */
  get programaSeleccionadoFormValid(): boolean {
    return this.validacionDeFormularioService.isFormValid('programaSeleccionadoForm') ?? false;
  }

  /**
   * @description
   * Método que actualiza el índice de la subpestaña seleccionada.
   * @param {number} event Índice de la subpestaña seleccionada.
   */
  public pestanaCambiado(event: number): void {
    if (event) {
      this.subpestanaSeleccionada = event;
    }
  }

  /**
   * @description
   * Método que actualiza el índice del paso seleccionado en el wizard.
   * También controla la navegación hacia adelante o hacia atrás en el wizard.
   * @param {AccionBoton} e Objeto que contiene la acción (`cont` o `ant`) y el valor del paso.
   */
  getValorIndice(e: AccionBoton): void {
     if (e.valor > 0 && e.valor <= this.pantallasPasos.length) {
      this.indice = e.valor;
      this.datosPasos.indice = e.valor;

      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
      if (e.valor!==1) {
        this.indiceDePestanaSeleccionada=1;
      }
    }
  }

  /**
   * @description
   * Método que controla la acción de continuar en el wizard.
   * Actualiza el índice y muestra alertas según la validez del formulario.
   * @param {AccionBoton} e Objeto que contiene la acción y el valor del paso.
   */
  public continuar(e: AccionBoton): void {
    if (this.subpestanaSeleccionada === 2 && this.programaSeleccionadoFormValid && !this.esFormaValido) {
      this.mostrarAplicacionRegistradaAlerta = true;
      this.pestanaDosFormularioValido = true;
    } else if (this.esFormaValido) {
      this.pestanaDosFormularioValido = true;
      this.indice = e.valor + 1;
      this.datosPasos.indice = e.valor + 1;
      this.wizardService.cambio_indice(this.datosPasos.indice);
      this.wizardComponent.siguiente();
    } else {
      this.mostrarAplicacionRegistradaAlerta = false;
    }
  }
}
