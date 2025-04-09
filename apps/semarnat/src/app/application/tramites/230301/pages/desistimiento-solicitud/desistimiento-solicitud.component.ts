import { Component, ViewChild } from '@angular/core';
import { ListaPasosWizard, PASOS } from '../../models/disponsibles.model';

import { AccionBoton, DatosPasos, SeccionLibStore, WizardComponent } from '@ng-mf/data-access-user';
import { TEXTOS } from '../../enum/constants';

@Component({
  selector: 'app-desistimiento-solicitud',
  templateUrl: './desistimiento-solicitud.component.html',
  styleUrl: './desistimiento-solicitud.component.scss',
})

export class DesistimientoSolicitudComponent {

  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

    /**
     * @property {number} indice - El índice del paso en el asistente.
     */
    indice: number = 1;

    /**
     * @property {ListaPasosWizard[]} pasos - Lista de pasos del wizard.
     */
    pasos: ListaPasosWizard[] = PASOS;

    /**
   * Datos de los pasos del asistente.
   */
    datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  
  /**
   * Textos utilizados en el componente.
   * 
   * Esta propiedad contiene textos como instrucciones o mensajes que se muestran
   * en la interfaz del usuario.
   */
  /**
   * Textos utilizados en el componente.
   * 
   * Esta propiedad contiene textos como instrucciones o mensajes que se muestran
   * en la interfaz del usuario.
   */
  TEXTOS = TEXTOS;

    /**
   * 
   * Una cadena que representa la clase CSS para una alerta de información.
   * Esta clase se utiliza para aplicar estilo a los mensajes de información en el componente.
   */
    public infoAlert = 'alert-info';


      /**
   * @description Método para seleccionar una pestaña específica.
   * @param {number} i - Índice de la pestaña a seleccionar.
   */
    seleccionaTab(i: number): void {
    this.indice = i;
  }

  constructor(private readonly seccionStore: SeccionLibStore) {
    this.seccionStore.establecerFormaValida([false]);
    this.seccionStore.establecerSeccion([true]);
  }

  /**
   * Obtiene el valor del índice de la acción del botón.
   * @param e Acción del botón.
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
