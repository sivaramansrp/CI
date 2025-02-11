import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';

import { DatosPasos } from '../../../../core/models/shared/components.model';
import { ListaPasosWizard } from '../../../../core/models/5701/servicios-extraordinarios.model';
import { PASOS } from '../../../../shared/constantes/servicios-extraordinarios.enum';
import { SECCIONES_TRAMITE_5701 } from '../../../../shared/constantes/seccionesTramites';
import { SeccionQuery } from '../../../../core/queries/seccion.query';
import { WizardComponent } from '../../../../shared/components/wizard/wizard.component';

import { SeccionState, SeccionStore } from '../../../../estados/seccion.store';

/**
 * Interfaz que define la estructura de una acción de botón.
 */
interface AccionBoton {
  /**
   * La acción que se realizará.
   */
  accion: string;
  /**
   * El valor asociado a la acción.
   */
  valor: number;
}

/**
 * Componente para gestionar la página de solicitud.
 */
@Component({
  templateUrl: './solicitud-page.component.html',
  styles: ``,
})
export class SolicitudPageComponent implements OnInit {
  /**
   * Lista de pasos del asistente.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Índice del paso actual.
   */
  indice: number = 1;

  /**
 * Estado de la sección actual.
 */
  public seccion: SeccionState;

  /**
 * Sujeto para manejar la destrucción de suscripciones.
 */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
  * Referencia al componente del asistente.
  */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
 * Datos de los pasos del asistente.
 */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Constructor del componente.
   * @param seccionStore Almacén de secciones.
   * @param seccionQuery Consulta de secciones.
   */
  constructor(
    private seccionQuery: SeccionQuery,
    private seccionStore: SeccionStore,
  ) {

  }

  /**
   * Método que se ejecuta al inicializar el componente.
   */
  ngOnInit() {
    this.seccionQuery.selectSeccionState$.pipe(
      takeUntil(this.destroyNotifier$),
      map(seccionState => {
        this.seccion = seccionState;
      })
    ).subscribe();

    this.asignarSecciones();
  }

  /**
 * Método para seleccionar una pestaña.
 * @param i Índice de la pestaña a seleccionar.
 */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
 * Método para obtener el valor del índice y navegar en el asistente.
 * @param e Acción del botón que contiene el valor del índice.
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

  /**
   * Método para asignar las secciones existentes al stored
   */
  private asignarSecciones() {
    const secciones: boolean[] = [];
    const formaValida: boolean[] = [];
    for (const llaveSeccion in SECCIONES_TRAMITE_5701.PASO_1) {
      secciones.push(SECCIONES_TRAMITE_5701.PASO_1[llaveSeccion]);
      formaValida.push(false);
    }
    this.seccionStore.establecerSeccion(secciones);
    this.seccionStore.establecerFormaValida(formaValida);
  }
}
