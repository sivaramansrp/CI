import { AccionBoton, DatosPasos, ListaPasosWizard, WizardComponent } from '@libs/shared/data-access-user/src';
import { Component, ViewChild } from '@angular/core';
import { PANTA_PASOS, TITULO_PASO_DOS, TITULO_PASO_TRES, TITULO_PASO_UNO } from '../../constantes/importaciones-agropecuarias.enum';
import { AVISO } from '../../constantes/importaciones-agropecuarias.enum';


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
export class TodosPasosComponent {
  /**
   * @property pantallasPasos
   * @description
   * Lista de pasos del wizard, representada como un arreglo de objetos `ListaPasosWizard`.
   * 
   * @type {ListaPasosWizard[]}
   */
  public pantallasPasos: ListaPasosWizard[] = PANTA_PASOS;

  /**
   * @property indice
   * @description
   * Índice del paso actual en el wizard.
   * 
   * @type {number}
   */
  public indice: number = 1;

  /**
   * @property aviso
   * @type {string}
   *  Texto del aviso de privacidad en formato HTML.
   */

  aviso= AVISO.Aviso;

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
    * @description
    * Constructor del componente.
    * Inyecta el servicio de validación de formularios.
    * @param validacionDeFormularioService Servicio para manejar la validación de formularios.
    */
  constructor() {
    /** Inyecta el servicio de consulta para obtener el estado actual de la consulta. */
  }

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
      if (this.wizardComponent) {
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
    }
  }
}
