import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  DatosPasos, SeccionLibQuery, SeccionLibState,
  SeccionLibStore,
} from '@ng-mf/data-access-user';
import { ReplaySubject, Subject, map, takeUntil } from 'rxjs';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PASOS } from '@ng-mf/data-access-user';
import { WizardComponent } from '@ng-mf/data-access-user';
import { OCTA_TEMPO } from '../../constants/octova-tempora.enum';

interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  templateUrl: './solicitud-page.component.html',
  styles: ``,
})
export class SolicitudPageComponent implements OnDestroy, OnInit {
  /**
   * Lista de pasos del asistente (wizard).
   */
  pasos: ListaPasosWizard[] = OCTA_TEMPO;

  /**
   * Índice actual del paso seleccionado en el asistente.
   */
  indice: number = 1;

  /**
   * Estado de la sección actual.
   */
  public seccion!: SeccionLibState;

  
  /**
   * Referencia al componente del asistente (wizard).
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /** Sujeto para manejar la destrucción del componente */
    private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  /**
   * Datos de configuración para los pasos del asistente.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Constructor del componente.
   * 
   * @param seccionQuery Servicio para consultar el estado de la sección.
   * @param seccionStore Servicio para gestionar el estado de la sección.
   */
  constructor(
    private seccionQuery: SeccionLibQuery,
    private seccionStore: SeccionLibStore
  ) { }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Suscribe al estado de la sección y actualiza la propiedad `seccion`.
   */
  ngOnInit() {
    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.seccion = seccionState;
        })
      )
      .subscribe();
  }

  /**
   * Selecciona una pestaña específica en el asistente.
   * 
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
  /**
   * Obtiene el valor del índice del paso actual y realiza la acción correspondiente.
   * 
   * @param e Objeto que contiene la acción ('cont' para continuar o 'atras' para retroceder) y el valor del índice.
   */
  getValorIndice(e: AccionBoton) {
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }
   /** Limpia los recursos al destruir el componente */
   ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
