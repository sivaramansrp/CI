import { Component, ViewChild } from '@angular/core';
import { DatosPasos, ListaPasosWizard, PASOS,WizardComponent } from '@libs/shared/data-access-user/src';

/**
 * Interfaz para definir la estructura de una acción de botón dentro del asistente.
 */
interface AccionBoton {
  /**
   * Tipo de acción del botón (por ejemplo, 'cont' para continuar, 'ant' para anterior).
   */
  accion: string;
  
  /**
   * Valor asociado a la acción del botón (por ejemplo, el índice del paso).
   */
  valor: number;
}

/**
 * Componente para validar el certificado técnico de Japón.
 * Este componente implementa un asistente (wizard) que guía al usuario en el proceso
 * de validación del certificado.
 *
 */
@Component({
  selector: 'app-validar-certificado-tecnico-japon',
  templateUrl: './validar-certificado-tecnico-japon.component.html',
})
export class ValidarCertificadoTecnicoJaponComponent {

  /**
   * Referencia al componente de pestañas del solicitante.
   */
  @ViewChild('solicitanteTabs') solicitanteTabsComponent: { validarCamposObligatorios: () => boolean } | undefined;

  /**
   * Lista de pasos del asistente para la validación del certificado.
   */
  pasosSolicitar: ListaPasosWizard[] = PASOS;

  /**
   * Índice del paso actual en el asistente.
   */
  indice: number = 1;

  /**
   * Índice de la pestaña activa.
   */
  tabIndex: number = 1;

  /**
   * Referencia al componente del asistente (WizardComponent).
   * Permite la navegación entre los pasos del asistente.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Configuración de los pasos del asistente.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasosSolicitar.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Indica si se muestra el formulario de mercancía.
   */
  showMercanciaForm: boolean = true;

  /**
   * Captura el índice de la pestaña seleccionada.
   */
  capturarTapIndice: number = 1;

  /**
   * Obtiene el valor del índice y realiza la acción correspondiente en el asistente.
   *
   */
  getValorIndice(e: AccionBoton): void {
    if (e.accion === 'cont' && this.solicitanteTabsComponent) {
      if (!this.solicitanteTabsComponent.validarCamposObligatorios()) {
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


  /**
   * Controla la visibilidad del formulario de mercancía y almacena el índice de la pestaña activa.
   *
   */
  isModificar($event: boolean, tapIndex: number): void {
    this.showMercanciaForm = $event;
    this.capturarTapIndice = tapIndex;
  }
}
