import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DatosPasos, ListaPasosWizard, SECCIONES_TRAMITE_220404, SeccionLibQuery, SeccionLibState, SeccionLibStore, WizardComponent } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { DESISTIMIENTO_PASOS } from '../../enum/desistimiento.enum';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  templateUrl: './desistimiento-page.component.html',
  styles: ``,
})

export class DesistimientoPageComponent implements OnInit, OnDestroy {
  /**
  * Lista de pasos para el asistente de desistimiento.
  * Se inicializa con los pasos definidos en la constante DESISTIMIENTO_PASOS.
  */
  pasos: ListaPasosWizard[] = DESISTIMIENTO_PASOS;

  /**
  * Índice del paso activo en el asistente.
  * Se inicializa con el valor 1 (primer paso).
  */
  indice: number = 1;

  /**
  * Objeto que almacena los datos del asistente (wizard).
  * Incluye el número total de pasos, el índice actual,
  * y los textos para los botones de navegación (anterior y continuar).
  */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Objeto que representa la acción y el valor asociado del botón.
   * Se utilizará para gestionar las acciones del asistente.
   */
  accionBoton!: AccionBoton;

  /**
   * Estado de las secciones obtenidas del store.
   * Incluye información sobre las secciones visibles y su estado de validación.
   */
  public seccion!: SeccionLibState;

  /**
   * Subject para controlar las suscripciones y evitar fugas de memoria.
   * Se utiliza para cancelar todas las suscripciones al destruir el componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Referencia al componente de asistente (wizard).
   * Se utiliza para acceder a los métodos y propiedades del asistente.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Referencia al componente del primer paso del asistente.
   * Se utiliza para interactuar directamente con el contenido y la lógica del paso uno.
   */
  @ViewChild(PasoUnoComponent) pasoUnoComponent!: PasoUnoComponent;

  /** Inyectamos los servicios necesarios*/
  constructor(
    public seccionQuery: SeccionLibQuery,
    public seccionStore: SeccionLibStore
  ) {
    /** El constructor está intencionalmente vacío para la inyección de dependencias */
   }

  /**
  * Método que se ejecuta al inicializar el componente.
  * Este método se utiliza para suscribirse al estado de las secciones y asignarlas al componente.
  */
  ngOnInit():void {
    /** Suscribe a los cambios en el estado de las secciones desde el store. */
    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccion = seccionState;
        })
      )
      .subscribe();
    /** Llama al método para asignar las secciones iniciales al componente o al estado. */
    this.asignarSecciones();
  }

  /**
  * Método para asignar las secciones existentes al stored
  */
  public asignarSecciones(): void {
    const SECCIONES: boolean[] = Object.values(SECCIONES_TRAMITE_220404.PASO_1);
    const FORM_VALIDA: boolean[] = [];
    for (const LLAVE_SECCIONE in SECCIONES_TRAMITE_220404.PASO_1) {
      if(LLAVE_SECCIONE) {
        FORM_VALIDA.push(false);
      }
    }
    this.seccionStore.establecerSeccion(SECCIONES);
    this.seccionStore.establecerFormaValida(FORM_VALIDA);
  }

  /** Cambia la pestaña activa al índice proporcionado */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /** Actualiza el índice en base al valor y ejecuta acciones de navegación */
  getValorIndice(e: AccionBoton):void {
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }

   /**  Método que se ejecuta cuando se destruye el componente */
   ngOnDestroy(): void {
    /**  Liberamos los recursos y notificamos a todos los observadores */
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
