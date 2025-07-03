import { AccionBoton, DatosPasos, ListaPasosWizard, PASOS, WizardComponent } from '@libs/shared/data-access-user/src';
import { Component, ViewChild } from '@angular/core';
import { TITULOMENSAJE } from '../../constants/agregar-destinatario.enum';
@Component({
  /**
   * @property selector
   * @description Nombre del selector HTML que se usará para insertar este componente
   * en otras plantillas. Se representa como una etiqueta HTML personalizada.
   * @example <app-solicitud-page></app-solicitud-page>
   */
  selector: 'app-solicitud-page',

  /**
   * @property templateUrl
   * @description Ruta relativa al archivo HTML que contiene la plantilla de vista del componente.
   */
  templateUrl: './solicitud-page.component.html',

  /**
   * @property styleUrl
   * @description Ruta al archivo SCSS que contiene los estilos específicos del componente.
   */
  styleUrl: './solicitud-page.component.scss',
})
export class SolicitudPageComponent {
  /**
   * @property tituloMensaje
   * @description Título que se muestra en la parte superior del componente wizard.
   * Se actualiza según el paso actual del flujo.
   * @type {string | null}
   */
  public tituloMensaje: string | null = TITULOMENSAJE;

  /**
   * @property pasos
   * @description Arreglo de pasos que componen el wizard. Contiene la configuración
   * de cada paso y el componente asociado.
   * @type {ListaPasosWizard[]}
   */
  public pasos: ListaPasosWizard[] = PASOS;

  /**
   * @property indice
   * @description Índice actual del paso activo en el wizard. Se inicializa en 1.
   * Este índice se usa para controlar el flujo entre los distintos pasos.
   * @type {number}
   */
  public indice: number = 1;

  /**
   * @property wizardComponent
   * @description Referencia al componente hijo `WizardComponent`, utilizada para
   * ejecutar métodos internos del wizard como avanzar o retroceder entre pasos.
   * @type {WizardComponent}
   */
  @ViewChild(WizardComponent)
  public wizardComponent!: WizardComponent;

  /**
   * @property datosPasos
   * @description Objeto que contiene información de configuración para la barra
   * de navegación del wizard. Define el número total de pasos, el índice actual
   * y los textos de los botones de navegación.
   * @type {DatosPasos}
   */
  public datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * @method seleccionaTab
   * @description Método que permite al usuario seleccionar un paso manualmente
   * a través de las pestañas (tabs) del wizard. Actualiza el índice del paso actual.
   * @param {number} i - Índice del paso seleccionado manualmente.
   * @returns {void}
   */
  public seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * @method getValorIndice
   * @description Método que gestiona la navegación del wizard según la acción recibida.
   * La acción puede ser avanzar ('cont') o retroceder ('atras') y está definida en el
   * objeto `AccionBoton`. Este método también actualiza el índice actual del paso y
   * ejecuta el método correspondiente del componente wizard (`siguiente` o `atras`).
   * @param {AccionBoton} e - Objeto que contiene el nuevo índice y la acción a ejecutar.
   * @returns {void}
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
}
