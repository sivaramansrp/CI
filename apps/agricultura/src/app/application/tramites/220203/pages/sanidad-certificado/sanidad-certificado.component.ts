import { Component, ViewChild } from '@angular/core';
import { DatosPasos, ListaPasosWizard, SeccionLibStore, WizardComponent } from '@ng-mf/data-access-user';
import { AccionBoton } from '../../models/220203/importacion-de-acuicultura.module';
import { PASOSACUICULTURA } from '../../constantes/220203/importacion-de-acuicultura.enum';

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
   * Constructor del componente.
   * Inicializa el estado de la sección en el store, estableciendo la validez y la activación de la sección.
   * @param {SeccionLibStore} seccionStore Servicio store para el manejo del estado de la sección.
   */
  constructor(private readonly seccionStore: SeccionLibStore) {
    this.seccionStore.establecerFormaValida([false]);
    this.seccionStore.establecerSeccion([true]);
  }

  /**
   * Referencia al componente Wizard para controlar la navegación entre pasos.
   * @property {WizardComponent} wizardComponent
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

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