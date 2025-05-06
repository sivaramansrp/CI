import {
  AVISO,
  DatosPasos,
  ListaPasosWizard,
  WizardComponent,
} from '@libs/shared/data-access-user/src';
import { Component, ViewChild } from '@angular/core';
import { EXPEDICION_CERTIFICADOS_FRONTERA } from '../../constantes/expedicion-certificados-frontera.enum';

/**
 * ## AccionBoton
 *
 * Interfaz que define la estructura de una acción realizada sobre un botón.
 */
interface AccionBoton {
  /**
   * ## accion
   *
   * Tipo de acción realizada (por ejemplo, 'cont' para continuar o 'atras' para retroceder).
   */
  accion: string;
  /**
   * ## valor
   *
   * Valor numérico asociado a la acción (por ejemplo, el índice del paso).
   */
  valor: number;
}

@Component({
  selector: 'app-expedicion-certificados-frontera',
  templateUrl: './expedicion-certificados-frontera.component.html',
})
export class ExpedicionCertificadosFronteraComponent {
  /**
   * ## wizardComponent
   *
   * Referencia al componente `WizardComponent` en la plantilla.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  pantallasPasos: ListaPasosWizard[] = EXPEDICION_CERTIFICADOS_FRONTERA;

  public avisoPrivacidadAlert: string = AVISO.Aviso;

   /**
   * ## indice
   * 
   * Índice actual del paso en el asistente.
   */
  indice = 1;

 /**
   * ## datosPasos
   * 
   * Datos generales para la navegación entre pasos.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pantallasPasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * ## getValorIndice
   * 
   * Actualiza el índice del paso según la acción del botón.
   * 
   * ### Parámetros
   * - **e**: `AccionBoton`  
   *   Objeto que contiene la acción y el valor del botón.
   * 
   * ### Funcionalidad
   * Si el valor es válido, actualiza el índice y avanza o retrocede en el asistente según la acción.
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
