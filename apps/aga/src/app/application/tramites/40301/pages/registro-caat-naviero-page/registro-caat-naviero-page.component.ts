import { CAAT_NAVIERO_PASOS } from '../../enum/caat-naviero.enum';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { SECCIONES_TRAMITE_40301 } from '../../enum/caat-naviero.enum';

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DatosPasos, 
  ListaPasosWizard, 
  SeccionLibQuery, 
  SeccionLibState, 
  SeccionLibStore, 
  WizardComponent } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';

interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  templateUrl: './registro-caat-naviero-page.component.html',
  styles: ``,
})

export class RegistroCaatNavieroPageComponent implements OnInit, OnDestroy {
  /**
   * Un arreglo de pasos (`ListaPasosWizard[]`) utilizado en el proceso de CAAT Naviero.
   * Este se inicializa con pasos predefinidos de `CAAT_NAVIERO_PASOS`.
   */
  pasos: ListaPasosWizard[] = CAAT_NAVIERO_PASOS;

  /**
   * Representa el índice o posición actual dentro de una secuencia o colección.
   * Inicializado en 1 por defecto.
   */
  indice: number = 1;

  /**
   * Indica si se debe mostrar el botón para abrir el modal.
   * 
   * @type {boolean}
   */
  mostrarBotonParaModal: boolean = false;

  /**
   * Representa la estructura de datos para gestionar los pasos en un proceso de navegación.
   * 
   * @property {number} nroPasos - El número total de pasos en el proceso.
   * @property {number} indice - El índice o posición actual en los pasos.
   * @property {string} txtBtnAnt - El texto de la etiqueta para el botón "Anterior".
   * @property {string} txtBtnSig - El texto de la etiqueta para el botón "Siguiente".
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
  
  /**
   * Representa la acción asociada con un botón en el componente.
   * Se espera que esta propiedad sea de tipo `AccionBoton`, que define
   * el comportamiento o funcionalidad específica que se activa al presionar el botón.
   */
  accionBoton!: AccionBoton;

  /**
   * Representa el estado de una sección dentro de la aplicación.
   * Esta propiedad se utiliza para gestionar y rastrear el estado de una sección específica
   * en la página "Registro CAAT Naviero".
   *
   * @type {SeccionLibState}
   */
  public seccion!: SeccionLibState;

  /**
   * Notificador utilizado para gestionar la destrucción de suscripciones en el componente.
   * Es un Subject que emite un valor cuando el componente se destruye, permitiendo
   * cancelar suscripciones activas y evitar fugas de memoria.
   *
   * @private
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Referencia al componente `WizardComponent` hijo.
   * Se utiliza para interactuar con el componente wizard desde este componente.
   * 
   * @type {WizardComponent}
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Referencia al componente `PasoUnoComponent` hijo.
   * Se utiliza para interactuar con el componente paso uno desde este componente.
   * 
   * @type {PasoUnoComponent}
   */
  @ViewChild(PasoUnoComponent) pasoUnoComponent!: PasoUnoComponent;

  /**
   * Constructor del componente.
   * 
   * @param {SeccionLibQuery} seccionQuery - Servicio para consultar el estado de las secciones.
   * @param {SeccionLibStore} seccionStore - Servicio para gestionar el estado de las secciones.
   */
  constructor(
    private seccionQuery: SeccionLibQuery,
    private seccionStore: SeccionLibStore
  ) {
    // El constructor está intencionalmente vacío para la inyección de dependencias 
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Se suscribe al estado de las secciones y asigna las secciones iniciales.
   */
  ngOnInit(): void {
    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccion = seccionState;
        })
      )
      .subscribe();

    this.asignarSecciones();
  }

  /**
   * Método para asignar las secciones existentes al store.
   * Inicializa las secciones y las valida como no válidas por defecto.
   */
  asignarSecciones(): void {
    const SECCIONES: boolean[] = Object.values(SECCIONES_TRAMITE_40301.PASO_1);
    const FORM_VALIDA: boolean[] = [];
    
    for (const LLAVE_SECCIONE in SECCIONES_TRAMITE_40301.PASO_1) {
      if (LLAVE_SECCIONE) {
        FORM_VALIDA.push(false);
      }
    }
    this.seccionStore.establecerSeccion(SECCIONES);
    this.seccionStore.establecerFormaValida(FORM_VALIDA);
  }

  /**
   * Cambia la pestaña activa al índice proporcionado.
   * 
   * @param {number} i - Índice de la pestaña seleccionada.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Actualiza el índice en base al valor y ejecuta acciones de navegación.
   * 
   * @param {AccionBoton} e - Objeto que contiene la acción y el valor del botón.
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
   * Cambia la visibilidad del botón del modal dependiendo del paso actual.
   * 
   * @param {number} event - Índice del paso actual.
   */
  pestanaCambiado(event: number): void {
    this.mostrarBotonParaModal = event === 2 ? true : false;
  }

  
  /**
   * Gancho del ciclo de vida que se llama cuando el componente es destruido.
   * Este método emite un valor al subject `destroyNotifier$` y lo completa,
   * asegurando que cualquier suscripción vinculada a este notificador se limpie
   * adecuadamente para prevenir fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}