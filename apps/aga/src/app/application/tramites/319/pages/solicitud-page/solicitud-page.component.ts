import { Component, OnInit, ViewChild } from '@angular/core';
import { PASOS } from '../../constantes/operaciones-de-comercio-exterior.enum';

import { Subject, map, takeUntil } from 'rxjs';

import { AccionBoton, DatosPasos, ListaPasosWizard, SeccionLibQuery, SeccionLibState, SeccionLibStore, WizardComponent } from '@ng-mf/data-access-user';


@Component({
  selector: 'app-solicitud-page',
  templateUrl: './solicitud-page.component.html',
  styleUrl: './solicitud-page.component.scss',
})
export class SolicitudPageComponent implements OnInit{
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
    ) {}
  
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
     * Método para asignar las secciones existentes al store.
     */
  
}

