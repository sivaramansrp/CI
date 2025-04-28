import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PASOS } from '../../constantes/operaciones-de-comercio-exterior.enum';

import { Subject, map, takeUntil } from 'rxjs';

import { AccionBoton, DatosPasos, ListaPasosWizard, SeccionLibQuery, SeccionLibState, SeccionLibStore, WizardComponent } from '@ng-mf/data-access-user';


@Component({
  selector: 'app-solicitud-page',
  templateUrl: './solicitud-page.component.html',
  styleUrl: './solicitud-page.component.scss',
})
/**
 * @component
 * @name SolicitudPageComponent
 * @description
 * Componente encargado de gestionar la lógica y el estado de la página de solicitud dentro del flujo de un wizard.
 * Este componente interactúa con un store y un query para manejar el estado de la sección, y controla la navegación
 * entre los pasos del wizard.
 * 
 * @usageNotes
 * Este componente utiliza un `WizardComponent` para la navegación entre pasos y un `SeccionLibQuery` junto con un 
 * `SeccionLibStore` para manejar el estado de la sección.
 * 
 * @example
 * <app-solicitud-page></app-solicitud-page>
 * 
 * @property {ListaPasosWizard[]} pasos - Lista de pasos del wizard.
 * @property {number} indice - Índice del paso actual.
 * @property {SeccionLibState | undefined} seccion - Estado de la sección.
 * @property {Subject<void>} destroyNotifier$ - Notificador para destruir observables.
 * @property {WizardComponent} wizardComponent - Referencia al componente del wizard.
 * @property {DatosPasos} datosPasos - Datos de configuración de los pasos del wizard.
 * 
 * @method ngOnInit
 * Inicializa el componente y suscripciones necesarias para manejar el estado de la sección.
 * 
 * @method seleccionaTab
 * Cambia el índice del paso actual del wizard.
 * @param {number} i - Índice de la pestaña a seleccionar.
 * 
 * @method getValorIndice
 * Actualiza el índice del paso actual basado en el evento recibido y navega al paso correspondiente.
 * @param {AccionBoton} e - Evento con la acción y el valor del índice.
 * 
 * @method destroyNotifier$
 * Método para limpiar las suscripciones al destruir el componente.
 * 
 * @method datosPasos
 * Configura los textos y el número de pasos del wizard.
 * 
 * @constructor
 * @param {SeccionLibQuery} seccionQuery - Consulta de la sección.
 * @param {SeccionLibStore} seccionStore - Almacenamiento de la sección.
 */
export class SolicitudPageComponent implements OnInit, OnDestroy {
  /**
     * Lista de pasos del wizard.
     */
    pasos: ListaPasosWizard[] = PASOS;
  
    /**
     * Índice del paso actual.
     */
    indice: number = 1;
  
    /**
     * Estado de la sección.
     */
    public seccion: SeccionLibState | undefined;
  
    /**
     * Notificador para destruir observables.
     */
    private destroyNotifier$: Subject<void> = new Subject();
  
    /**
     * Referencia al componente del wizard.
     */
    @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  
    /**
     * Datos de los pasos del wizard.
     */
    datosPasos: DatosPasos = {
      nroPasos: this.pasos.length,
      indice: this.indice,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar',
    };
  
    /**
     * Constructor del componente.
     * @param seccionQuery Consulta de la sección.
     * @param seccionStore Almacenamiento de la sección.
     */
    constructor(
      private seccionQuery: SeccionLibQuery,
      private seccionStore: SeccionLibStore,
    ) {
      this.seccionStore.establecerFormaValida([false]);
      this.seccionStore.establecerSeccion([true]);
    }
  
    /**
     * Inicializa el componente.
     */
    ngOnInit(): void {
      this.seccionQuery.selectSeccionState$.pipe(
        takeUntil(this.destroyNotifier$),
        map(seccionState => {
          this.seccion = seccionState;
        })
      ).subscribe();
  
    
    }
  
    /**
     * Selecciona una pestaña del wizard.
     * @param {number} i - Índice de la pestaña.
     */
    seleccionaTab(i: number): void {
      this.indice = i;
    }
  
    /**
     * Obtiene el valor del índice del evento.
     * @param {AccionBoton} e - Evento con la acción y el valor.
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
     * @override
     * @method ngOnDestroy
     * @description Este método se ejecuta automáticamente cuando el componente se destruye. 
     * Emite un valor en el observable `destroyNotifier$` para notificar a los suscriptores que deben limpiar recursos 
     * y luego completa el observable para liberar memoria.
     * 
     */
    ngOnDestroy(): void {
      this.destroyNotifier$.next();
      this.destroyNotifier$.complete();
    }
  
}

