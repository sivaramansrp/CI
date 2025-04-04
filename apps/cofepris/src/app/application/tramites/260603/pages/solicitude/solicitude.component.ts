import { Component, ViewChild } from '@angular/core';
import { DatosPasos, ListaPasosWizard, PASOS, WizardComponent } from '@ng-mf/data-access-user';
import { LISTA_PASOS_WIZARD } from '../../../../shared/constantes/lista-pasos-wizard.enum';

interface AccionBoton {
  accion: string;
  valor: number;
}
/**
 * @component
 * @selector app-solicitude
 * @templateUrl ./solicitude.component.html
 * 
 * @description
 * Componente que representa la página de solicitud dentro del flujo de trámites.
 * Este componente utiliza un wizard para navegar entre los pasos del proceso.
 * 
 * @example
 * <app-solicitude></app-solicitude>
 */
@Component({
  selector: 'app-solicitude',
  templateUrl: './solicitude.component.html',
})
export class SolicitudeComponent {
  /**
   * Referencia al componente del wizard para controlar la navegación entre pasos.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Lista de pasos del wizard para la solicitud.
   */
  solicitudePasos: ListaPasosWizard[] = LISTA_PASOS_WIZARD;

  /**
   * Índice actual del paso en el wizard.
   */
  indice: number = 1;

  /**
   * Lista de pasos generales del wizard.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Datos relacionados con los pasos del wizard, incluyendo el número total de pasos,
   * el índice actual y los textos de los botones de navegación.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Guardar',
    txtBtnSig: 'Continuar',
  };

  /**
   * @method getValorIndice
   * 
   * @description
   * Método que actualiza el índice actual del wizard basado en la acción del botón.
   * Si la acción es 'cont', avanza al siguiente paso. Si no, retrocede al paso anterior.
   * 
   * @param e - Objeto de tipo `AccionBoton` que contiene el valor del índice y la acción a realizar.
   * 
   * @example
   * this.getValorIndice({ valor: 2, accion: 'cont' });
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
