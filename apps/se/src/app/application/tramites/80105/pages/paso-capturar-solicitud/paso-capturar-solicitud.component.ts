import { Component, OnDestroy, ViewChild } from '@angular/core';
import { DatosPasos, ListaPasosWizard, PASOS4, SeccionLibStore, WizardComponent } from '@ng-mf/data-access-user';
import { AccionBoton } from '../../models/nuevo-programa-industrial.model';
import { Subject } from 'rxjs';
import { Tramite80101Query } from '../../estados/tramite80101.query';
import { takeUntil } from 'rxjs';
// eslint-disable-next-line @nx/enforce-module-boundaries

@Component({
  selector: 'app-paso-capturar-solicitud',
  templateUrl: './paso-capturar-solicitud.component.html',
})
export class PasoCapturarSolicitudComponent implements OnDestroy {
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

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Limpia las suscripciones y actualiza los BehaviorSubject para ocultar las tablas.
   * @method ngOnDestroy
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
