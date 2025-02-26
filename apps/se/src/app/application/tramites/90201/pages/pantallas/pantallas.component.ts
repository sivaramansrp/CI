/**
 * Este componente se utiliza para mostrar los pasos del asistente - 90201
 * Lista de pasos
 * Índice del paso
 */ 

/* eslint-disable @nx/enforce-module-boundaries */
import { Component, ViewChild } from '@angular/core';
import { ListaPasosWizard } from 'libs/shared/data-access-user/src/core/models/5701/servicios-extraordinarios.model';
// eslint-disable-next-line sort-imports
import { DatosPasos } from 'libs/shared/data-access-user/src/core/models/shared/components.model';
import { PANTAPASOS } from 'libs/shared/data-access-user/src/core/services/90201/expansion-de-productores.enum';
import { WizardComponent } from 'libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';

/**
 * Interfaz que representa un botón de acción.
 */
interface AccionBoton {
  /**
   * La acción que debe realizar el botón.
   */
  accion: string;

  /**
   * El valor asociado con la acción.
   */
  valor: number;
}

@Component({
  selector: 'app-pantallas',
  templateUrl: './pantallas.component.html',
})
export class PantallasComponent {

  /**
   * Esta variable se utiliza para almacenar la lista de pasos.
   */
  pantallasPasos: ListaPasosWizard[] = PANTAPASOS;
  /**
   * Esta variable se utiliza para almacenar el índice del paso.
   */
  indice: number = 1;

  /**
   * Una referencia a la instancia de WizardComponent dentro de la plantilla.
   * Esta propiedad está decorada con `@ViewChild` para permitir el acceso a los
   * métodos y propiedades públicos de WizardComponent.
   * 
   * @type {WizardComponent}
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;


  /**
   * Un objeto que representa los datos de los pasos para el componente.
   * 
   * @property {number} nroPasos - El número de pasos, derivado de la longitud de `pantallasPasos`.
   * @property {number} indice - El índice actual del paso.
   * @property {string} txtBtnAnt - El texto para el botón "Anterior".
   * @property {string} txtBtnSig - El texto para el botón "Continuar".
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pantallasPasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };


  /**
   * Actualiza la propiedad `indice` en función del valor del objeto `AccionBoton` proporcionado.
   * Si la propiedad `valor` de `AccionBoton` está entre 1 y 4 (inclusive), establece `indice` en `valor`.
   * Dependiendo de la propiedad `accion` de `AccionBoton`, mueve el componente del asistente hacia adelante o hacia atrás.
   *
   * @param {AccionBoton} e - El objeto del botón de acción que contiene las propiedades `valor` y `accion`.
   */
  getValorIndice(e: AccionBoton) {
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
