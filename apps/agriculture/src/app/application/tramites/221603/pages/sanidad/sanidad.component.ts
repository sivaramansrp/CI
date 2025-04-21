import { Component, ViewChild } from '@angular/core';
import { DatosPasos, PASOS_REGISTRO } from '@libs/shared/data-access-user/src';
import { ALERTA_COM } from '@libs/shared/data-access-user/src/tramites/constantes/110208/certificado.enum';
import{AccionBoton} from '@libs/shared/data-access-user/src/core/models/140103/cancelacion.model';
import { ListaPasosWizard } from '@libs/shared/data-access-user/src';
import { WizardComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-sanidad', 
  templateUrl: './sanidad.component.html',
 
})

export class SanidadComponent {
    /**
   * @property {ListaPasosWizard[]} pantallasPasos - Array para almacenar los pasos del wizard.
   */
  pantallasPasos: ListaPasosWizard[] = PASOS_REGISTRO;

    TEXTOS= ALERTA_COM;

  /**
   * @property {number} indice - El índice actual del paso.
   */
  indice: number = 1;
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
 
  datosPasos: DatosPasos = {
    nroPasos: this.pantallasPasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
 
 /**
   * Actualiza la propiedad `indice` según el valor del objeto `AccionBoton` proporcionado.
   * Si la propiedad `valor` de `AccionBoton` está entre 1 y 4 (inclusive), establece `indice` en `valor`.
   * Dependiendo de la propiedad `accion` de `AccionBoton`, mueve el componente del asistente hacia adelante o hacia atrás.
   *
   * @param {AccionBoton} e - El objeto del botón de acción que contiene las propiedades `valor` y `accion`.
   * @returns {void}
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