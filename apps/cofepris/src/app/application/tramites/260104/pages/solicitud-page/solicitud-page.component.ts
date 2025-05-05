import { Component,ViewChild } from '@angular/core';

import { AccionBoton,DatosPasos,ListaPasosWizard,WizardComponent } from '@ng-mf/data-access-user';

import { PASOS } from '@libs/shared/data-access-user/src/tramites/constantes/303/pasos.enums';



/**
 * @component
 * @name SolicitudPageComponent
 * @description
 * Este componente representa la página de solicitud para el trámite de permiso sanitario de importación
 * de productos de muestra o consumo personal. Incluye un wizard para la navegación entre los pasos del trámite.
 * 
 * @example
 * <app-solicitud-page></app-solicitud-page>
 * 
 * @property {string | null} tituloMensaje
 * Título principal mostrado en la parte superior según el paso actual.
 * 
 * @property {ListaPasosWizard[]} pasos
 * Lista de pasos del wizard obtenidos desde una constante externa.
 * 
 * @property {number} indice
 * Índice actual del paso seleccionado (empieza en 1).
 * 
 * @property {WizardComponent} wizardComponent
 * Referencia al componente Wizard para controlar navegación entre pasos.
 * 
 * @property {DatosPasos} datosPasos
 * Objeto de configuración utilizado por el componente wizard.
 * 
 * @method seleccionaTab
 * Cambia el índice actual del wizard manualmente.
 * @param {number} i - Índice del paso al que se desea cambiar.
 * 
 * @method getValorIndice
 * Controla la navegación del wizard según el botón presionado (anterior o continuar).
 * También actualiza el título correspondiente al paso actual.
 * @param {AccionBoton} e - Objeto que contiene el valor y la acción del botón presionado.
 */
@Component({
  selector: 'app-solicitud-page',
  templateUrl: './solicitud-page.component.html',
  styleUrl: './solicitud-page.component.scss',
})


export class SolicitudPageComponent {
  /**
   * @property {string | null} tituloMensaje
   * Título principal mostrado en la parte superior según el paso actual.
   */
  tituloMensaje: string | null =
    'Permiso sanitario de importación de productos de muestra o consumo personal (para donación, investigación científica, pruebas de laboratorio y exhibición)';

  /**
   * @property {ListaPasosWizard[]} pasos
   * Lista de pasos del wizard obtenidos desde una constante externa.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * @property {number} indice
   * Índice actual del paso seleccionado (empieza en 1).
   */
  indice: number = 1;

  /**
   * @property {WizardComponent} wizardComponent
   * Referencia al componente Wizard para controlar navegación entre pasos.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * @property {DatosPasos} datosPasos
   * Objeto de configuración utilizado por el componente wizard.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * @method seleccionaTab
   * @description Cambia el índice actual del wizard manualmente.
   * @param {number} i - Índice del paso al que se desea cambiar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * @method getValorIndice
   * @description Controla la navegación del wizard según el botón presionado (anterior o continuar).
   * También actualiza el título correspondiente al paso actual.
   *
   * @param {AccionBoton} e - Objeto que contiene el valor y la acción del botón presionado.
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
