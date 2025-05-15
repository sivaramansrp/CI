import {
  AVISO,
  DatosPasos,
  ListaPasosWizard,
  WizardComponent,
} from '@libs/shared/data-access-user/src';
import { Component, ViewChild } from '@angular/core';
import { EXPEDICION_CERTIFICADOS_FRONTERA } from '../../constantes/expedicion-certificados-frontera.enum';

/**
 * Interfaz que representa la acción del botón dentro del wizard.
 */
interface AccionBoton {
  /** Acción que se va a ejecutar ('cont' para continuar o cualquier otro valor para retroceder). */
  accion: string;

  /** Valor del paso al que se desea mover. */
  valor: number;
}

/**
 * Componente principal que controla el flujo del wizard para la expedición
 * de certificados de frontera. Administra los pasos, el índice actual
 * y la navegación dentro del componente `WizardComponent`.
 */
@Component({
  selector: 'app-expedicion-certificados-frontera',
  templateUrl: './expedicion-certificados-frontera.component.html',
})
export class ExpedicionCertificadosFronteraComponent {
  /**
   * Referencia al componente hijo `WizardComponent` para controlar la navegación entre pasos.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Lista de pantallas que conforman los pasos del wizard.
   */
  pantallasPasos: ListaPasosWizard[] = EXPEDICION_CERTIFICADOS_FRONTERA;

  /**
   * Mensaje de aviso de privacidad que se muestra al usuario.
   */
  public avisoPrivacidadAlert: string = AVISO.Aviso;

  /**
   * Índice actual del paso activo en el wizard.
   */
  indice = 1;

  /**
   * Datos de configuración para los pasos del wizard (texto de botones, número total de pasos, etc.).
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pantallasPasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Cambia el paso actual del wizard en función de la acción realizada (continuar o retroceder).
   * 
   * @param e Objeto que contiene la acción (`accion`) y el paso (`valor`) al que se desea mover.
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
