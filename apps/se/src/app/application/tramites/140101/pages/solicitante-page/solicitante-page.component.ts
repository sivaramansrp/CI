import { Component, ViewChild } from '@angular/core';

import { AVISO, FIRMAR, ListaPasosWizard } from '@libs/shared/data-access-user/src';
import { AccionBoton } from '@libs/shared/data-access-user/src/core/models/140103/cancelacion.model';
import { DatosPasos } from '@libs/shared/data-access-user/src';
import { OCTA_TEMPO } from '@libs/shared/data-access-user/src/core/services/130102/octava-temporal.enum';
import { WizardComponent } from '@libs/shared/data-access-user/src';


/**
 * Componente que representa la página del solicitante dentro del flujo de trámites.
 * Este componente utiliza un wizard para guiar al usuario a través de diferentes pasos.
 * 
 * @component
 * @selector app-solicitante-de-page
 * @templateUrl ./solicitante-page.component.html
 */
@Component({
  // Selector utilizado para identificar el componente en el HTML.
  selector: 'app-solicitante-de-page',

  // Ruta del archivo de plantilla HTML asociado al componente.
  templateUrl: './solicitante-page.component.html',
})

// Definición de la clase del componente.
export class SolicitantePageComponent {
  /**
   * @property {ListaPasosWizard[]} pantallasPasos - Array para almacenar los pasos del wizard.
   * Inicializa con los valores de OCTA_TEMPO.
   */
  pantallasPasos: ListaPasosWizard[] = OCTA_TEMPO;

  /**
   * @property {number} indice - El índice actual del paso.
   * Se inicializa en 1.
   */
  indice: number = 1;

  /**
   * @property {object} TEXTOS - Contiene constantes relacionadas con aviso y firma.
   * Se utiliza para manejar textos estáticos en la aplicación.
   */
  public TEXTOS = {
    AVISO,
    FIRMAR,
  };

  /**
   * Referencia al componente del wizard para controlar su comportamiento.
   * Permite acceder a métodos como avanzar o retroceder pasos.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * @property {DatosPasos} datosPasos - Objeto que contiene información sobre los pasos del wizard.
   * Incluye el número total de pasos, el índice actual y los textos de los botones.
   * Se inicializa con los valores predeterminados.
   */
    datosPasos: DatosPasos = {
    // Número total de pasos en el wizard, basado en la longitud del array `pantallasPasos`.
    nroPasos: this.pantallasPasos.length,

    // Índice actual del paso, inicializado con el valor de la propiedad `indice`.
    indice: this.indice,

    // Texto del botón para retroceder al paso anterior.
    txtBtnAnt: 'Anterior',

    // Texto del botón para avanzar al siguiente paso.
    txtBtnSig: 'Continuar',
  };

  /**
   * Actualiza la propiedad `indice` en función del valor del objeto `AccionBoton` proporcionado.
   * Si la propiedad `valor` de `AccionBoton` está entre 1 y 4 (inclusive), establece `indice` en `valor`.
   * Dependiendo de la propiedad `accion` de `AccionBoton`, avanza o retrocede el componente wizard.
   *
   * @param {AccionBoton} e - Objeto que contiene las propiedades `valor` y `accion`.
   * @returns {void}
   */
  getValorIndice(e: AccionBoton): void {
    // Verifica si el valor está dentro del rango permitido (1 a 4).
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor; // Actualiza el índice con el valor proporcionado.

      if (e.accion === 'cont') {
        // Si la acción es 'cont', avanza al siguiente paso del wizard.
        this.wizardComponent.siguiente();
      } else {
        // Si la acción es 'atras', retrocede al paso anterior del wizard.
        this.wizardComponent.atras();
      }
    }
  }
}
