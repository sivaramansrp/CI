/**
 * compo doc
 * @component
 * @selector app-paso-capturar-solicitud
 * @description
 * Este componente gestiona el flujo del wizard para la captura de la solicitud en el trámite 80103.
 * Permite navegar entre los diferentes pasos del proceso, controla el estado de avance y valida la información
 * de cada sección utilizando el estado centralizado proporcionado por SeccionLibStore y Tramite80101Query.
 *
 * Funcionalidades principales:
 * - Visualiza y administra los pasos del wizard definidos en PASOS4.
 * - Permite avanzar y retroceder entre los pasos mediante el componente WizardComponent.
 * - Sincroniza el estado de la sección y la validez del formulario con el store global.
 * - Aplica estilos de alerta informativa para mensajes relevantes en el proceso.
 *
 * Componentes importados:
 * - `WizardComponent`: Componente para la navegación tipo wizard.
 *
 * @templateUrl ./paso-capturar-solicitud.component.html
 */
import { Component, ViewChild } from '@angular/core';
import { DatosPasos, ListaPasosWizard, PASOS4, SeccionLibStore, WizardComponent } from '@ng-mf/data-access-user';
import { AccionBoton } from '../../models/nuevo-programa-industrial.model';
import { Subject } from 'rxjs';
import { Tramite80101Query } from '../../estados/tramite80101.query';
import { takeUntil } from 'rxjs';
/*
*  * Componente para gestionar el paso de captura de solicitud en el trámite 80103.
*  * Este componente utiliza el componente WizardComponent para permitir la navegación entre
*/

@Component({
  selector: 'app-paso-capturar-solicitud',
  templateUrl: './paso-capturar-solicitud.component.html',
})
/**
 * Clase que representa el componente de captura de solicitud.
 * Este componente gestiona el flujo del wizard para la captura de la solicitud en el trámite 80103.
 */
export class PasoCapturarSolicitudComponent {
  /**
   * Almacena los pasos del wizard definidos en PASOS4.
   * @type {ListaPasosWizard[]}
   */
  pasos: ListaPasosWizard[] = PASOS4;
  /**
   * Almacena el índice actual del paso en el wizard.
   * @type {number}
   */
  indice: number = 1;
  /**
   * Almacena el mensaje de aviso para el wizard.
   * @type {AVISO}
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
  /**
   * Referencia al componente `WizardComponent` dentro de la plantilla.
   * Esta propiedad utiliza el decorador `@ViewChild` para obtener una instancia del componente
   * `WizardComponent` que se encuentra en la plantilla del componente actual.
   * 
   * Uso:
   * - Se utiliza para acceder a los métodos y propiedades del componente `WizardComponent`.
   * - Por ejemplo, se llama a los métodos `siguiente()` y `atras()` para navegar entre los pasos
   *   del asistente (wizard).
   * 
   * Nota:
   * - Esta propiedad se inicializa después de que Angular haya renderizado la vista.
   * - Asegúrese de que el componente `WizardComponent` esté presente en la plantilla.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  /**
 * 
 * Una cadena que representa la clase CSS para una alerta de información.
 * Esta clase se utiliza para aplicar estilo a los mensajes de información en el componente.
 */
  public infoAlert = 'alert-info';
  /**
   * Notificador para destruir los observables y evitar posibles fugas de memoria.
   * @private
   * @type {Subject<void>}
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente `PasoCapturarSolicitudComponent`.
   * Inicializa el componente y establece la validez del formulario en el store.
   * 
   * @param {Tramite80101Query} tramiteQuery - Servicio para gestionar el estado del trámite.
   * @param {SeccionLibStore} seccion - Servicio para gestionar el estado de la sección.
   */
  constructor(
    private tramiteQuery: Tramite80101Query,
    private seccion: SeccionLibStore
  ) {
    this.tramiteQuery.FormaValida$.pipe(
      takeUntil(this.destroyNotifier$)
    ).subscribe((res) => {
      this.seccion.establecerSeccion([true]);
      this.seccion.establecerFormaValida([res]);
    });
  }

  /**
   * Obtiene el valor del índice de la acción del botón.
   * @param e - event$: Acción del botón.
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
