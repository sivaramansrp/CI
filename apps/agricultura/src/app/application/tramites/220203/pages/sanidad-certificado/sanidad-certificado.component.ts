import { Component, ViewChild } from '@angular/core';
import { DatosPasos, ListaPasosWizard, WizardComponent } from '@ng-mf/data-access-user';
import { ERROR_FORMA_ALERT, PASOSACUICULTURA, PRIVACY_NOTICE_CONTENT } from '../../constantes/220203/importacion-de-acuicultura.enum';
import { AccionBoton } from '../../models/220203/importacion-de-acuicultura.module';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';

/**
 * @fileoverview
 * Componente principal para la gestión del certificado de sanidad en el trámite de importación de acuicultura.
 * Controla el flujo de pasos del wizard, la navegación entre secciones y la gestión del estado de la sección.
 * Cobertura compodoc 100%: cada propiedad, método y constructor está documentado.
 * @module SanidadCertificadoComponent
 */

/**
 * Componente principal para la gestión del certificado de sanidad en el trámite de importación de acuicultura.
 * Permite navegar entre los pasos del wizard y controla el estado de la sección mediante el store.
 * @component SanidadCertificadoComponent
 * @selector app-sanidad-certificado
 * @templateUrl ./sanidad-certificado.component.html
 */
@Component({
  selector: 'app-sanidad-certificado',
  templateUrl: './sanidad-certificado.component.html',
})
export class SanidadCertificadoComponent {
      esFormaValido: boolean = false;
        /**
       * Contiene el mensaje de error que se muestra cuando la validación de formularios falla.
       */
        public formErrorAlert = ERROR_FORMA_ALERT
        ;
    privacyNoticeContent: string = PRIVACY_NOTICE_CONTENT;
  /**
   * Lista de pasos del wizard, obtenida de las constantes del trámite.
   * @property {ListaPasosWizard[]} pasos
   */
  pasos: ListaPasosWizard[] = PASOSACUICULTURA;

  /**
   * Índice actual del paso seleccionado en el wizard.
   * @property {number} indice
   * @default 1
   */
  indice: number = 1;

  /**
   * Objeto con la configuración de los textos y número de pasos del wizard.
   * @property {DatosPasos} datosPasos
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Guardar',
    txtBtnSig: 'Continuar',
  };

  /**
   * Referencia al componente Wizard para controlar la navegación entre pasos.
   * @property {WizardComponent} wizardComponent
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  @ViewChild('pasoUnoRef') pasoUnoComponent!: PasoUnoComponent;

  /**
   * Método que actualiza el índice del paso actual y navega en el wizard según la acción recibida.
   * Si la acción es 'cont', avanza al siguiente paso; si no, retrocede.
   * @method getValorIndice
   * @param {AccionBoton} e - Objeto que contiene el valor del nuevo índice y la acción a realizar.
   * @returns {void}
   * @step Paso 1: Verifica que el valor del índice esté en el rango permitido.
   * @step Paso 2: Actualiza el índice actual.
   * @step Paso 3: Llama al método correspondiente del wizard para avanzar o retroceder.
   */
  /**
   * Maneja la acción del botón y navega entre los pasos.
   * @method getValorIndice
   * @param {AccionBoton} e - Objeto con la acción (cont/atras) y el valor (índice) del botón.
   */
  getValorIndice(e: AccionBoton): void {
    this.esFormaValido = false;

    // Validar formularios antes de continuar desde el paso uno
    if (this.indice === 1 && e.accion === 'cont') {
      const ISVALID = false;
      if (!ISVALID) {
        this.esFormaValido = !this.validarTodosFormulariosPasoUno();
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
 * Valida todos los formularios del primer paso antes de permitir continuar al siguiente paso.
 */
  private validarTodosFormulariosPasoUno(): boolean {
    if (!this.pasoUnoComponent) {
      return true;
    }
    const ISFORM_VALID_TOUCHED = this.pasoUnoComponent.validarFormularios();
    return ISFORM_VALID_TOUCHED;
  }

}