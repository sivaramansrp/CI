/**
 * Componente que gestiona la asignación directa de cupo.
 * Muestra una serie de pantallas de pasos y utiliza textos predefinidos.
 */
import { AVISO,FIRMAR } from '@libs/shared/data-access-user/src/tramites/constantes/aviso-privacidad.enum';

import { Component, ViewChild } from '@angular/core';
 
import { ASIGNACION } from '@ng-mf/data-access-user';

import { ListaPasosWizard } from '@ng-mf/data-access-user';

import { DatosPasos, WizardComponent } from '@ng-mf/data-access-user';

/**
 * Interface representing the action of a button.
 */
interface AccionBoton {
  /**
   * The action to be performed.
   */
  accion: string;
  /**
   * The value associated with the action.
   */
  valor: number;
}

/**
 * Componente que gestiona la asignación directa de cupo.
 * Muestra una serie de pantallas de pasos y utiliza textos predefinidos.
 */
@Component({
  selector: 'app-asignacion-directa-de-cupo',
  templateUrl: './asignacion-directa-de-cupo.component.html',
})
export class AsignacionDirectaDeCupoComponent {
    /**
   * Reference to the WizardComponent.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  /**
   * Lista de pasos para el asistente (wizard) de asignación directa.
   */
  pantallasPasos: ListaPasosWizard[] = ASIGNACION;
 
  /**
   * Índice actual del paso en el asistente.
   */
  indice: number = 1;
 
  /**
   * Clase CSS para aplicar estilos específicos a los elementos de la interfaz.
   */
  class: string = 'alert-danger';

    /**
   * The data for the steps in the wizard.
   */
    datosPasos: DatosPasos = {
      nroPasos: this.pantallasPasos.length,
      indice: this.indice,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar',
    };

  /**
   * Updates the index value based on the action button event.
   * @param e The action button event containing the action and value.
   */
  public getValorIndice(e: AccionBoton): void {
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
   * @property {object} TEXTOS - Contiene constantes relacionadas con aviso y firma.
   * Se utiliza para manejar textos estáticos en la aplicación.
   */
       public TEXTOS = {
        AVISO,
        FIRMAR,
      };
  
}