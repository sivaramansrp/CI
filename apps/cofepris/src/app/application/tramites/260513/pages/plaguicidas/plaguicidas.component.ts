import { Component, ViewChild } from '@angular/core';
import { ERROR_FORMA_ALERT, ListaPasosWizard, PASOS } from '@libs/shared/data-access-user/src';
import { DatosPasos } from '@libs/shared/data-access-user/src/core/models/shared/components.model';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { WizardComponent } from '@libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';

/**
 * Represents the action and value associated with a button.
 */
interface AccionBoton {
  accion: string;
  valor: number;
}

/**
 * Componente principal para la gestión de plaguicidas.
 * Contiene la lógica y la estructura del asistente de plaguicidas.
 */
@Component({
  selector: 'app-plaguicidas',
  templateUrl: './plaguicidas.component.html',
})
export class PlaguicidasComponent {
  public formErrorAlert = ERROR_FORMA_ALERT;
  
  esFormaValido: boolean = false;
  /**
   * Lista de pasos del asistente.
   * Se obtiene de una constante definida en otro archivo.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Indice actual del paso en el asistente.
   * Se inicializa en 1.
   */
  indice: number = 1;

  /**
   * Título del asistente.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

    @ViewChild(PasoUnoComponent) pasoUnoComponent!: PasoUnoComponent;

  /**
   * Título del asistente.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Maneja la acción del botón en el asistente.
   * Cambia el paso actual según la acción del botón.
   *
   * @param e - Objeto que contiene la acción y el valor del botón.
   */


  getValorIndice(e: AccionBoton): void {
      this.esFormaValido = false;
      // Validar formularios antes de continuar desde el paso uno
      if (this.indice === 1 && e.accion === 'cont') {
        const ISVALID = this.pasoUnoComponent.validOnButtonClick();
        if (!ISVALID) {
          this.esFormaValido = true;
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
}
