import { ALERTA_DE_APLICACION_REGISTRADA, ERROR_FORMA_ALERT } from '../../constants/programa-seleccionado.enum';
import { AVISO, DatosPasos, ListaPasosWizard } from '@libs/shared/data-access-user/src';
import { Component, ViewChild, inject} from '@angular/core';
import { WizardComponent, WizardService } from '@ng-mf/data-access-user';
import { AccionBoton } from '@libs/shared/data-access-user/src/core/models/260604/aviso-exportacion.model';
import { PANTA_PASOS } from '@libs/shared/data-access-user/src/core/enums/260604/aviso-exportacion.enum';
import { ValidacionDeFormularioService } from '../../services/forma-servicio/validacion-de-formulario.service';

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
  public infoAlert = 'alert-info';

  TEXTOS = AVISO.Aviso;

  public applicacionRegistradaAlerta = ALERTA_DE_APLICACION_REGISTRADA.message;

  public formErrorAlert = ERROR_FORMA_ALERT;

  public mostrarAplicacionRegistradaAlerta: boolean = false;

  public esFormaValido!: boolean;
  public subpestanaSeleccionada!: number;
  public pestanaDosFormularioValido: boolean = false;
  wizardService = inject(WizardService);
  constructor(
    public validacionDeFormularioService: ValidacionDeFormularioService
  ) {
    //
  }

  verificarLaValidezDelFormulario(): boolean {
    return (
      this.validacionDeFormularioService.isFormValid('programaSeleccionadoForm') ?? false
    );
  }

  get programaSeleccionadoFormValid(): boolean {
    return this.validacionDeFormularioService.isFormValid('programaSeleccionadoForm') ?? false;
  }

  public pestanaCambiado(event: number): void {
    if (event) {
      this.subpestanaSeleccionada = event;
    }
  }

    /**
   * @description
   * Método que actualiza el índice del paso seleccionado en el wizard.
   * También controla la navegación hacia adelante o hacia atrás en el wizard.
   * @param {AccionBoton} e - Objeto que contiene la acción (`cont` o `atras`) y el valor del paso.
   */

    getValorIndice(e: AccionBoton): void { 
      this.esFormaValido = this.verificarLaValidezDelFormulario();
      if (e.valor > 0 && e.valor <= this.pantallasPasos.length) {
          if (e.accion === 'cont') {
              this.continuar(e);
          } else if (e.accion === 'ant' && this.esFormaValido) {
              this.indice = e.valor - 1;
              this.datosPasos.indice = e.valor - 1;
              this.wizardComponent.atras();
          } else if (!this.esFormaValido) {
              this.indice = e.valor;
              this.datosPasos.indice = e.valor;
          }
      }
  
    }

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
      console.log('programaSeleccionadoForm value',this.validacionDeFormularioService.getFormValue('programaSeleccionadoForm'));
    } else {
      this.mostrarAplicacionRegistradaAlerta = false;
    }
  }
}
