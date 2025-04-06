/**
 * @fileoverview Componente PermisoDeHidrocarburos.
 * 
 * Este componente se encarga de gestionar el proceso de solicitud de permisos de hidrocarburos
 * utilizando un asistente de pasos (WizardComponent). Permite navegar entre los distintos pasos del proceso,
 * actualizando el índice actual del paso y mostrando los textos adecuados en los botones de navegación.
 *
 * @example
 * <app-permiso-de-hidrocarburos></app-permiso-de-hidrocarburos>
 */

import { Component, ViewChild } from '@angular/core';
import { DatosPasos, ListaPasosWizard, WizardComponent } from '@libs/shared/data-access-user/src';
import { AccionBoton } from '../../enums/accion-botton.enum';

import { PASOS_EXPORTACION } from '../../constants/permiso-de-hidrocarburos.enum';

@Component({
  selector: 'app-permiso-de-hidrocarburos',
  templateUrl: './permiso-de-hidrocarburos.component.html',
})
export class PermisoDeHidrocarburosComponent {
  
  /**
   * Lista de pasos a solicitar para el proceso de exportación.
   * Se inicializa con el valor de PASOS_EXPORTACION.
   */
  pasosSolicitar: ListaPasosWizard[] = PASOS_EXPORTACION;

  /**
   * Índice del paso actual en el asistente.
   */
  indice: number = 1;

  /**
   * Índice de la pestaña actual.
   */
  tabIndex: number = 1;

  /**
   * Instancia del componente WizardComponent.
   * Se utiliza para gestionar la navegación entre los pasos del asistente.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Objeto que contiene la configuración y datos de los pasos del asistente.
   *
   * @property {number} nroPasos - Número total de pasos, derivado de la longitud de 'pasosSolicitar'.
   * @property {number} indice - Paso actual en el asistente.
   * @property {string} txtBtnAnt - Texto para el botón de acción "Anterior".
   * @property {string} txtBtnSig - Texto para el botón de acción "Continuar".
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasosSolicitar.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Actualiza el índice del paso actual basado en la acción del botón recibido.
   *
   * Si el valor recibido en el objeto 'e' se encuentra entre 1 y 3 (exclusivos 0 y 4) se actualiza el índice.
   * Además, según la acción indicada ('cont' para continuar o cualquier otra para retroceder), se invoca
   * el método correspondiente del WizardComponent para navegar al siguiente o anterior paso.
   *
   * @param {AccionBoton} e - Objeto que contiene el valor del paso y la acción a realizar.
   */
  getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 4) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }
}
