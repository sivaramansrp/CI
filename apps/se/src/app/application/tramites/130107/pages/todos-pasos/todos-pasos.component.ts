import { AccionBoton, DatosPasos, ListaPasosWizard, WizardComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { PANTA_PASOS, TITULO_PASO_DOS, TITULO_PASO_TRES, TITULO_PASO_UNO } from '../../constantes/importaciones-agropecuarias.enum';
import { Subject } from 'rxjs';

/**
 * @component TodosPasosComponent
 * @description
 * Componente encargado de gestionar la navegación entre todos los pasos del trámite 130107.
 * Este componente incluye la lógica para manejar el flujo del wizard, actualizar los títulos
 * de los pasos y controlar la navegación entre ellos.
 * 
 * @selector app-todos-pasos
 * @templateUrl ./todos-pasos.component.html
 */
@Component({
  selector: 'app-todos-pasos',
  templateUrl: './todos-pasos.component.html',
})
export class TodosPasosComponent implements OnDestroy {
  /**
   * @property pantallasPasos
   * @description
   * Lista de pasos del wizard, representada como un arreglo de objetos `ListaPasosWizard`.
   * 
   * @type {ListaPasosWizard[]}
   */
  pantallasPasos: ListaPasosWizard[] = PANTA_PASOS;

  /**
   * @property indice
   * @description
   * Índice del paso actual en el wizard.
   * 
   * @type {number}
   */
  indice: number = 1;

  /**
   * @property titulo
   * @description
   * Título del paso actual en el wizard.
   * Se actualiza dinámicamente según el paso seleccionado.
   * 
   * @type {string}
   */
  public titulo: string = TITULO_PASO_UNO;

  /**
   * @property destroyed$
   * @description
   * Sujeto utilizado para destruir observables y evitar fugas de memoria.
   * 
   * @type {Subject<void>}
   * @private
   */
  private destroyed$ = new Subject<void>();

  /**
   * @property wizardComponent
   * @description
   * Referencia al componente `WizardComponent` para controlar la navegación entre pasos.
   * 
   * @type {WizardComponent}
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * @property datosPasos
   * @description
   * Datos relacionados con los pasos del wizard, como el número total de pasos,
   * el índice actual y los textos de los botones de navegación.
   * 
   * @type {DatosPasos}
   */
  public datosPasos: DatosPasos = {
    nroPasos: this.pantallasPasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * @method getValorIndice
   * @description
   * Método utilizado para actualizar el índice del paso actual y el título correspondiente.
   * También controla la navegación hacia adelante o atrás en el wizard.
   * 
   * @param e Objeto de tipo `AccionBoton` que contiene el valor del índice y la acción a realizar.
   */
  public getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      if (this.indice === 2) {
        this.titulo = TITULO_PASO_DOS;
      } else if (this.indice === 3) {
        this.titulo = TITULO_PASO_TRES;
      } else {
        this.titulo = TITULO_PASO_UNO;
      }
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }

  /**
   * @method ngOnDestroy
   * @description
   * Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
   * Este método completa el observable `destroyed$` para cancelar las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
