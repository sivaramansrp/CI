import { Component, ViewChild } from '@angular/core';
import { DatosPasos, ListaPasosWizard, PANTA_PASOS_VALIDAR, WizardComponent } from '@libs/shared/data-access-user/src';

/**
 * Interfaz para definir la estructura de una acción de botón.
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
 *
 * Este componente implementa un asistente (wizard) para guiar al usuario a través
 * del proceso de validación del certificado técnico de Japón.
 *
 * @component
 * @selector app-validar-certificado-tecnico-japon
 * @template ./validar-certificado-tecnico-japon.component.html
 */
@Component({
  selector: 'app-validar-certificado-tecnico-japon',
  templateUrl: './validar-certificado-tecnico-japon.component.html',
})
export class ValidarCertificadoTecnicoJaponComponent {

  /**
   * Lista de pasos del asistente para la validación.
   * ValidarCertificadoTecnicoJaponComponent
   */
  pasosSolicitar: ListaPasosWizard[] = PANTA_PASOS_VALIDAR;

  /**
   * Índice del paso actual en el asistente.
   * ValidarCertificadoTecnicoJaponComponent
   */
  indice: number = 1;

  /**
   * Referencia al componente del asistente (WizardComponent).
   * ValidarCertificadoTecnicoJaponComponent
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Datos para la configuración de los pasos del asistente.
   * ValidarCertificadoTecnicoJaponComponent
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasosSolicitar.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Obtiene el valor del índice y realiza la acción correspondiente en el asistente.
   * ValidarCertificadoTecnicoJaponComponent
   * Objeto que contiene la acción y el valor del botón.
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